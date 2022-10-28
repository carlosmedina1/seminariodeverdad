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
    const {id_usuario, id_producto,comentario} = req.body
    try {
        const response = await pool.query('insert into comentarios_producto (id_usuario,id_producto,comentario) values ($1,$2,$3)', [id_usuario, id_producto,comentario]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarReporte = async (req, res) => {
    const {id_usuario, id_producto,justificacion} = req.body
    try {
        const response = await pool.query('insert into reportes_producto (id_usuario,id_producto,justificacion) values ($1,$2,$3)', [id_usuario, id_producto,justificacion]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarReportecomentario = async (req, res) => {
    const {id_usuario, id_producto,justificacion,id_comentarios_producto} = req.body
    try {
        const response = await pool.query('insert into reportes_comentario (id_usuario,id_producto,justificacion,id_comentarios_producto) values ($1,$2,$3,$4)', [id_usuario, id_producto,justificacion,id_comentarios_producto]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}

const likesProducto = async (req, res) => {
    const {  id_producto } = req.body
    try {
        const response = await pool.query('select likes from producto where id_producto = $1', [id_producto]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const likesComentario = async (req, res) => {
    const {  id_comentarios_productos } = req.body
    try {
        const response = await pool.query('select likes from comentarios_producto where id_comentarios_producto = $1', [id_comentarios_productos]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const eliminarComentario = async (req, res) => {
    const {  id_comentarios_productos } = req.body
    try {
        const response = await pool.query('update comentarios_producto set vigente=false where id_comentarios_producto = $1', [id_comentarios_productos]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const getContactos = async (req, res) => {
    const {  id_usuario } = req.body
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
    const {user, pass, correo,numero ,facebook ,instagram ,whatsapp } = req.body
    try {
        const response = await pool.query('select registro($1, $2, $3, $4, $5, $6, $7)', [user, pass,correo,numero,facebook,instagram,whatsapp])
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
        const response = await pool.query('select s.*,c.nombre_categoria,(select count(p.id_producto) as cantidad from producto p where p.id_subcategoria=s.id_subcategoria and p.vigente=true and p.bloqueado=false) from subcategoria s join categoria c on c.id_categoria=s.id_categoria   where s.id_categoria=$1  ORDER BY s.orden',[id_categoria]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductosUsuario = async (req, res) => {
    const { id_user } = req.body
    try {
        const response = await pool.query('select p.*,sc.nombre_subcategoria,c.nombre_categoria,c.id_categoria from producto p join subcategoria sc on sc.id_subcategoria=p.id_subcategoria join categoria c on c.id_categoria=sc.id_categoria where id_usuario=$1',[id_user]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductosSubcategoria = async (req, res) => {
    const { id_subcategoria } = req.body
    try {
        const response = await pool.query('select * from producto where vigente=true and bloqueado=false and id_subcategoria=$1',[id_subcategoria]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const obtenerIdUsuario = async (req, res) => {
    const { nu } = req.body
    try{
        const response = await pool.query('select * from usuario where correo_electronico = $1;', [nu])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}
const guardarNuevoProducto = async (req, res) => {
    const {id_usuario, nombre_producto,descripcion,id_subcategoria} = req.body
    try {
        const response = await pool.query('insert into producto (id_usuario,nombre_producto,descripcion,id_subcategoria) values ($1,$2,$3,$4)', [id_usuario, nombre_producto,descripcion,id_subcategoria]);
        res.json(1)
    }
    catch (err) {
        res.json(err)
    }
}
const guardarProductoEditado = async (req, res) => {
    const {id_producto, nombre_producto,descripcion,id_subcategoria} = req.body
    console.log(id_producto, nombre_producto,descripcion,id_subcategoria)
    try {
        const response = await pool.query('update producto set nombre_producto=$1, descripcion=$2, id_subcategoria=$3 where id_producto=$4', [nombre_producto,descripcion,id_subcategoria,id_producto]);
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
    likesComentario,
    guardarReporte,
    verificarReporte,
    guardarReportecomentario,
    verificarReporteComentario,
    eliminarComentario,
    guardarNuevoProducto,
    buscarCategoria,
    guardarProductoEditado
}