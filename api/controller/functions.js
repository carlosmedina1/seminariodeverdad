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
    console.log(user+"-"+pass)
    try {
        const response = await pool.query('select login($1, $2)', [user, pass]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const registro = async (req, res) => {
    const {user, pass, correo,numero ,facebook ,instagram ,whatsapp  } = req.body
    console.log(user, pass, correo,numero ,facebook ,instagram ,whatsapp )
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
        const response = await pool.query('select * from producto where vigente=true and bloqueado=false');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaSubcategorias = async (req, res) => {
    const { id_categoria } = req.body
    try {
        const response = await pool.query('select s.*,(select count(p.id_producto) as cantidad from producto p where p.id_subcategoria=s.id_subcategoria and p.vigente=true and p.bloqueado=false) from subcategoria s   where s.id_categoria=$1  ORDER BY s.orden',[id_categoria]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const busquedaProductosUsuario = async (req, res) => {
    const { id_user } = req.body
    try {
        const response = await pool.query('select * from producto where id_usuario=$1',[id_user]);
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
module.exports = {
    busquedaProductos,
    login,
    obtenerIdUsuario,
    registro,
    busquedaProductosUsuario,
    busquedaSubcategorias,
    busquedaProductosSubcategoria
}