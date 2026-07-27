const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    nombre: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    correo: z.string().email({ message: 'Correo electrónico inválido' }),
    telefono: z.string().min(7, { message: 'El teléfono debe tener al menos 7 dígitos' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  })
});

const loginSchema = z.object({
  body: z.object({
    correo: z.string().email({ message: 'Correo electrónico inválido' }),
    password: z.string().min(1, { message: 'La contraseña es obligatoria' })
  })
});

module.exports = {
  registerSchema,
  loginSchema
};
