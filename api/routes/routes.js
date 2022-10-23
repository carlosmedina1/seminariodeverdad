const {Router} = require('express');
const router = Router();

const { login, busquedaProductos,obtenerIdUsuario,registro,busquedaProductosUsuario,busquedaSubcategorias,busquedaProductosSubcategoria,verificar_likes,
        like_al_entrar,likesProducto,getContactos,getComentarios,guardarComentario,verificar_likes_comentarios ,like_al_entrar_comentario,likesComentario,
        guardarReporte,verificarReporte,guardarReportecomentario,verificarReporteComentario,} = require('../controller/functions');

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
router.post('/seminarioAPI/getContactos', getContactos);
router.post('/seminarioAPI/getComentarios', getComentarios);
router.post('/seminarioAPI/guardarComentario', guardarComentario);
router.post('/seminarioAPI/verificarLikesComentarios', verificar_likes_comentarios);
router.post('/seminarioAPI/likeAlEntrarComentario', like_al_entrar_comentario);
router.post('/seminarioAPI/likesComentario', likesComentario);
router.post('/seminarioAPI/guardarReporte', guardarReporte);
router.post('/seminarioAPI/verificarReporte', verificarReporte);
router.post('/seminarioAPI/guardarReportecomentario', guardarReportecomentario);
router.post('/seminarioAPI/verificarReporteComentario', verificarReporteComentario);

module.exports = router;
