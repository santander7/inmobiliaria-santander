const { Sequelize } = require('sequelize');

// Asegúrate de tener estas variables en tu archivo .env local
const sequelize = new Sequelize(
  process.env.DB_NAME || 'inmobiliaria_putumayo',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

module.exports = { sequelize };
