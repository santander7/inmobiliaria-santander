const express = require('express');
const router = express.Router();
const crmController = require('../controllers/crm.controller');
const auth = require('../middleware/auth');

// Rutas protegidas (Solo admin)
router.get('/leads', [auth.verifyToken, auth.isAdmin], crmController.obtenerLeads);
router.put('/leads/:id/estado', [auth.verifyToken, auth.isAdmin], crmController.actualizarEstadoLead);

module.exports = router;
