const Cotizacion = require('../models/Cotizacion');

const calcularPresupuesto = (data) => {
  let materialesPorM2 = 0;
  let manoObraPorM2 = 0;
  let tiempoBase = 0;
  let factorTiempo = 0;
  let costoLote = 0;

  if (data.tipo_proyecto === 'REMODELACION') {
    tiempoBase = 0.5;
    factorTiempo = 60;
    switch(data.tipo_acabados) {
      case 'ECONOMICO': materialesPorM2 = 400000; manoObraPorM2 = 200000; break;
      case 'ESTANDAR': materialesPorM2 = 550000; manoObraPorM2 = 350000; break;
      case 'PREMIUM': materialesPorM2 = 800000; manoObraPorM2 = 600000; break;
    }
  } else {
    tiempoBase = 1; 
    factorTiempo = 40; 
    
    let materialesGris = 750000;
    let manoObraGris = 450000;

    // Si es con plancha o dos pisos, la estructura es más pesada y costosa (cimentación reforzada, losa)
    if (data.tipo_estructura === 'UN_PISO_PLANCHA') {
      materialesGris += 200000; // Incremento por losa y refuerzos
      manoObraGris += 100000;
    } else if (data.tipo_estructura === 'DOS_PISOS') {
      materialesGris += 250000; 
      manoObraGris += 150000;
    }
    
    let materialesBlanca = 0;
    let manoObraBlanca = 0;

    // Si el cliente eligió OBRA BLANCA, sumamos los acabados. Si eligió OBRA GRIS, se quedan en 0.
    if (data.fase_construccion === 'OBRA_BLANCA') {
      switch(data.tipo_acabados) {
        case 'ECONOMICO': materialesBlanca = 200000; manoObraBlanca = 150000; break; 
        case 'ESTANDAR': materialesBlanca = 550000; manoObraBlanca = 350000; break; 
        case 'PREMIUM': materialesBlanca = 900000; manoObraBlanca = 500000; break; 
      }
    }

    materialesPorM2 = materialesGris + materialesBlanca;
    manoObraPorM2 = manoObraGris + manoObraBlanca;
  }

  let totalMateriales = data.metros_cuadrados * materialesPorM2;
  let totalManoObra = data.metros_cuadrados * manoObraPorM2;
  
  if (data.fase_construccion === 'OBRA_BLANCA' || data.tipo_proyecto === 'REMODELACION') {
    totalMateriales += (data.banos * 1000000);
    totalManoObra += (data.banos * 500000);
  }

  if (data.tipo_proyecto === 'LOTE_Y_CASA' || data.tipo_proyecto === 'SOLO_LOTE') {
    if (data.lote_precio_real) {
      // Si el cliente eligió un lote específico del inventario
      costoLote = parseFloat(data.lote_precio_real);
    } else if (data.zona_lote) {
      // Valores fijos según la realidad de Puerto Asís
      if (data.zona_lote === 'CENTRO') costoLote = 120000000;
      if (data.zona_lote === 'PERIFERIA') costoLote = 55000000;
      if (data.zona_lote === 'RURAL') costoLote = 35000000;
    }
  }

  let costoTotal = totalMateriales + totalManoObra + costoLote;
  let tiempoCalculado = tiempoBase + (data.metros_cuadrados / factorTiempo);

  return {
    costo_materiales: totalMateriales,
    costo_mano_obra: totalManoObra,
    costo_lote: costoLote,
    costo_total: costoTotal,
    tiempo: parseFloat(tiempoCalculado.toFixed(1))
  };
}

exports.crearCotizacion = async (req, res) => {
  try {
    const { 
      tipo_proyecto, fase_construccion, tipo_estructura, metros_cuadrados, habitaciones, banos, 
      tipo_acabados, presupuesto_cliente, zona_lote, area_lote, lote_id, lote_precio_real, respuestas_cliente 
    } = req.body;

    const calculos = calcularPresupuesto({
      tipo_proyecto, fase_construccion, tipo_estructura, metros_cuadrados, banos, tipo_acabados, zona_lote, lote_precio_real
    });

    const cotizacion = await Cotizacion.create({
      user: req.userId || null, 
      tipo_proyecto,
      fase_construccion: fase_construccion || 'NO_APLICA',
      tipo_estructura: tipo_estructura || 'NO_APLICA',
      metros_cuadrados,
      habitaciones,
      banos,
      tipo_acabados: tipo_acabados || 'NINGUNO',
      zona_lote: zona_lote || 'NO_APLICA',
      area_lote: area_lote || null,
      presupuesto_cliente,
      costo_materiales: calculos.costo_materiales,
      costo_mano_obra: calculos.costo_mano_obra,
      costo_lote: calculos.costo_lote,
      costo_calculado: calculos.costo_total,
      tiempo_meses: calculos.tiempo,
      incluye_lote: tipo_proyecto === 'LOTE_Y_CASA',
      respuestas_cliente
    });

    const formatter = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' });

    res.status(201).json({
      message: 'Cotización calculada con éxito',
      cotizacion,
      desglose: {
        costo_materiales: formatter.format(calculos.costo_materiales),
        costo_mano_obra: formatter.format(calculos.costo_mano_obra),
        costo_lote: calculos.costo_lote > 0 ? formatter.format(calculos.costo_lote) : 'N/A',
        costo_total: formatter.format(calculos.costo_total),
        tiempo_estimado: `${calculos.tiempo} meses aprox.`
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Error al generar cotización', error: error.message });
  }
};

exports.obtenerCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find().sort({ createdAt: -1 });
    res.json(cotizaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotizaciones', error: error.message });
  }
};
