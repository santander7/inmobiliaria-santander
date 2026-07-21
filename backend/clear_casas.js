require('dotenv').config();
const mongoose = require('mongoose');
const Propiedad = require('./models/Propiedad');

const clearCasas = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado...');
    
    // Eliminar propiedades
    const result = await Propiedad.deleteMany({});
    console.log(`Borradas ${result.deletedCount} propiedades de la base de datos.`);
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

clearCasas();
