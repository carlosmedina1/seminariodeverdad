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
    action2: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center' ,
        height: '100%',
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
})

export default function Reportar({ navigation }) {
    const [logeado, setLogeado] = useState(false)
    const [comentarioActual, setComentarioActual] = useState('')
    const [mensaje, setMensaje] = useState('')
    const producto = navigation.getParam('producto', '0')


    const guardarComentario = async () => {
        //GUARDA EL REPORTE DEL PRODUCTO EN LA DB
        const id_user = await AsyncStorage.getItem('id_user')
        try {
            const json = JSON.stringify({ id_producto: producto.id_producto, id_usuario: id_user, justificacion: comentarioActual })
            const response = await fetch(Route + 'guardarReporte',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                }
            )
            const data = await response.json()
            if (Platform.OS === 'android') {
                ToastAndroid.show('Producto Reportado', ToastAndroid.SHORT)
            }
            else {
                Alert.alert('Producto Reportado')
            }
            navigation.pop(7)

        }
        catch (e) {
            console.log(e)
        }
    }
    const verificar_reporte = async () => {
        //VERIFICA SI EL USUARIO PUEDE REPORTAR UN PRODUCTO, SOLO PUEDE LOS QUE NO SEAN DE EL
        const id_user = await AsyncStorage.getItem('id_user')
        if(id_user==producto.id_usuario){
            setLogeado(false)
            setMensaje('No puedes Reportar tu propio producto, si lo quieres borrar hazlo desde la opcion productos en el menu')
        }else{
            try {
                const json = JSON.stringify({ id_producto: producto.id_producto, id_usuario: id_user })
                const response = await fetch(Route + 'verificarReporte',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: json
                    }
                )
                const data = await response.json()
                if(data[0].tiene>0){
                    setLogeado(false)
                    setMensaje('Ya reportaste este producto, se te avisara sobre el resultado en tus notificaciones')
                }else{
                    setLogeado(true)
                }
    
            }
            catch (e) {
                console.log(e)
            }
        }
        
    }
    useEffect(() => {
        //INICIO DE LA CLASE
        setComentarioActual('')
        verificar_reporte()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            <Animatable.View animation={'fadeInUpBig'} style={styles.body}>
                <View style={styles.card}>
                    {
                        logeado ? (
                            <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'column', height: '100%' }}>
                                    <View style={{ flexDirection: 'row', width: '100%', height: '5%', marginBottom: 5, marginTop: 20 }}>
                                        <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                            <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>Reportar Producto</Text>
                                    </View>
                                    <View style={styles.action}>
                                        <TextInput
                                            placeholder="Justifica tu Reporte"
                                            style={{ width: '100%', height: 100 }}
                                            maxLength={200}
                                            multiline={true}
                                            onChangeText={(text) => setComentarioActual(text)}
                                            value={comentarioActual} />
                                    </View>
                                    <TouchableOpacity onPress={() => guardarComentario()} style={styles.botonComentario}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Guardar Reporte</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'column', height: '100%' }}>
                                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, marginTop: 20 }}>
                                        <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                            <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>Reportar Producto</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, marginTop: 20 }}>
                                        <View style={styles.action2}>
                                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>{mensaje}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }
                </View>
            </Animatable.View >
        </View >
    )
}