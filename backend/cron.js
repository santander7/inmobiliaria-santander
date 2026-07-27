const cron = require('node-cron');
const fetch = require('node-fetch'); // Requerir si usamos fetch nativo en versiones viejas de node, si es Node 18+ está global.

// Programar tarea para que corra todos los días a las 6:00 PM (18:00)
// Formato Cron: '0 18 * * *' (Minuto 0, Hora 18, Todos los días)
cron.schedule('0 18 * * *', async () => {
  console.log('⏳ Ejecutando Cron Job diario de Recordatorio ERP (6:00 PM)');
  
  try {
    // Número del administrador (Debes cambiarlo por tu número real y obtener el API Key de CallMeBot)
    const phone = process.env.WHATSAPP_ADMIN_PHONE || '+573001234567'; 
    const apiKey = process.env.CALLMEBOT_API_KEY || '123456';
    
    // Mensaje codificado en URL
    const mensaje = encodeURIComponent(
      "🏗️ *Inmobiliaria Santander - ERP*\n\nHola Admin, recuerda registrar los gastos de obra del día de hoy en el *Libro Mayor* para mantener la contabilidad exacta y los avances físicos al día."
    );

    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${mensaje}&apikey=${apiKey}`;

    if (process.env.CALLMEBOT_API_KEY) {
      // Usamos import dinámico por si node-fetch es un módulo ES
      const fetchModule = await import('node-fetch');
      const fetchFunc = fetchModule.default || fetchModule;
      
      const response = await fetchFunc(url);
      if (response.ok) {
        console.log('✅ Mensaje de WhatsApp enviado al Administrador exitosamente.');
      } else {
        console.log('⚠️ Error enviando WhatsApp:', response.statusText);
      }
    } else {
      console.log('ℹ️ Recordatorio generado, pero no se envió el WhatsApp porque falta la CALLMEBOT_API_KEY en el .env');
    }
  } catch (error) {
    console.error('❌ Error en el Cron Job de WhatsApp:', error.message);
  }
});

console.log('🤖 Cron Job de WhatsApp inicializado (Programado para las 18:00 diario).');
