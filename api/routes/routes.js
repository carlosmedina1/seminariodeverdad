const {Router} = require('express');
const router = Router();

const { login, busquedaProductos,obtenerIdUsuario,registro } = require('../controller/functions');

router.post('/seminarioAPI/login', login);
router.post('/seminarioAPI/busquedaProductos', busquedaProductos);
router.post('/seminarioAPI/obtener-usuario', obtenerIdUsuario);
router.post('/seminarioAPI/registro', registro);

module.exports = router;
