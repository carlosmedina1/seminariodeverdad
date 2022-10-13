import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, TouchableOpacity, Image,Dimensions, ScrollView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Modal from '../components/customModal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from "moment";

import * as Animatable from 'react-native-animatable'
import Route from '../hooks/routes'

const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    imgPersonas: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginVertical: 7,
    },
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

export default function detalleProducto({ navigation }) {
    const producto = navigation.getParam('producto', '0')
    const [faenaVehiculo, setFaenaVehiculo] = useState({})
    
    const [user, setUser] = useState(0)
    const date = new Date()
    const mes =date.getMonth()+1
    const facha = (date.getDate()<10 ? '0'+date.getDate() : date.getDate())+'/'+ (mes <10 ? '0' + mes : mes)+'/'+date.getFullYear()
    const [detalleFecha, setdetalleFecha] = useState(facha)
    const [loading, setLoading] = useState(false)

    const [btnIniciar, setBtnIniciar] = useState(true)
    const [btnDetencion, setBtnDetener] = useState(false)
    const [maxHoraAlcanzada, setMaxHoraAlcanzada] = useState(false)
    
    const [loadingLocation, setLoadingLocation] = useState(false)
    const [report, setReport] = useState(false)


    useEffect(() => {
        //getFaenaVehiculo()
        //_loadUser()
    }, [])

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
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000',  }}>Detalle del Producto:</Text>
                            </View>

                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Información General:</Text>
                            <View style={styles.itemContainer}>
                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>NOMBRE PRODUCTO </Text>
                                    <Text style={{ fontSize: 14, }}>{producto.nombre_producto}</Text>
                                </View>

                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Likes: </Text>
                                    <Text style={{ fontSize: 14, }}>{producto.likes}</Text>
                                </View>

                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Usuario: </Text>
                                    <Text style={{ fontSize: 14, }}>{producto.id_usuario}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Imagenes: </Text>
                            <View style={styles.itemContainer}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, }}>
                                    <ScrollView horizontal={true} flexDirection="row">
                                        <View style={{ marginLeft: 10 }}>
                                            <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: "http://placekitten.com/100/200" }}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: "http://placekitten.com/100/200" }}
                                        />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: "http://placekitten.com/100/200" }}
                                        />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: "http://placekitten.com/100/200" }}
                                        />
                                        </View>
                                        <View style={{ marginHorizontal: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: "http://placekitten.com/100/200" }}
                                        />
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => comentarProducto()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom: 10,marginTop:10 }}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='warning' color='red' size={20} />
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Comentarios</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={20} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => reportarProducto()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom: 10,marginTop:10}}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='warning' color='red' size={20} />
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Reportar</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={20} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Animatable.View animation={'fadeInUpBig'} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Cargando...</Text>

                    <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                        <MaterialCommunityIcons name='reload' size={40} color='#000' />
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
