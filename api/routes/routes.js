const {Router} = require('express');
const router = Router();

const { login, busquedaProductos,obtenerIdUsuario,registro,busquedaProductosUsuario,busquedaSubcategorias,busquedaProductosSubcategoria,verificar_likes,
        like_al_entrar,likesProducto } = require('../controller/functions');

router.post('/seminarioAPI/login', login);
router.post('/seminarioAPI/busquedaProductos', busquedaProductos);
router.post('/seminarioAPI/busquedaProductosUsuario', busquedaProductosUsuario);
router.post('/seminarioAPI/obtener-usuario', obtenerIdUsuario);
router.post('/seminarioAPI/registro', registro);
router.post('/seminarioAPI/busquedaSubcategorias', busquedaSubcategorias);
router.post('/seminarioAPI/busquedaProductosSubcategoria', busquedaProductosSubcategoria);
router.post('/seminarioAPI/verificar_likes', verificar_likes);
router.post('/seminarioAPI/like_al_entrar', like_al_entrar);
router.post('/seminarioAPI/likesProducto', likesProducto);

module.exports = router;
