import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TextInput, StatusBar, FlatList, Image, TouchableOpacity, Dimensions, Alert, ToastAndroid, Platform } from 'react-native'

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
        backgroundColor: '#fff',
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
})

export default function Categoria({ navigation }) {
    const [report, setReport] = useState([])
    const [filterReport, setFilterReport] = useState([])
    const [loading, setLoading] = useState(false)
    const [sinProductos, setSinProductos] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const categoria = navigation.getParam('cat', '0')

    const filtrarReport = (text) => {
        //FILTRO DEL PRODUCTO  POR SUBCATEGORIA
        if (text) {
            const newData = report.filter((item) => {
                const itemData = item.nombre_subcategoria + ' ' + item.nombre_subcategoria + ' ' + item.nombre_subcategoria + ' ' + item.nombre_subcategoria.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setBusqueda(text)
            setFilterReport(newData)
            setLoading(false)
        }
        else {
            setBusqueda(text)
            setFilterReport(report)
        }
    }

    const getReports = async () => {
        //OBTIENE LOS PRODUCTOS POR SUBCATEGORIA
        setBusqueda('')
        try {
            setLoading(true)
            const json = JSON.stringify({ id_categoria: categoria })
            const response = await fetch(Route + 'busquedaSubcategorias',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                }
            )
            const data = await response.json()
            if (await data.length != 0) {
                setSinProductos(false)
                setLoading(false)
                setFilterReport(data)
                setReport(data)
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

    const goProductos = (item) => {
        //console.log(item)
        //VA A LA PANTALLA DE PRODUCTOS 
        navigation.navigate('Productos_subcategorias', {
            subcategoria: item
        })
    }
    useEffect(() => {
        //INICIACI??N DE LA CLASE
        getReports()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />

            <View style={styles.header} />

            <Animatable.View animation={'fadeInUpBig'} style={styles.body}>
                <View style={styles.card}>
                    <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                            <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>??Que buscas?</Text>
                        </View>
                        <View style={styles.action}>
                            <MaterialIcons color="gray" name="search" size={20} style={{ flex: 1, marginRight: 10, alignSelf: 'center' }} />
                            <TextInput
                                placeholder="Buscar subcategoria"
                                style={{ width: '100%', flex: 10 }}
                                onChangeText={(text) => filtrarReport(text)}
                                value={busqueda} />
                        </View>

                        {
                            filterReport.length > 0 ? (
                                <FlatList
                                    data={filterReport}
                                    key={(x) => filterReport.indexOf(x)}
                                    keyExtractor={(x) => filterReport.indexOf(x)}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.itemContainer} onPress={() => goProductos(item)}>
                                            <View style={{ flexDirection: 'row', width: '100%',marginBottom:5 }}>
                                                <View style={{ flexDirection: 'column', width: '10%', marginTop: 10 }}>
                                                    <MaterialIcons name="fiber-manual-record" color="#5dd069" size={30} style={{ flex: 1, alignSelf: 'center', }} />
                                                    <MaterialIcons name="east" color="#5dd069" size={30} style={{ flex: 1, alignSelf: 'center', marginTop: 10 }} />
                                                </View>
                                                <View style={{ flexDirection: 'column', marginTop: 2, width: '50%', marginTop: 14 }}>
                                                    <Text style={{ flex: 15, fontSize: 18, fontWeight: 'bold', color: '#000' }}>{item.nombre_subcategoria}</Text>
                                                    <Text style={{ flex: 15, fontSize: 17, fontWeight: 'bold', color: '#000', marginTop: 10 }}>{item.cantidad} Producto disponibles </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    style={{ height: '85%' }}
                                />
                            ) : (
                                loading ? (
                                    <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                                        <ActivityIndicator size="small" color="#000" />
                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, marginBottom: 10, marginTop: 5 }}>Cargando...</Text>
                                    </View>
                                ) : (
                                    sinProductos ? (
                                        <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                                                <MaterialCommunityIcons name="emoticon-sad" color='#000' size={80} />
                                            </Animatable.View>

                                            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>??No existen subcategorias aqui!</Text>
                                        </View>
                                    ) : (
                                        <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                                            <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                                                <MaterialCommunityIcons name="reload" color='#000' size={80} />
                                            </Animatable.View>

                                            <Text style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>??Sin conex??on a internet!</Text>
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
            </Animatable.View>
        </View>
    )
}