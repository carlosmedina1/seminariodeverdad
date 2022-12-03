const { Pool } = require('pg');

const dataConnection = {
    host: 'localhost',
    user: 'postgres',
    password: '159753',
    database: 'seminario_titulo',
};

const pool = new Pool(dataConnection);

const login = async (req, res) => {
    const { user, pass } = req.body
    try {
        const response = await pool.query('select login($1, $2)', [user, pass]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const buscarCategoria = async (req, res) => {
    try {
        const response = await pool.query('select * from categoria order by id_categoria asc');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const verificar_likes = async (req, res) => {
    const { id_usuario, id_producto } = req.body
    try {
        const response = await pool.query('select verificar_likes($1, $2)', [id_usuario, id_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const verificar_likes_comentarios = async (req, res) => {
    const { id_usuario, id_comentario } = req.body
    try {
        const response = await pool.query('select verificar_likes_comentarios($1, $2)', [id_usuario, id_comentario]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarComentario = async (req, res) => {
    const { id_usuario, id_producto, comentario } = req.body
    try {
        const response = await pool.query('insert into comentarios_producto (id_usuario,id_producto,comentario) values ($1,$2,$3)', [id_usuario, id_producto, comentario]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarReporte = async (req, res) => {
    const { id_usuario, id_producto, justificacion } = req.body
    try {
        const response = await pool.query('insert into reportes_producto (id_usuario,id_producto,justificacion) values ($1,$2,$3)', [id_usuario, id_producto, justificacion]);
        const detalle_report = await pool.query('select cant_reportes from producto where id_producto= $1;', [id_producto]);
        const cant_reportes = detalle_report.rows[0].cant_reportes + 1;
        if (cant_reportes >= 30) {
            const response2 = await pool.query("update producto set cant_reportes=$2,bloqueado=true,razon_bloqueo='Se superaron las 30 denuncias' where id_producto = $1", [id_producto, cant_reportes]);
            const responsez = await pool.query("insert into notificaciones_producto (id_usuario,id_producto,notificacion) values ($1,$2,¡Tu Denuncia fue Aceptada!')", [id_usuario, id_producto]);
        } else {
            const response2 = await pool.query('update producto set cant_reportes=$2 where id_producto = $1', [id_producto, cant_reportes]);
        }
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarReportecomentario = async (req, res) => {
    const { id_usuario, id_producto, justificacion, id_comentarios_producto } = req.body
    try {
        const response = await pool.query('insert into reportes_comentario (id_usuario,id_producto,justificacion,id_comentarios_producto) values ($1,$2,$3,$4)', [id_usuario, id_producto, justificacion, id_comentarios_producto]);
        const detalle_report = await pool.query('select cant_reportes from comentarios_producto where id_comentarios_producto= $1;', [id_comentarios_producto]);
        const cant_reportes = detalle_report.rows[0].cant_reportes + 1;
        if (cant_reportes >= 10) {
            const response2 = await pool.query("update comentarios_producto set cant_reportes=$2,bloqueado=true,razon_bloqueo='Se superaron las 10 denuncias' where id_comentarios_producto = $1", [id_comentarios_producto, cant_reportes]);
            const responsez = await pool.query("insert into notificaciones_comentario (id_usuario,id_comentario,notificacion) values ($1,$2,¡Tu Denuncia fue Aceptada!')", [id_usuario, id_comentarios_producto]);
        } else {
            const response2 = await pool.query('update comentarios_producto set cant_reportes=$2 where id_comentarios_producto = $1', [id_comentarios_producto, cant_reportes]);
        }
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}

const likesProducto = async (req, res) => {
    const { id_producto } = req.body
    try {
        const response = await pool.query('select likes from producto where id_producto = $1', [id_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const likesComentario = async (req, res) => {
    const { id_comentarios_productos } = req.body
    try {
        const response = await pool.query('select likes from comentarios_producto where id_comentarios_producto = $1', [id_comentarios_productos]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const eliminarComentario = async (req, res) => {
    const { id_comentarios_productos } = req.body
    try {
        const response = await pool.query('update comentarios_producto set vigente=false where id_comentarios_producto = $1', [id_comentarios_productos]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const habilitarProducto = async (req, res) => {
    const { id_producto } = req.body
    try {
        const response = await pool.query('update producto set bloqueado=false where id_producto = $1', [id_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const cambiarEstadoUsuario = async (req, res) => {
    const { id_usuario, vigente } = req.body
    try {
        if (vigente) {
            const response = await pool.query('update usuario set vigente=false where id_usuario = $1', [id_usuario]);
            const response2 = await pool.query('update producto set bloqueado=true where id_usuario = $1', [id_usuario]);
            res.json(response.rows)
        } else {
            const response = await pool.query('update usuario set vigente=true where id_usuario = $1', [id_usuario]);
            const response2 = await pool.query('update producto set bloqueado=false where id_usuario = $1', [id_usuario]);
            res.json(response.rows)
        }
    }
    catch (err) {
        res.json(err)
    }
}

const getContactos = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select numero_telefono,facebook,instagram,whatsapp from usuario where id_usuario = $1', [id_usuario]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const getComentarios = async (req, res) => {
    const { id_producto } = req.body
    try {
        const response = await pool.query('select c.*,u.nombre_usuario,p.nombre_producto from comentarios_producto c join usuario u on u.id_usuario=c.id_usuario join producto p on p.id_producto=c.id_producto where c.vigente=true and c.bloqueado=false and c.id_producto = $1 order by c.likes desc', [id_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const like_al_entrar = async (req, res) => {
    const { id_usuario, id_producto } = req.body
    try {
        const response = await pool.query('select count(id_detalle_likes) as tiene from detalle_likes where id_usuario = $1	and id_producto= $2 and vigente=true;', [id_usuario, id_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const like_al_entrar_comentario = async (req, res) => {
    const { id_usuario, id_comentario } = req.body
    try {
        const response = await pool.query('select count(id_detalle_likes_comentario) as tiene from detalle_likes_comentario where id_usuario = $1	and id_comentario= $2 and vigente=true;', [id_usuario, id_comentario]);

        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const verificarReporte = async (req, res) => {
    const { id_usuario, id_producto } = req.body
    try {
        const response = await pool.query('select count(id_reportes_producto) as tiene from reportes_producto where id_usuario = $1	and id_producto= $2 and vigente=true;', [id_usuario, id_producto]);

        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const verificarReporteComentario = async (req, res) => {
    const { id_usuario, id_comentarios_producto } = req.body
    try {
        const response = await pool.query('select count(id_reportes_comentario) as tiene from reportes_comentario where id_usuario = $1	and id_comentarios_producto= $2 and vigente=true;', [id_usuario, id_comentarios_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const registro = async (req, res) => {
    const { user, pass, correo, numero, facebook, instagram, whatsapp } = req.body
    try {
        const response = await pool.query('select registro($1, $2, $3, $4, $5, $6, $7)', [user, pass, correo, numero, facebook, instagram, whatsapp])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductos = async (req, res) => {
    try {
        const response = await pool.query('select p.*,u.nombre_usuario from producto p join usuario u on p.id_usuario=u.id_usuario where p.vigente=true and p.bloqueado=false order by p.likes desc');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaSubcategorias = async (req, res) => {
    const { id_categoria } = req.body
    try {
        const response = await pool.query('select s.*,c.nombre_categoria,(select count(p.id_producto) as cantidad from producto p where p.id_subcategoria=s.id_subcategoria and p.vigente=true and p.bloqueado=false) from subcategoria s join categoria c on c.id_categoria=s.id_categoria   where s.id_categoria=$1  ORDER BY s.orden', [id_categoria]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaCategorias = async (req, res) => {
    try {
        const response = await pool.query('select s.*,(select count(p.id_subcategoria) as cantidad from subcategoria p where p.id_categoria=s.id_categoria and p.vigente=true) from categoria s ORDER BY s.id_categoria');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductosConMasLikes = async (req, res) => {
    try {
        const response = await pool.query('select id_producto,url_1 from producto order by likes desc');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const busquedaUsuarios = async (req, res) => {
    try {
        const response = await pool.query('select s.*,(select count(p.id_producto) as cantidad_productos from producto p where p.id_usuario=s.id_usuario) from usuario s where s.es_admin=false ORDER BY s.id_usuario');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const busquedaProductosUsuario = async (req, res) => {
    const { id_user } = req.body
    try {
        const response = await pool.query('select p.*,sc.nombre_subcategoria,c.nombre_categoria,c.id_categoria,u.nombre_usuario from producto p join usuario u on p.id_usuario=u.id_usuario join subcategoria sc on sc.id_subcategoria=p.id_subcategoria join categoria c on c.id_categoria=sc.id_categoria where p.id_usuario=$1 and p.vigente=true', [id_user]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductosEliminados = async (req, res) => {
    try {
        const response = await pool.query('select p.*,u.nombre_usuario from producto p join usuario u on p.id_usuario=u.id_usuario where p.bloqueado=true');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductosSubcategoria = async (req, res) => {
    const { id_subcategoria } = req.body
    try {
        const response = await pool.query('select p.*,u.nombre_usuario from producto p join usuario u on p.id_usuario=u.id_usuario where p.vigente=true and p.bloqueado=false and p.id_subcategoria=$1', [id_subcategoria]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const obtenerIdUsuario = async (req, res) => {
    const { nu } = req.body
    try {
        const response = await pool.query('select * from usuario where correo_electronico = $1;', [nu])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerReportesUsuario = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select r.*,p.nombre_producto from reportes_producto r join producto p on p.id_producto=r.id_producto where r.id_usuario = $1;', [id_usuario])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerReportesProducto = async (req, res) => {
    try {
        const response = await pool.query('select count(rp.id_reportes_producto)as cantidad_reportes,p.nombre_producto,p.id_producto,p.descripcion,p.url_1 from reportes_producto rp join producto p on p.id_producto=rp.id_producto where rp.vigente=true group by p.nombre_producto, p.id_producto')
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerReportesComentarios = async (req, res) => {
    try {
        const response = await pool.query('select count(rc.id_reportes_comentario)as cantidad_reportes, c.comentario,c.id_comentarios_producto,p.nombre_producto from reportes_comentario rc join comentarios_producto c on c.id_comentarios_producto=rc.id_comentarios_producto join producto p on c.id_producto=p.id_producto where rc.vigente=true group by c.comentario,c.id_comentarios_producto,p.nombre_producto')
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerReportesUsuario2 = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select r.*,p.nombre_producto from reportes_comentario r join producto p on p.id_producto=r.id_producto where r.id_usuario = $1;', [id_usuario])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerLikesUsuario = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select dl.*,p.nombre_producto from detalle_likes dl join producto p on p.id_producto=dl.id_producto where dl.vigente=true and dl.id_usuario = $1;', [id_usuario])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerLikesUsuario2 = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select dlc.*,p.nombre_producto,cp.comentario from detalle_likes_comentario dlc join comentarios_producto cp on dlc.id_comentario=cp.id_comentarios_producto join producto p on p.id_producto=cp.id_producto where dlc.vigente=true and dlc.id_usuario = $1;', [id_usuario])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const guardarNuevoProducto = async (req, res) => {
    const { id_usuario, nombre_producto, descripcion, id_subcategoria } = req.body
    try {
        const response = await pool.query('insert into producto (id_usuario,nombre_producto,descripcion,id_subcategoria) values ($1,$2,$3,$4)', [id_usuario, nombre_producto, descripcion, id_subcategoria]);
        const id_producto = await pool.query('SELECT last_value as id_producto FROM producto_id_producto_seq;');

        res.json(id_producto.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const guardarNuevaSubcategoria = async (req, res) => {
    const { nombre_subcategoria, id_categoria } = req.body
    try {
        const response = await pool.query('insert into subcategoria (nombre_subcategoria,id_categoria) values ($1,$2)', [nombre_subcategoria, id_categoria]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarNuevaCategoria = async (req, res) => {
    const { nombre_categoria } = req.body
    try {
        const response = await pool.query('insert into categoria (nombre_categoria) values ($1)', [nombre_categoria]);
        const id_categoria = await pool.query('SELECT last_value as id_categoria FROM categoria_id_categoria_seq;');

        res.json(id_categoria.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const guardarProductoEditado = async (req, res) => {
    const { id_producto, nombre_producto, descripcion, id_subcategoria } = req.body
    console.log(id_producto, nombre_producto, descripcion, id_subcategoria)
    try {
        const response = await pool.query('update producto set nombre_producto=$1, descripcion=$2, id_subcategoria=$3 where id_producto=$4', [nombre_producto, descripcion, id_subcategoria, id_producto]);
        console.log(response)
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarImagenProducto = async (req, res) => {
    const { url_1, url_2, url_3, url_4, id_producto } = req.body
    try {
        const response = await pool.query('update producto set url_1=$1, url_2=$2, url_3=$3, url_4=$4 where id_producto=$5', [url_1, url_2, url_3, url_4, id_producto]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarImagenCategoria = async (req, res) => {
    const { url_1,  id_categoria } = req.body
    console.log(url_1,  id_categoria)
    try {
        const response = await pool.query('update categoria set url=$1 where id_categoria=$2', [url_1, id_categoria]);
        console.log()
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const obtenerNotificacionesProducto = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select np.*,p.nombre_producto from notificaciones_producto np join producto p on p.id_producto =np.id_producto where np.id_usuario = $1;', [id_usuario])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const obtenerNotificacionesComentarios = async (req, res) => {
    const { id_usuario } = req.body
    try {
        const response = await pool.query('select nc.*,c.comentario from notificaciones_comentario nc join comentarios_producto c on nc.id_comentario=c.id_comentarios_producto where nc.id_usuario = $1;', [id_usuario])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const listadoReportesRealesProducto = async (req, res) => {
    const { id_producto } = req.body
    try {
        const response = await pool.query('select rp.justificacion, u.nombre_usuario from reportes_producto rp join usuario u on u.id_usuario=rp.id_usuario where rp.vigente=true and rp.id_producto= $1;', [id_producto])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const listadoReportesRealesComentario = async (req, res) => {
    const { id_comentarios_producto } = req.body
    try {
        const response = await pool.query('select rc.justificacion, u.nombre_usuario from reportes_comentario rc join usuario u on u.id_usuario=rc.id_usuario where rc.vigente=true and rc.id_comentarios_producto= $1;', [id_comentarios_producto])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const aprueboReporteComentario = async (req, res) => {
    const { id_comentarios_producto } = req.body
    try {
        const response = await pool.query("update comentarios_producto set bloqueado=true where id_comentarios_producto = $1", [id_comentarios_producto]);
        const response22 = await pool.query("update reportes_comentario set vigente=false,aceptado=true where id_comentarios_producto = $1", [id_comentarios_producto]);
        const detalle_report = await pool.query('select id_usuario from reportes_comentario where id_comentarios_producto= $1;', [id_comentarios_producto]);
        detalle_report.rows.forEach(async element => {
            await pool.query("insert into notificaciones_comentario (id_usuario,id_comentario,notificacion) values ($1,$2,'¡Tu Denuncia fue Aceptada!')", [element.id_usuario, id_comentarios_producto]);
        });
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const rechazoReporteComentario = async (req, res) => {
    const { id_comentarios_producto } = req.body
    try {
        const response22 = await pool.query("update reportes_comentario set vigente=false,aceptado=false where id_comentarios_producto = $1", [id_comentarios_producto]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const rechazoReporteProducto = async (req, res) => {
    const { id_producto } = req.body
    try {
        const response22 = await pool.query("update reportes_producto set vigente=false,aceptado=false where id_producto = $1", [id_producto]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const aprueboReporteProducto = async (req, res) => {
    const { id_producto } = req.body
    try {
        const response = await pool.query("update producto set bloqueado=true,razon_bloqueo='Reportes aceptados por Administrador' where id_producto = $1", [id_producto]);
        const response22 = await pool.query("update reportes_producto set vigente=false,aceptado=true where id_producto = $1", [id_producto]);
        const detalle_report = await pool.query('select id_usuario from reportes_producto where id_producto= $1;', [id_producto]);
        detalle_report.rows.forEach(async element  => {
            await pool.query("insert into notificaciones_producto(id_usuario,id_producto,notificacion) values ($1,$2,'¡Tu Denuncia fue Aceptada!')", [element.id_usuario, id_producto]);
        });
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
module.exports = {
    busquedaProductos,
    login,
    obtenerIdUsuario,
    registro,
    busquedaProductosUsuario,
    busquedaSubcategorias,
    busquedaProductosSubcategoria,
    verificar_likes,
    like_al_entrar,
    likesProducto,
    getContactos,
    getComentarios,
    guardarComentario,
    verificar_likes_comentarios,
    like_al_entrar_comentario,
    guardarNuevaSubcategoria,
    likesComentario,
    guardarReporte,
    verificarReporte,
    guardarReportecomentario,
    verificarReporteComentario,
    eliminarComentario,
    guardarNuevoProducto,
    buscarCategoria,
    guardarProductoEditado,
    obtenerReportesUsuario,
    obtenerReportesUsuario2,
    obtenerLikesUsuario,
    obtenerLikesUsuario2,
    busquedaCategorias,
    busquedaProductosEliminados,
    habilitarProducto,
    busquedaUsuarios,
    cambiarEstadoUsuario,
    guardarNuevaCategoria,
    obtenerNotificacionesProducto,
    obtenerNotificacionesComentarios,
    obtenerReportesProducto,
    obtenerReportesComentarios,
    listadoReportesRealesProducto,
    listadoReportesRealesComentario,
    aprueboReporteComentario,
    rechazoReporteComentario,
    rechazoReporteProducto,
    aprueboReporteProducto,
    guardarImagenProducto,
    guardarImagenCategoria,
    busquedaProductosConMasLikes,
}