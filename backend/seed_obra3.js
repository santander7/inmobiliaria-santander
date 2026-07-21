require('dotenv').config();
const mongoose = require('mongoose');
const Proyecto = require('./models/Proyecto');

const seedObra = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const nuevaObra = new Proyecto({
      titulo: 'Casa Moderna Dos Pisos (Puerto Asís)',
      descripcion: 'La propiedad tiene un diseño contemporáneo, acabados de alta calidad y excelente iluminación. Uso constante de piso imitación madera rústica, paredes blancas y carpintería oscura.',
      imagenPrincipal: '/images/obras/obra3_4.jpg',
      detalles: [
        {
          titulo: 'Cocina y Sala Integral',
          texto: 'Espacio abierto y amplio con cocina en L, gabinetes oscuros y piso imitación madera.',
          imagen: '/images/obras/obra3_1.jpg'
        },
        {
          titulo: 'Patio y Terraza',
          texto: 'Patio acogedor con baldosas claras, fachaleta de piedra y plantas decorativas.',
          imagen: '/images/obras/obra3_2.jpg'
        },
        {
          titulo: 'Escaleras Modernas',
          texto: 'Pasamanos en acero inoxidable, cerámica de madera y excelente iluminación natural.',
          imagen: '/images/obras/obra3_3.jpg'
        },
        {
          titulo: 'Habitación y Clóset',
          texto: 'Amplia alcoba principal con clóset de madera oscura empotrado de piso a techo.',
          imagen: '/images/obras/obra3_5.jpg'
        }
      ]
    });

    await nuevaObra.save();
    console.log('Obra insertada exitosamente en la BD.');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedObra();
