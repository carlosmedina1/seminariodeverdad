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
        const response = await pool.query('select * from producto');
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
}