const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, correo, telefono, password } = req.body;
    
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    // Para simplificar la creación del primer administrador, forzamos un correo específico a ADMIN
    const role = (correo === 'admin@inmobiliaria.com') ? 'ADMIN' : 'USER';

    const user = await User.create({
      nombre,
      correo,
      telefono,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
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
