const { Pool } = require('pg');

const dataConnection = {
    host: 'datamaule.cl',
    user: 'ccerda_tester',
    password: 's67zDes$y9]8',
    database: 'ccerda_admin_lsRentalPruebas',
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

const faena = async (req, res) => {
    const { usuario } = req.query
    try {
        const response = await pool.query('select f.* from faena f inner join trabajador t on t.id_trabajador = f.id_trabajador inner join usuario u on u.id_trabajador = t.id_trabajador where u.id_usuario = (select u.id_usuario from usuario u where u.nombre_usuario = $1);', [usuario]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const obtenerReportPendientes = async (req, res) => {
    const { idus } = req.body
    try {
        const response = await pool.query('select f.nombre_faena,v.id_vehiculo,v.patente,tv.nombre_tipo_vehiculo,pr.id_proveedor,pr.nombre_proveedor from report r join faena_vehiculo fv on fv.id_faena_vehiculo=r.id_faena_vehiculo join faena f on f.id_faena=fv.id_faena join vehiculo v on v.id_vehiculo=fv.id_vehiculo join tipo_vehiculo tv on tv.id_tipo_vehiculo=v.id_tipo_vehiculo join proveedor pr on pr.id_proveedor=v.id_proveedor where r.id_supervisor=$1 and r.cerrado=false;', [idus]);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}
const obtenerIdSupervisor2 = async (req, res) => {
    const { nu } = req.body
    try{
        const response = await pool.query('select id_usuario from usuario where nombre_usuario = $1;', [nu])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}
const numeroPendientesFecha = async (req, res) => {
    const { id_usuario,fecha } = req.body
    try{
        const response = await pool.query('select count(id_report) as cantidad from report where id_supervisor=$1 and cerrado=false and fecha_report <> $2', [id_usuario,fecha])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}
const vehiculos = async (req, res) => {
    const { idFanea } = req.body
    console.log(idFanea)
    try {
        const response = await pool.query('select v.id_vehiculo, v.patente, tv.nombre_tipo_vehiculo, p.nombre_proveedor from vehiculo v inner join tipo_vehiculo tv on v.id_tipo_vehiculo = tv.id_tipo_vehiculo inner join proveedor p on v.id_proveedor = p.id_proveedor inner join faena_vehiculo fv on fv.id_vehiculo = v.id_vehiculo where fv.id_faena = $1 and fv.vigente = true;', [idFanea])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}

const motivoDetencion = async (req, res) => {
    try {
        const response = await pool.query('select * from motivo_detencion;', []);
        res.json(response.rows)
    }
    catch (err) {
        res.json(err)
    }
}

const funcionamiento = async (req, res) => {
    const { idFaenaVehiculo } = req.body
    try{
        const response = await pool.query('select * from funcionamiento_vehiculo where id_faena_vehiculo = $1;', [idFaenaVehiculo])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}

const obtenerIdSupervisor= async (req, res) => {
    const { idVehiculo } = req.body
    console.log(idVehiculo)
    try{
        const response = await pool.query('select r.id_supervisor from report r join faena_vehiculo f on r.id_faena_vehiculo=f.id_faena_vehiculo where f.id_vehiculo=$1 and r.cerrado=false', [idVehiculo])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}


const verificarCerrarReport = async (req, res) => {
    const { idFaenaVehiculo } = req.body
    try {
        const response = await pool.query('select cerrado from report where id_faena_vehiculo = $1', [ idFaenaVehiculo ])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}


const verificarHorometro = async (req, res) => {
    const { idFaenaVehiculo } = req.body
    try{
        const response = await pool.query('select horometro_ingresado from funcionamiento_vehiculo where id_faena_vehiculo = $1', [idFaenaVehiculo])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}

const updateTrabajador = async (req, res) => {
    const { idTrabajador, idReportApertura } = req.body
    try{
        const id_report = await pool.query('select id_report from detalle_report where id_detalle_report = $1', [idReportApertura])
        const idReport = id_report.rows[0].id_report

        const updateTrabajador = await pool.query('update report set id_trabajador = $1 where id_report = $2', [idTrabajador, idReport])
        res.json(updateTrabajador.rows)
    }
    catch(err){
        res.json(err.message)
    }
}

const cerrarReport = async (req, res) => {
    const { idFaenaVehiculo, folio, horometroTermino } = req.body
    try{
        const request = await pool.query('select id_report from report where id_faena_vehiculo = $1 and cerrado = false;', [idFaenaVehiculo.id_faena_vehiculo])
        if(request.rowCount == 0){
            console.log('no hay report abierto para este id_faena_vehiculo')
        }

        else {
            const id_report = request.rows[0].id_report

            const detalle_report = await pool.query('select d.id_detalle_report from detalle_report d where d.id_report=(select r.id_report from report r where r.id_faena_vehiculo= $1 and r.cerrado = false) and con_cierre=false order by d.fecha_hora_supervisor desc limit 1;', [idFaenaVehiculo.id_faena_vehiculo])
            const id_detalle_report = detalle_report.rows[0].id_detalle_report

            const update_detalle = await pool.query('update detalle_report set detencion_parcial = false where id_detalle_report = $1;', [id_detalle_report])
            const res2 = update_detalle.rows

            const request_4 = await pool.query('update report set folio_report = $1, cerrado = true, horometro_termino = $2 where id_report = $3',[folio, horometroTermino, id_report])
            const response = await pool.query('select horometro from detalle_report where id_report=$1 order by id_detalle_report desc limit 1;', [id_report])
            res.json(response.rows)
        }
    }
    catch(err){
        res.json(err.message)
    }
}
//borrar
const agregarHorometroinicio = async (req, res) => {
    const { idFaenaVehiculo, horometro } = req.body
    try{
        const report = await pool.query('select id_report from report where id_faena_vehiculo = $1 and cerrado = false;', [idFaenaVehiculo])
        const id_report = report.rows[0].id_report
        //const response = await pool.query('update detalle_report set horometro = $2 where id_detalle_report = $1;', [id_detalle_report, horometro])
        const response2 = await pool.query('update report set horometro_inicio = $2 where id_report = $1;', [id_report, horometro])
        res.json(response2.rows)
    }
    catch(err){
        res.json(err.message)
    }
}
//borrar
const agregarHorometrocomun = async (req, res) => {
    const {idFaenaVehiculo,horometro,id_detalle_report } = req.body
    try{
        const response = await pool.query('update detalle_report set horometro = $2 where id_detalle_report = $1;', [id_detalle_report, horometro])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}
const agregarHorometrofinal = async (req, res) => {
    const { idFaenaVehiculo, horometro,id_detalle_report } = req.body
    try{
        const report = await pool.query('select id_report from report where id_faena_vehiculo = $1 and cerrado = false;', [idFaenaVehiculo])
        const id_report = report.rows[0].id_report
        const response = await pool.query('update detalle_report set horometro = $2 where id_detalle_report = $1;', [id_detalle_report, horometro])
        const response2 = await pool.query('update report set horometro_termino = $2 where id_report = $1;', [id_report, horometro])
        res.json(response2.rows)
    }
    catch(err){
        res.json(err.message)
    }
}
const verificarCierre = async (req, res) => {
    const { idFaenaVehiculo, id_labor, id_usuario, fecha_hora, fecha_hora_supervisor, latitud, longitud, detencion_parcial, folio, horometroTermino, idTrabajador } = req.body
    console.log()
    try{
        const response = await pool.query('select verificar_cierre($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [idFaenaVehiculo, id_labor, id_usuario, fecha_hora, fecha_hora_supervisor, latitud, longitud, detencion_parcial, folio, horometroTermino, idTrabajador])
        //console.log('response: ')
        res.json(response.rows)
    }
    catch(err){
        console.log(err.message)
        res.json(err.message)
    }
}

const getFaenaVehiculo = async (req, res) => {
    const { idVehiculo } = req.body
    try{   
        const response = await pool.query('select * from faena_vehiculo where id_vehiculo = $1;', [idVehiculo])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}

const getMaxHora = async (req, res) => {
    const {idFaenaVehiculo} = req.body
    try {
        const response = await pool.query('select (select d.fecha_hora_supervisor::time from detalle_report d where d.id_report=(select r.id_report from report r where r.id_faena_vehiculo=$1 and r.cerrado = false) and con_cierre=true order by d.fecha_hora_supervisor desc limit 1)::varchar;',[idFaenaVehiculo])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const getMaxFechaHora = async (req, res) => {
    const {idFaenaVehiculo} = req.body
    try {
        const response = await pool.query("select (select to_char(d.fecha_hora_supervisor,'dd/mm/YYYY HH24:MI:SS') as fecha_hora_supervisor from detalle_report d where d.id_report=(select r.id_report from report r where r.id_faena_vehiculo=$1 and r.cerrado = false) and con_cierre=true order by d.fecha_hora_supervisor desc limit 1)::varchar;",[idFaenaVehiculo])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}

const getLastHora = async (req, res) => {
    const {idFaenaVehiculo} = req.body
    try {
        const response = await pool.query('select (select d.fecha_hora_supervisor::time from detalle_report d where  d.id_report=(select r.id_report from report r where r.id_faena_vehiculo=$1 and cerrado = false) and con_cierre=false order by d.id_detalle_report desc limit 1)::varchar;',[idFaenaVehiculo])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const getLastHorayFecha = async (req, res) => {
    const {idFaenaVehiculo} = req.body
    try {
        const response = await pool.query('select (select d.fecha_hora_supervisor from detalle_report d where  d.id_report=(select r.id_report from report r where r.id_faena_vehiculo=$1 and cerrado = false) and con_cierre=false order by d.id_detalle_report desc limit 1)::varchar;',[idFaenaVehiculo])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const funcionamientox = async (req, res) => {
    const { idFaenaVehiculo } = req.body
    try{
        const response = await pool.query('select dr.con_cierre from detalle_report dr join report r on dr.id_report =r.id_report where r.id_faena_vehiculo=$1 and cerrado=false  order by dr.id_detalle_report desc limit 1;', [idFaenaVehiculo])
        if(Object.entries(response.rows).length>0){
            const response2 = await pool.query("select to_char(dr.fecha_hora_supervisor,'dd/mm/YYYY') as fecha_hora_supervisor from detalle_report dr join report r on dr.id_report =r.id_report where r.id_faena_vehiculo=$1 and cerrado=false  order by dr.id_detalle_report asc limit 1;", [idFaenaVehiculo])
            res.json({ abierto: 1,con_cierre: response.rows[0].con_cierre, fecha_hora_supervisor : response2.rows[0].fecha_hora_supervisor})
        }else{
            res.json({ abierto: 0,con_cierre: 0, fecha_hora_supervisor : 0})
        }
    }
    catch(err){
        res.json(err.message)
    }
}
const pruebas= async (req, res) => {
    const { idFaenaVehiculo } = req.body
    try{
        const response = await pool.query('select dr.con_cierre from detalle_report dr join report r on dr.id_report =r.id_report where r.id_faena_vehiculo=$1 and cerrado=false  order by dr.id_detalle_report desc limit 1;', [idFaenaVehiculo])
        if(Object.entries(response.rows).length>0){
            const response2 = await pool.query("select to_char(dr.fecha_hora_supervisor,'dd/mm/YYYY') as fecha_hora_supervisor from detalle_report dr join report r on dr.id_report =r.id_report where r.id_faena_vehiculo=$1 and cerrado=false  order by dr.id_detalle_report asc limit 1;", [idFaenaVehiculo])
            res.json({ abierto: 1,con_cierre: response.rows[0].con_cierre, fecha_hora_supervisor : response2.rows[0].fecha_hora_supervisor})
        }else{
            console.log('aaaaaa')
            res.json({ abierto: 0,con_cierre: 0, fecha_hora_supervisor : 0})
        }
    }
    catch(err){
        res.json(err.message)
    }
}
const ultimoHorometro= async (req, res) => {
    const { idFaenaVehiculo } = req.body
    try{
        console.log()
        const report = await pool.query('select id_report from report where id_faena_vehiculo = $1 and cerrado = false;', [idFaenaVehiculo])
        const id_report = report.rows[0].id_report
        const response = await pool.query('select horometro from detalle_report where id_report=$1 order by id_detalle_report desc limit 1;', [id_report])
        res.json(response.rows)
    }
    catch(err){
        res.json(err.message)
    }
}

const verificarReport = async (req, res) => {
    const { idFaenaVehiculo, idUsuario, fecha, fechaSupervisor, latitud, longitud ,id_trabajador } = req.body
    try {
        const response = await pool.query('select verificar_report($1, $2, $3, $4, $5, $6, 0,$7)', [ idFaenaVehiculo, idUsuario, fechaSupervisor, fecha, latitud, longitud,id_trabajador])
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
const verificarReportHorometro = async (req, res) => {
    const { idFaenaVehiculo, idUsuario, fecha, fechaSupervisor, latitud, longitud,horometro,id_trabajador } = req.body
    try {
        console.log(req.body)
        const response = await pool.query('select verificar_report($1, $2, $3, $4, $5, $6, $7, $8)', [ idFaenaVehiculo, idUsuario, fechaSupervisor, fecha, latitud, longitud,horometro,id_trabajador])
        //console.log(response)
        res.json(response.rows)
    }
    catch (err) {
        res.json(err.message)
    }
}
module.exports = {
    getLastHora,
    getMaxHora,
    login,
    updateTrabajador,
    faena,
    getFaenaVehiculo,
    vehiculos,
    verificarReport,
    funcionamiento,
    obtenerIdSupervisor,
    motivoDetencion,
    verificarHorometro,
    verificarCerrarReport,
    agregarHorometroinicio,
    agregarHorometrofinal,
    agregarHorometrocomun,
    verificarCierre,
    cerrarReport,
    obtenerReportPendientes,
    obtenerIdSupervisor2,
    numeroPendientesFecha,
    getLastHorayFecha,
    funcionamientox,
    ultimoHorometro,
    pruebas,
    verificarReportHorometro,
    getMaxFechaHora,
}