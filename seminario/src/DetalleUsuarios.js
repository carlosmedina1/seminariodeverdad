import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, TouchableOpacity, Image, Dimensions, ScrollView, Platform, ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Modal from '../components/customModal'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from "moment";

import * as Animatable from 'react-native-animatable'
import Route from '../hooks/routes'
import Message from '../components/message'

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

export default function DetalleProductoEliminado({ navigation }) {
    const usuario = navigation.getParam('usuario', '0')

    const comentarProducto = async () => {
        const json = JSON.stringify({ id_usuario: usuario.id_usuario,vigente:usuario.vigente })
        await fetch(Route + 'cambiarEstadoUsuario',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then((response) => response.json())
            .then((data) => {
                if (Platform.OS === 'android') {
                    ToastAndroid.show('Usuario Alterado', ToastAndroid.SHORT)
                    navigation.pop(3)
                }
                else {
                    Alert.alert('Usuario Alterado')
                    navigation.pop(3)
                }

            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <View animation={'fadeInUpBig'} style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            <ScrollView style={styles.body}>
                <View style={styles.card}>
                    <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                            <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>{usuario.nombre_usuario}</Text>
                        </View>

                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Información General:</Text>
                        <View style={styles.itemContainer}>
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', width: '90%', marginTop: 10 }}>
                                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Correo: </Text>
                                        <Text style={{ fontSize: 14, }}>{usuario.correo_electronico}</Text>
                                    </View>

                                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Cantidad de productos: </Text>
                                        <Text style={{ fontSize: 14, }}>{usuario.cantidad_productos}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Opciones: </Text>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => comentarProducto()}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                    <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        {usuario.vigente ?
                                            <>
                                                <MaterialIcons name='cancel' color='red' size={30} />
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Deshabilitar</Text>
                                            </>
                                            :
                                            <>
                                                <MaterialIcons name='check' color='green' size={30} />
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Habilitar</Text>
                                            </>
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}
