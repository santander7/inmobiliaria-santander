require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { sequelize } = require('./config/db');
require('./models'); // Importar modelos para que se sincronicen

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // TODO: Restringir a dominio del frontend en producción
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.send('API Inmobiliaria Putumayo Funcionando');
});

const authRoutes = require('./routes/auth.routes');
const propiedadesRoutes = require('./routes/propiedades.routes');

app.use('/api/auth', authRoutes);
app.use('/api/propiedades', propiedadesRoutes);

// Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;

// Sincronizar Base de Datos y arrancar servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Base de datos conectada y sincronizada.');
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
});
