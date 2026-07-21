const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Expresión regular robusta para validar el formato del correo
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.register = async (req, res) => {
  try {
    const { nombre, correo, telefono, password } = req.body;
    
    // Validación de Nivel 1: Sintaxis del correo
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ message: 'Introduzca una dirección de email válida.' });
    }
    
    const existingUser = await User.findOne({ correo });
    
    if (existingUser) {
        return res.status(400).json({ message: 'El correo ya está registrado. Por favor inicia sesión.' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const role = (correo === 'admin@inmobiliaria.com') ? 'ADMIN' : 'USER';
    
    // Crear nuevo usuario (ya no necesitamos verificación por link)
    const user = await User.create({
        nombre,
        correo,
        telefono,
        password: hashedPassword,
        role,
        isVerified: true // Lo marcamos como verificado por defecto para no bloquearlo
    });

    res.status(201).json({ 
        message: 'Usuario registrado exitosamente.'
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: 'Error en el servidor.', error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
    // Este método ya no es necesario, pero lo dejamos por compatibilidad temporal
    res.status(200).send("Ya no se requiere verificación por email.");
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (!user.activo) {
        return res.status(403).json({ message: 'Usuario inactivo' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'super_secreto_para_jwt_cambiame',
      { expiresIn: 86400 } // 24 horas
    );

    res.status(200).json({
      id: user._id,
      nombre: user.nombre,
      correo: user.correo,
      telefono: user.telefono,
      role: user.role,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};
