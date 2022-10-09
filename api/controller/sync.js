const { Pool } = require('pg');

const dataConnection = {
    host: 'datamaule.cl',
    user: 'ccerda_tester',
    password: 's67zDes$y9]8',
    database: 'ccerda_admin_lsRentalPruebas',
};

const pool = new Pool(dataConnection);

const faena = async (req, res) => {
    try{
        const response = await pool.query('select * from faena;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const vehiculoFaena = async (req, res) => {
    try{
        const response = await pool.query('select * from faena_vehiculo where vigente = true;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const tipoVehiculo = async (req, res) => {
    try{
        const response = await pool.query('select * from tipo_vehiculo;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const vehiculo = async (req, res) => {
    try{
        const response = await pool.query('select * from vehiculo where vigente = true;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const usuario = async (req, res) => {
    try{
        const response = await pool.query('select * from usuario order by id_usuario asc;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const comuna = async (req, res) => {
    try{
        const response = await pool.query('select c.id_comuna, c.nombre_comuna from faena f join comuna c on f.id_comuna = c.id_comuna order by 2;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const trabajador = async (req, res) => {
    try{
        const response = await pool.query('select * from trabajador;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const tipoTrabajador = async (req, res) => {
    try{
        const response = await pool.query('select * from tipo_trabajador;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const proveedor = async (req, res) => {
    try{
        const response = await pool.query('select * from proveedor;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const labor = async (req, res) => {
    try{
        const response = await pool.query('select * from labor;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const tipoDetencion = async (req, res) => {
    try{
        const response = await pool.query('select * from tipo_detencion;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const estanque = async (req, res) => {
    try{
        const response = await pool.query('select * from estanque_combustible;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}

const combustible = async (req, res) => {
    try{
        const response = await pool.query('select * from tipo_combustible;');
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}
const verificacion = async (req, res) => {
    const { id_usuario,fecha } = req.body
    try{
        const response = await pool.query('select r.id_faena_vehiculo,f.id_vehiculo,r.fecha_report from report r join faena_vehiculo f on f.id_faena_vehiculo=r.id_faena_vehiculo where r.cerrado=false and fecha_report <> $2 and r.id_supervisor=$1;', [id_usuario,fecha]);
        res.json(response.rows)
    }
    catch(err){
        res.json(err)
    }
}
module.exports = {
    comuna,
    usuario,
    faena,
    vehiculoFaena,
    vehiculo,
    trabajador,
    tipoTrabajador,
    tipoVehiculo,
    proveedor,
    labor,
    tipoDetencion,
    estanque,
    combustible,
    verificacion,
}