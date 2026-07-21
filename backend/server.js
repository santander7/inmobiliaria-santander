require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Conectar a MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rutas
app.get('/', (req, res) => {
  res.send('API Inmobiliaria Putumayo Funcionando (MongoDB)');
});

const authRoutes = require('./routes/auth.routes');
const propiedadesRoutes = require('./routes/propiedades.routes');
const cotizacionesRoutes = require('./routes/cotizaciones.routes');
const uploadRoutes = require('./routes/upload.routes');
const proyectosRoutes = require('./routes/proyectos.routes');

app.use('/api/auth', authRoutes);
app.use('/api/propiedades', propiedadesRoutes);
app.use('/api/cotizaciones', cotizacionesRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/proyectos', proyectosRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message || err });
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
