const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'super_secreto_para_jwt_cambiame', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token no autorizado o expirado' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole === 'ADMIN') {
    next();
    return;
  }
  res.status(403).json({ message: 'Se requiere rol de administrador' });
};

module.exports = {
  verifyToken,
  isAdmin
};
