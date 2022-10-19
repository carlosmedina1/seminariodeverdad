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

const busquedaProductos = async (req, res) => {
    try {
        const response = await pool.query('select * from producto');
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const obtenerIdSupervisor = async (req, res) => {
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
    obtenerIdSupervisor,
}