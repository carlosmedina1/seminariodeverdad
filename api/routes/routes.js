const {Router} = require('express');
const router = Router();

const { login, busquedaProductos,obtenerIdSupervisor } = require('../controller/functions');

router.post('/seminarioAPI/login', login);
router.post('/seminarioAPI/busquedaProductos', busquedaProductos);
router.post('/seminarioAPI/obtener-usuario', obtenerIdSupervisor);


module.exports = router;
