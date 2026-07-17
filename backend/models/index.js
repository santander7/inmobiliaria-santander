const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  correo: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('USER', 'ADMIN'), defaultValue: 'USER' },
  activo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

const Propiedad = sequelize.define('Propiedad', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  precio: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  municipio: { type: DataTypes.STRING, allowNull: false },
  area: { type: DataTypes.DECIMAL(10, 2), allowNull: false }, // m2
  estado: { type: DataTypes.ENUM('DISPONIBLE', 'VENDIDO', 'RESERVADO'), defaultValue: 'DISPONIBLE' },
  tipo: { type: DataTypes.ENUM('CASA', 'LOTE'), allowNull: false },
  caracteristicas: { type: DataTypes.JSON, allowNull: true } // { habitaciones: 3, baños: 2, etc }
});

const ImagenPropiedad = sequelize.define('ImagenPropiedad', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  url: { type: DataTypes.STRING, allowNull: false }
});

const Favorito = sequelize.define('Favorito', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
});

const Solicitud = sequelize.define('Solicitud', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.ENUM('INFORMACION', 'COMPRA', 'CONSTRUCCION', 'ASESORIA'), allowNull: false },
  estado: { type: DataTypes.ENUM('PENDIENTE', 'EN_PROCESO', 'FINALIZADO'), defaultValue: 'PENDIENTE' },
  detalles: { type: DataTypes.TEXT, allowNull: true }
});

const Cita = sequelize.define('Cita', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fecha_hora: { type: DataTypes.DATE, allowNull: false },
  estado: { type: DataTypes.ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'FINALIZADA'), defaultValue: 'PENDIENTE' }
});

const Cotizacion = sequelize.define('Cotizacion', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  metros_cuadrados: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  habitaciones: { type: DataTypes.INTEGER, allowNull: false },
  banos: { type: DataTypes.INTEGER, allowNull: false },
  presupuesto_estimado: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  estado: { type: DataTypes.ENUM('PRELIMINAR', 'EN_REVISION', 'APROBADA', 'RECHAZADA'), defaultValue: 'PRELIMINAR' }
});

// Relaciones
User.hasMany(Propiedad, { as: 'propiedades_creadas', foreignKey: 'admin_id' });
Propiedad.belongsTo(User, { as: 'creador', foreignKey: 'admin_id' });

Propiedad.hasMany(ImagenPropiedad, { foreignKey: 'propiedad_id', as: 'imagenes' });
ImagenPropiedad.belongsTo(Propiedad, { foreignKey: 'propiedad_id' });

User.belongsToMany(Propiedad, { through: Favorito, as: 'favoritos' });
Propiedad.belongsToMany(User, { through: Favorito, as: 'usuarios_favoritos' });

User.hasMany(Solicitud, { foreignKey: 'user_id' });
Solicitud.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Cita, { foreignKey: 'user_id' });
Cita.belongsTo(User, { foreignKey: 'user_id' });
Propiedad.hasMany(Cita, { foreignKey: 'propiedad_id' });
Cita.belongsTo(Propiedad, { foreignKey: 'propiedad_id' });

User.hasMany(Cotizacion, { foreignKey: 'user_id' });
Cotizacion.belongsTo(User, { foreignKey: 'user_id' });
// Si la cotización está ligada a un lote
Propiedad.hasMany(Cotizacion, { foreignKey: 'lote_id' });
Cotizacion.belongsTo(Propiedad, { foreignKey: 'lote_id' });

module.exports = {
  User,
  Propiedad,
  ImagenPropiedad,
  Favorito,
  Solicitud,
  Cita,
  Cotizacion
};
