const express = require('express');
const router = express.Router();
const erpController = require('../controllers/erp.controller');
const auth = require('../middleware/auth');

// Solo administradores pueden gestionar el ERP
router.post('/obras', [auth.verifyToken, auth.isAdmin], erpController.crearObra);
router.get('/obras', [auth.verifyToken, auth.isAdmin], erpController.obtenerObras);
router.put('/obras/:id', [auth.verifyToken, auth.isAdmin], erpController.editarObra);
router.delete('/obras/:id', [auth.verifyToken, auth.isAdmin], erpController.eliminarObra);

router.post('/gastos', [auth.verifyToken, auth.isAdmin], erpController.registrarGasto);
router.put('/gastos/:id', [auth.verifyToken, auth.isAdmin], erpController.editarGasto);
router.delete('/gastos/:id', [auth.verifyToken, auth.isAdmin], erpController.eliminarGasto);

router.get('/obras/:id/finanzas', [auth.verifyToken, auth.isAdmin], erpController.obtenerFinanzasObra);

module.exports = router;
