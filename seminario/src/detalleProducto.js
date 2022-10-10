import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Modal from '../components/customModal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from "moment";

import * as Animatable from 'react-native-animatable'
import * as SQLite from 'expo-sqlite'
import * as Location from 'expo-location';
import Route from '../hooks/routes'

const bd = SQLite.openDatabase('localhost.db', '1.0')
const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        minHeight: Math.round(windowHeight),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.3,
    },

    header: {
        flex: 0.5,
    },

    action: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },

    descAction: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    botonAtras: {
        marginRight: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    body: {
        flex: 10,
        width: '100%',
        height: '100%',
        //backgroundColor: 'red',
    },

    card: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },

    itemContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },

    timeAction: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },

    labor: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },

    footer: {
        flex: 0.5,
        width: '100%',
        height: '100%',
        //backgroundColor: 'red'
    },
})

export default function detalleVehiculo({ navigation }) {
    const vehiculo = navigation.getParam('vehiculo', '0')
    const [faenaVehiculo, setFaenaVehiculo] = useState({})
    
    const [user, setUser] = useState(0)
    const date = new Date()
    const mes =date.getMonth()+1
    const facha = (date.getDate()<10 ? '0'+date.getDate() : date.getDate())+'/'+ (mes <10 ? '0' + mes : mes)+'/'+date.getFullYear()
    const [detalleFecha, setdetalleFecha] = useState(facha)
    const [loading, setLoading] = useState(true)

    const [btnIniciar, setBtnIniciar] = useState(true)
    const [btnDetencion, setBtnDetener] = useState(false)
    const [maxHoraAlcanzada, setMaxHoraAlcanzada] = useState(false)
    
    const [loadingLocation, setLoadingLocation] = useState(false)
    const [report, setReport] = useState(false)

    const handleCambiarEstado = (text, location) => {
        if (text === 'iniciar') {
            if (btnIniciar) {
                navigation.navigate('IniciarForm', {
                    latitude: location != null ? location.coords.latitude : 0,
                    longitude: location != null ? location.coords.longitude : 0,
                    idUsuario: user,
                    idFaenaVehiculo: faenaVehiculo.id_faena_vehiculo,
                    report: report,
                    vehiculo: vehiculo,
                })
            }
        }
        else {
            if (btnDetencion) {
                navigation.navigate('DetenerForm', {
                    latitude: location.coords.latitude != null ? location.coords.latitude : 0,
                    longitude: location.coords.longitude != null ? location.coords.longitude : 0,
                    idUsuario: user,
                    idFaenaVehiculo: faenaVehiculo.id_faena_vehiculo,
                    idVehiculo: vehiculo.id_vehiculo,
                    vehiculo: vehiculo,
                })
            }
        }
    }

    const getIdUsuario = (usuario) => {
        bd.transaction(tx => {
            tx.executeSql(
                'select id_usuario from usuario where nombre_usuario = ?;',
                [usuario],
                (tx, res) => {
                    setUser(res.rows._array[0].id_usuario)
                },
                (tx, error) => {
                    console.error(error.message)
                },
            )
        })
    }
    const getFaenaVehiculo = () => {
        bd.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM faena_vehiculo WHERE id_vehiculo = ?;', [vehiculo.id_vehiculo],
                (tx, res) => {
                    if (res.rows.length != 0) {
                        setFaenaVehiculo(res.rows._array[0])
                        verificarFuncionamiento(res.rows._array[0].id_faena_vehiculo)
                        
                    }
                    else {
                        const json = JSON.stringify({ idVehiculo: vehiculo.id_vehiculo })
                        getAsyncFaenaVehiculo(json)
                    }
                },
                (tx, error) => {
                    console.error(error.message)
                },
            )
        })
    }
    const getFechaReport = (fecha,id) => {
        bd.transaction(tx => {
            tx.executeSql(
                'select fecha_report from verificacion where id_vehiculo=?;',[vehiculo.id_vehiculo],
                (tx, res) => {
                    if (res.rows.length != 0) {
                        var d = new Date(res.rows._array[0].fecha_report);
                        const m =d.getUTCMonth()+1
                        const fecha2 = d.getUTCFullYear()+'-'+ (m <10 ? '0' + m : m)+'-'+(d.getUTCDate()<10 ? '0'+d.getUTCDate() : d.getUTCDate())
                        if(fecha!=fecha2){
                            const json = JSON.stringify({ idFaenaVehiculo: id })
                            getUltimaHoraFecha(json,fecha2)
                        }else{
                            setBtnIniciar(true)
                        }
                    }
                },
                (tx, e) => {
                    console.error(e)
                }
            )
        })
    }
    const getAsyncFaenaVehiculo = async (json) => {
        await fetch(Route + 'faena-vehiculo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        })
            .then(response => response.json())
            .then((data) => {
                setFaenaVehiculo(data[0])
                verificarFuncionamiento(data[0].id_faena_vehiculo)
            })
            .catch((e) => {
                console.error(e)
            })
    }
    const getUltimaHoraFecha = async (json,fechaReport) => {
        await fetch(Route + 'ultima-hora-fecha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        })
            .then(response => response.json())
            .then((data) => {
                var dt = data[0].fecha_hora_supervisor
                var ultimo_dia_hora = moment(dt).format('YYYY-MM-DD HH:mm:ss')
                const d = new Date(fechaReport);
                d.setDate(d.getDate() + 1);
                const m =d.getUTCMonth()+1
                const dia_siguiente_report = d.getUTCFullYear()+'-'+ (m <10 ? '0' + m : m)+'-'+(d.getUTCDate()<10 ? '0'+d.getUTCDate() : d.getUTCDate())+' 00:00:00'
                console.log(ultimo_dia_hora)
                console.log(dia_siguiente_report)
                if(ultimo_dia_hora==dia_siguiente_report){
                    setMaxHoraAlcanzada(true)
                    console.log("1")
                    setReport(true)
                    setBtnIniciar(false)
                }else{
                    setReport(true)
                    console.log("2")
                    setBtnIniciar(true)
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }
    const verificarFuncionamiento = async (id) => {
        const json = JSON.stringify({ idFaenaVehiculo: id })
        console.log(id)
        await fetch(Route + 'verificar-funcionamiento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then((data) => {
                
                if (data.abierto > 0) {
                    setdetalleFecha(data.fecha_hora_supervisor)
                    if(!data.con_cierre){
                        //esta detenido
                        console.log('report abierto en detencion')
                        setReport(true)
                        setBtnDetener(false)
                        setBtnIniciar(true)
                        const date = new Date()
                        const mes =date.getMonth()+1
                        const fecha = date.getFullYear()+'-'+ (mes <10 ? '0' + mes : mes)+'-'+(date.getDate()<10 ? '0'+date.getDate() : date.getDate()) 
                        getFechaReport(fecha,id)
                    }else{
                        //esta en funcionamiento
                        console.log('report abierto en funcionamiento')
                        setReport(false)
                        setBtnDetener(true)
                        setBtnIniciar(false)
                    }
                }else{
                    //no hay report abierto
                    //esta detenido
                    console.log('sin report listo para iniciar')
                    setReport(false)
                    setBtnDetener(false)
                    setBtnIniciar(true)

                }
                setLoading(false)
            })
            .catch((e) => {
                setLoading(false)
                console.log(e)
            })
    }
    const verificarHorometro = async (json) => {
        await fetch(Route + 'verificar-horometro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then((data) => {
                if(data.length > 0) {
                    if (data[0].horometro_ingresado == false) {
                        setReport(false)
                        console.log("3")
                    }
                    else {
                        console.log("4")
                        setReport(true)
                    }
                }
            })
            .catch((e) => {
                Alert.alert(
                    "¡Ups!",
                    "Hubo un error al enviar los datos: " + e.message,
                    [
                        {
                            text: "Cancelar",
                            onPress: () => navigation.pop(1),
                            style: "cancel"
                        },
                        {
                            text: "Reintentar",
                            onPress: () => verificarHorometro(json)
                        }
                    ]
                );
            })
    }

    const cerrarReport = () => {
        navigation.navigate('CerrarReport', {
            idFaenaVehiculo: faenaVehiculo,
            vehiculo: vehiculo
        })
    }

    const getUbicacion = async(state) => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permisos Denegados', 'Es necesario saber su ubicación para que la Aplicación funcione.', [{
                text: "Entendido",
                onPress: () => navigation.replace('Sync')
            }])
        }
        else {
            setLoadingLocation(true)
            let location = await Location.getCurrentPositionAsync({})
            setLoadingLocation(false)
            if(state){
                handleCambiarEstado('iniciar', location)
            }
            else {
                handleCambiarEstado('detener', location)
            }
        }
    }

    useEffect(() => {
        console.log("detalle_vehiculo")
        getFaenaVehiculo()
        _loadUser()
    }, [])

    const _loadUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user')
            getIdUsuario(user)
        }
        catch (e) {
            console.error('Error al traer los datos para el inicio de sesión: ')
            console.error(e)

            Alert.alert(
                'Error al Iniciar Sesión',
                'Hemos tenido un inconveniente recuperar los datos del Usuario',
                [{ text: 'Entendido', }]
            )
        }
    }

    return (
        <View animation={'fadeInUpBig'} style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            {!loading ? (
                <ScrollView style={styles.body}>
                    <View style={styles.card}>
                        <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                                <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                    <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center'}} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000',  }}>Detalle del Vehículo:</Text>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Información General:</Text>
                            <View style={styles.itemContainer}>
                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Tipo de Vehiculo: </Text>
                                    <Text style={{ fontSize: 14, }}>{vehiculo.nombre_tipo_vehiculo}</Text>
                                </View>

                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Patente: </Text>
                                    <Text style={{ fontSize: 14, }}>{vehiculo.patente}</Text>
                                </View>

                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Proveedor: </Text>
                                    <Text style={{ fontSize: 14, }}>{vehiculo.nombre_proveedor}</Text>
                                </View>

                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Fecha Apertura: </Text>
                                    <Text style={{ fontSize: 14, }}>{detalleFecha}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Procesos: </Text>
                            <View style={styles.itemContainer}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, }}>
                                    {btnIniciar ? (
                                        <>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginLeft: 5, }}>Maquina Detenida</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10, }}>
                                            <TouchableOpacity
                                                onPress={() => getUbicacion(true)}
                                                style={{ backgroundColor: btnIniciar ? 'green' : 'gray', width: 100, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10, }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Iniciar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => getUbicacion(false)}
                                                style={{ backgroundColor: btnDetencion ? 'red' : 'gray', width: 100, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Detener</Text>
                                            </TouchableOpacity>
                                        </View>
                                        </>
                                    ) : (
                                        maxHoraAlcanzada ? (
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginLeft: 5, textAlign: 'center', }}>El report ya supero las 24 horas del día de inicio, cierre el report</Text>
                                        ):(
                                            <>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginLeft: 5, }}>Maquina en Funcionamiento</Text>
                                            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 10, }}>
                                                <TouchableOpacity
                                                    onPress={() => getUbicacion(true)}
                                                    style={{ backgroundColor: btnIniciar ? 'green' : 'gray', width: 100, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10, }}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Iniciar</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => getUbicacion(false)}
                                                    style={{ backgroundColor: btnDetencion ? 'red' : 'gray', width: 100, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Detener</Text>
                                                </TouchableOpacity>
                                            </View>
                                            </>
                                        )
                                    )}
                                </View>
                            </View>

                            {report ? (
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity onPress={() => cerrarReport()}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                <MaterialIcons name='warning' color='red' size={20} />
                                                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Cerrar Report</Text>
                                            </View>

                                            <View style={{ flex: 1, }}>
                                                <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={20} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) : null}

                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Animatable.View animation={'fadeInUpBig'} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Cargando...</Text>

                    <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                        <MaterialCommunityIcons name='dump-truck' size={40} color='#000' />
                    </Animatable.View>
                </Animatable.View>
            )}

            <Modal visibility={loadingLocation}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialIcons name='location-pin' size={40} color='red' />
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <ActivityIndicator size="small" color="#000" style={{ marginRight: 10 }} />
                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, }}>Obteniendo Información...</Text>
                    </View>
                </View>
            </Modal>

        </View>
    )
}
