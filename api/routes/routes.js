const {Router} = require('express');
const router = Router();

const { login, busquedaProductos,obtenerIdUsuario,registro,busquedaProductosUsuario,busquedaSubcategorias,busquedaProductosSubcategoria } = require('../controller/functions');

router.post('/seminarioAPI/login', login);
router.post('/seminarioAPI/busquedaProductos', busquedaProductos);
router.post('/seminarioAPI/busquedaProductosUsuario', busquedaProductosUsuario);
router.post('/seminarioAPI/obtener-usuario', obtenerIdUsuario);
router.post('/seminarioAPI/registro', registro);
router.post('/seminarioAPI/busquedaSubcategorias', busquedaSubcategorias);
router.post('/seminarioAPI/busquedaProductosSubcategoria', busquedaProductosSubcategoria);

module.exports = router;
