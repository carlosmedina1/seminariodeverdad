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

export default function Contactos({ navigation }) {
    const id_usuario = navigation.getParam('id_usuario', '0')
    const [whatsapp, setWhatsapp] = useState('')
    const [facebook, setfacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [numero, setNumero] = useState('')
    const [loading, setLoading] = useState(false)

    const getReports = async () => {
        try {
            setLoading(true)
            const json = JSON.stringify({ id_usuario: id_usuario })
            await fetch(Route + 'getContactos',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    setWhatsapp(data[0].whatsapp)
                    setfacebook(data[0].facebook)
                    setInstagram(data[0].instagram)
                    setNumero(data[0].numero_telefono)
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })

        }
        catch (e) {
            setSinProductos(false)
            console.log(e)
            setLoading(false)
        }
    }

    useEffect(() => {
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
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>Contactar</Text>
                        </View>
                        {
                            loading ? (
                                <View style={{ width: '100%', height: '90%', alignItems: 'center', justifyContent: 'center' }}>
                                    <ActivityIndicator size="small" color="#000" />
                                    <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, marginBottom: 10, marginTop: 5 }}>Cargando...</Text>
                                </View>
                            ) : (
                                <>
                                    <TouchableOpacity style={styles.itemContainer}>
                                        <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <MaterialCommunityIcons name="whatsapp" color="#60f760" size={100} style={{ flex: 1, alignSelf: 'center', width: '20%' }} />
                                            <View style={{ flexDirection: 'column', marginTop: 2, width: '80%', marginTop: 35 }}>
                                                <Text style={{ flex: 15, fontSize: 25, fontWeight: 'bold', color: '#000' }}>{whatsapp ? whatsapp: 'No tiene Whatsapp'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.itemContainer}>
                                        <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <MaterialCommunityIcons name="facebook" color="#1f5aff" size={100} style={{ flex: 1, alignSelf: 'center', width: '20%' }} />
                                            <View style={{ flexDirection: 'column', marginTop: 2, width: '80%', marginTop: 35 }}>
                                                <Text style={{ flex: 15, fontSize: 25, fontWeight: 'bold', color: '#000' }}>{facebook ? facebook: 'No tiene Facebook'}</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.itemContainer}>
                                        <View style={{ flexDirection: 'row', width: '100%', }}>
                                        <MaterialCommunityIcons name="instagram" color="#000" size={100} style={{ flex: 1, alignSelf: 'center', width: '20%' }} />
                                            <View style={{ flexDirection: 'column', marginTop: 2, width: '80%', marginTop: 35 }}>
                                                <Text style={{ flex: 15, fontSize: 25, fontWeight: 'bold', color: '#000' }}>{instagram ? instagram: 'No tiene Instagram'}</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.itemContainer}>
                                        <View style={{ flexDirection: 'row', width: '100%', }}>
                                            <MaterialCommunityIcons name="cellphone" color="#f01818" size={100} style={{ flex: 1, alignSelf: 'center', width: '20%' }} />
                                            <View style={{ flexDirection: 'column', marginTop: 2, width: '80%', marginTop: 35 }}>
                                                <Text style={{ flex: 15, fontSize: 25, fontWeight: 'bold', color: '#000' }}>{numero ? numero : 'No cuenta con numero de telefono'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </>
                            )}
                    </View>
                </View>
            </Animatable.View>
        </View>
    )
}