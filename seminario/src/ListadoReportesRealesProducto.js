import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, StatusBar, FlatList, Image, TouchableOpacity, Dimensions, Alert, ToastAndroid, Platform } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from '../components/customModal'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Animatable from 'react-native-animatable'
import Route from '../hooks/routes'
import { set } from 'react-native-reanimated';


const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: Math.round(windowHeight),
        backgroundColor: '#fff',
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
        flexDirection: 'row',
        width: '100%',
        height: '40%',
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    botonComentario: {
        flexDirection: 'row',
        height: '30%',
        width: '100%',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        backgroundColor: '#000', borderRadius: 10, height: 60, marginTop: 20, alignItems: 'center', justifyContent: 'center'
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
        alignItems: 'center',
        justifyContent: 'center',
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
        justifyContent: 'center',

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
    contentContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    footer: {
        flex: 0.5,
        width: '100%',
        height: '100%',
        //backgroundColor: 'red'
    },
    imgPersonas: {
        width: 250,
        height: 200,
        borderRadius: 20,
        marginVertical: 7,
    },
})

export default function ListadoReportesRealesProducto({ navigation }) {
    const [filterReport, setFilterReport] = useState([])
    const [loading, setLoading] = useState(false)
    const [sinProductos, setSinProductos] = useState(false)
    const datax = navigation.getParam('datax', '0')


    const getReports = async () => {
        //OBTETIENE LOS REPORTES DEL PRODUCTO ELEGIDO
        try {
            setLoading(true)
            const json = JSON.stringify({ id_producto: datax.id_producto })
            const response = await fetch(Route + 'listadoReportesRealesProducto',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                }
            )
            const data = await response.json()
            console.log(data)
            if (await data.length != 0) {
                setSinProductos(false)
                setLoading(false)
                setFilterReport(data)
            } else {
                setSinProductos(true)
                setLoading(false)
            }
        }
        catch (e) {
            setSinProductos(false)
            console.log(e)
            setLoading(false)
        }
    }

    const enviarApruebo = async () => {
        //APRUEBA LOS REPORTES
        try {
            setLoading(true)
            const json = JSON.stringify({ id_producto: datax.id_producto })
            const response = await fetch(Route + 'aprueboReporteProducto',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                }
            )
            const data = await response.json()
            console.log(data)
            if (await data.length != 0) {
                setLoading(false)
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Todos los reportes fueron Aprobados', ToastAndroid.SHORT)
                    navigation.pop(5)
                }
                else {
                    Alert.alert('Todos los reportes fueron Aprobados')
                    navigation.pop(5)
                }
            }
        }
        catch (e) {
            console.log(e)
            setLoading(false)
        }
    }
    const enviarRechazo = async () => {
        //RECHAZA LOS REPORTES
        try {
            setLoading(true)
            const json = JSON.stringify({ id_producto: datax.id_producto })
            const response = await fetch(Route + 'rechazoReporteProducto',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                }
            )
            const data = await response.json()
            console.log(data)
            if (await data.length != 0) {
                setLoading(false)
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Todos los reportes fueron Rechazados', ToastAndroid.SHORT)
                    navigation.pop(5)
                }
                else {
                    Alert.alert('Todos los reportes fueron Rechazados')
                    navigation.pop(5)
                }
            }
        }
        catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(() => {
        //INICIO DE LA CLASE
        getReports()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            <Animatable.View animation={'fadeInUpBig'} style={styles.body}>
                <View style={styles.card}>
                    <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column', height: '7%' }}>
                            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, marginTop: 20 }}>
                                <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                    <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>Reportes de {datax.nombre_producto}</Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'column', height: '38%' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Descripción: </Text>
                        <View style={styles.itemContainer}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>{datax.descripcion}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Acciones: </Text>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => enviarApruebo()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='check' color='green' size={30} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Aprobar Reportes</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={30} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => enviarRechazo()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='cancel' color='red' size={30} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Rechazar Reportes</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={30} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Justificaciones de reportes: </Text>
                        <View style={{ flexDirection: 'column', height: '55%' }}>
                            {
                                
                                filterReport.length > 0 ? (
                                    <FlatList
                                        data={filterReport}
                                        key={(x) => filterReport.indexOf(x)}
                                        keyExtractor={(x) => filterReport.indexOf(x)}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.itemContainer}>
                                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                                    <View style={{ flexDirection: 'column', marginTop: 10, width: '100%' }}>
                                                        <Text style={{ flex: 15, fontSize: 30, fontWeight: 'bold', color: '#000' }}>{item.justificacion} </Text>
                                                        <Text style={{ flex: 15, fontSize: 17, fontWeight: 'bold', color: '#000', marginTop: 6 }}>Escrito por: {item.nombre_usuario}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )}
                                        style={{ height: '70%' }}
                                    />
                                ) : (
                                    loading ? (
                                        <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                                            <ActivityIndicator size="small" color="#000" />
                                            <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, marginBottom: 10, marginTop: 5 }}>Cargando...</Text>
                                        </View>
                                    ) : (
                                        sinProductos ? (
                                            <View style={{ width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                                                    <MaterialCommunityIcons name="emoticon-sad" color='#000' size={80} />
                                                </Animatable.View>
                                                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>¡No hay reportes de comentarios!</Text>
                                            </View>
                                        ) : (
                                            <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                                                <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                                                    <MaterialCommunityIcons name="reload" color='#000' size={80} />
                                                </Animatable.View>

                                                <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>¡Sin conexión a internet!</Text>
                                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => getReports()}>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'gray', }}>Puede intentar </Text>
                                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'blue', }}>volver a Recargar. </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    )
                                )
                            }
                        </View>
                    </View>
                </View>
            </Animatable.View >
        </View >
    )
}