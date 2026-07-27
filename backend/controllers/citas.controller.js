const Cita = require('../models/Cita');
const nodemailer = require('nodemailer');

// Configuración de Nodemailer (Requiere EMAIL_USER y EMAIL_PASS en .env)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'tucorreo@gmail.com',
    pass: process.env.EMAIL_PASS || 'tucontraseña'
  }
});

exports.crearCita = async (req, res) => {
  try {
    const { fecha_hora, propiedad_id } = req.body;
    const fecha = new Date(fecha_hora);

    // 1. Validar que no sea en el pasado
    if (fecha < new Date()) {
      return res.status(400).json({ message: 'No puedes agendar citas en el pasado.' });
    }

    // 2. Validar Horario Laboral (8am a 6pm, hora local estimada)
    const hora = fecha.getHours();
    if (hora < 8 || hora >= 18) {
      return res.status(400).json({ message: 'El horario de atención es de 8:00 AM a 6:00 PM.' });
    }

    // 3. Validar duración exacta y evitar reservas cruzadas (1 hora exacta)
    // Redondear a la hora en punto para facilitar validación (ej. 10:00:00)
    fecha.setMinutes(0, 0, 0);

    const citaExistente = await Cita.findOne({
      fecha_hora: fecha,
      estado: { $in: ['PENDIENTE', 'CONFIRMADA'] }
    });

    if (citaExistente) {
      return res.status(400).json({ message: 'Este horario ya está reservado. Por favor elige otro.' });
    }

    const nuevaCita = new Cita({
      fecha_hora: fecha,
      user: req.userId, // Viene del token
      propiedad: propiedad_id || null
    });

    await nuevaCita.save();

    // 4. Enviar Correo de Confirmación (Falla silenciosamente si no hay credenciales)
    try {
      if (process.env.EMAIL_USER) {
        await transporter.sendMail({
          from: `"Inmobiliaria Santander" <${process.env.EMAIL_USER}>`,
          to: req.userEmail || process.env.EMAIL_USER, // Necesitaríamos sacar el email del token o BD
          subject: 'Confirmación de Cita Agendada',
          html: `<h3>Tu cita ha sido agendada con éxito</h3><p>Te esperamos el <b>${fecha.toLocaleString()}</b>.</p>`
        });
      }
    } catch (mailError) {
      console.log('Error enviando correo (puede faltar config):', mailError.message);
    }

    res.status(201).json({ message: 'Cita agendada exitosamente', cita: nuevaCita });
  } catch (error) {
    res.status(500).json({ message: 'Error al agendar cita', error: error.message });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    // Si es admin ve todas, si es usuario ve solo las suyas
    const query = req.userRole === 'admin' ? {} : { user: req.userId };
    const citas = await Cita.find(query).populate('user', 'nombre correo telefono').populate('propiedad', 'titulo').sort({ fecha_hora: 1 });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const cita = await Cita.findByIdAndUpdate(id, { estado }, { new: true });
    res.status(200).json({ message: 'Estado actualizado', cita });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cita', error: error.message });
  }
};
