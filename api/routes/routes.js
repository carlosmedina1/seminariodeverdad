const {Router} = require('express');
const router = Router();

const { login, busquedaProductos,obtenerIdUsuario,registro,busquedaProductosUsuario,busquedaSubcategorias,busquedaProductosSubcategoria,verificar_likes,
        like_al_entrar,likesProducto,getContactos,getComentarios,guardarComentario,verificar_likes_comentarios ,like_al_entrar_comentario,likesComentario,
        guardarReporte,verificarReporte,guardarReportecomentario,verificarReporteComentario,eliminarComentario,guardarNuevoProducto,buscarCategoria,
        guardarProductoEditado,obtenerReportesUsuario,obtenerReportesUsuario2,obtenerLikesUsuario,obtenerLikesUsuario2,guardarNuevaSubcategoria,busquedaCategorias,
        busquedaProductosEliminados,habilitarProducto,busquedaUsuarios,cambiarEstadoUsuario,guardarNuevaCategoria,obtenerNotificacionesProducto,
        obtenerNotificacionesComentarios,obtenerReportesProducto,obtenerReportesComentarios,listadoReportesRealesProducto,listadoReportesRealesComentario} = require('../controller/functions');

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
router.post('/seminarioAPI/eliminarComentario', eliminarComentario);
router.post('/seminarioAPI/guardarNuevoProducto', guardarNuevoProducto);
router.post('/seminarioAPI/buscarCategoria', buscarCategoria);
router.post('/seminarioAPI/guardarProductoEditado', guardarProductoEditado);
router.post('/seminarioAPI/obtenerReportesUsuario', obtenerReportesUsuario);
router.post('/seminarioAPI/obtenerReportesUsuario2', obtenerReportesUsuario2);
router.post('/seminarioAPI/obtenerLikesUsuario', obtenerLikesUsuario);
router.post('/seminarioAPI/obtenerLikesUsuario2', obtenerLikesUsuario2);
router.post('/seminarioAPI/guardarNuevaSubcategoria', guardarNuevaSubcategoria);
router.post('/seminarioAPI/busquedaCategorias', busquedaCategorias);
router.post('/seminarioAPI/busquedaProductosEliminados', busquedaProductosEliminados);
router.post('/seminarioAPI/habilitarProducto', habilitarProducto);
router.post('/seminarioAPI/busquedaUsuarios', busquedaUsuarios);
router.post('/seminarioAPI/cambiarEstadoUsuario', cambiarEstadoUsuario);
router.post('/seminarioAPI/guardarNuevaCategoria', guardarNuevaCategoria);
router.post('/seminarioAPI/obtenerNotificacionesProducto', obtenerNotificacionesProducto);
router.post('/seminarioAPI/obtenerNotificacionesComentarios', obtenerNotificacionesComentarios);
router.post('/seminarioAPI/obtenerReportesProducto', obtenerReportesProducto);
router.post('/seminarioAPI/obtenerReportesComentarios', obtenerReportesComentarios);
router.post('/seminarioAPI/listadoReportesRealesProducto', listadoReportesRealesProducto);
router.post('/seminarioAPI/listadoReportesRealesComentario', listadoReportesRealesComentario);
module.exports = router;
