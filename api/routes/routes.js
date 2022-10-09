const {Router} = require('express');
const router = Router();

const { login, updateTrabajador, getLastHora, getMaxFechaHora,getMaxHora, getFaenaVehiculo, vehiculos, verificarReport, motivoDetencion, verificarHorometro, agregarHorometroinicio,agregarHorometrocomun,agregarHorometrofinal,obtenerIdSupervisor, verificarCierre, cerrarReport, verificarCerrarReport,obtenerReportPendientes,obtenerIdSupervisor2,numeroPendientesFecha,getLastHorayFecha,funcionamientox,ultimoHorometro,pruebas,verificarReportHorometro } = require('../controller/functions');
const { usuario, comuna, faena, vehiculo, vehiculoFaena, proveedor, labor, trabajador, tipoTrabajador, tipoVehiculo, tipoDetencion, estanque, combustible, verificacion} = require('../controller/sync')

router.post('/misupervisor/login', login);
router.post('/misupervisor/hora', getMaxHora);
router.post('/misupervisor/ultima-hora', getLastHora);
router.post('/misupervisor/verificar-report', verificarReport);
router.post('/misupervisor/faena-vehiculo', getFaenaVehiculo);
router.post('/misupervisor/vehiculos', vehiculos);
router.post('/misupervisor/motivo-detencion', motivoDetencion);
router.post('/misupervisor/verificar-horometro', verificarHorometro);
router.post('/misupervisor/agregar-horometro-inicio', agregarHorometroinicio);
router.post('/misupervisor/agregar-horometro-comun', agregarHorometrocomun);
router.post('/misupervisor/agregar-horometro-final', agregarHorometrofinal);
router.post('/misupervisor/verificar-funcionamiento', funcionamientox);
router.post('/misupervisor/obtener-supervisor', obtenerIdSupervisor);
router.post('/misupervisor/verificar-cierre-report', verificarCerrarReport);
router.post('/misupervisor/verificar-cierre', verificarCierre);
router.post('/misupervisor/cerrar-report', cerrarReport);
router.post('/misupervisor/update-trabajador', updateTrabajador);
router.post('/misupervisor/obtener-reports', obtenerReportPendientes);
router.post('/misupervisor/obtener-usuario', obtenerIdSupervisor2);
router.post('/misupervisor/pendientes-fecha', numeroPendientesFecha);
router.post('/misupervisor/ultima-hora-fecha', getLastHorayFecha);
router.post('/misupervisor/ultimo-horometro', ultimoHorometro);
router.post('/misupervisor/verificar-report-horometro', verificarReportHorometro);
router.post('/misupervisor/pruebas', pruebas);
router.post('/misupervisor/horax', getMaxFechaHora);


router.post('/misupervisor/sync/usuario', usuario);
router.post('/misupervisor/sync/faena', faena);
router.post('/misupervisor/sync/comuna', comuna);
router.post('/misupervisor/sync/vehiculo', vehiculo);
router.post('/misupervisor/sync/vehiculo-faena', vehiculoFaena);
router.post('/misupervisor/sync/tipo-vehiculo', tipoVehiculo);
router.post('/misupervisor/sync/trabajador', trabajador);
router.post('/misupervisor/sync/tipo-trabajador', tipoTrabajador);
router.post('/misupervisor/sync/proveedor', proveedor);
router.post('/misupervisor/sync/labor', labor);
router.post('/misupervisor/sync/tipo-detencion', tipoDetencion);
router.post('/misupervisor/sync/estanque', estanque);
router.post('/misupervisor/sync/combustible', combustible);
router.post('/misupervisor/sync/verificacion', verificacion);

module.exports = router;
