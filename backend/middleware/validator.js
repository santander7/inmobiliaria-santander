const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Error de validación de datos',
      errors: error.errors.map(err => ({
        campo: err.path.join('.'),
        mensaje: err.message
      }))
    });
  }
};

module.exports = validate;
