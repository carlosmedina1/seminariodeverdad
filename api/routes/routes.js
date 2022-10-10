const {Router} = require('express');
const router = Router();

const { login, busquedaProductos } = require('../controller/functions');

router.post('/seminarioAPI/login', login);
router.post('/seminarioAPI/busquedaProductos', busquedaProductos);


module.exports = router;
