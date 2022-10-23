import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, TouchableOpacity, Image, Dimensions, ScrollView, Alert } from 'react-native'
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

export default function detalleProducto({ navigation }) {
    const producto = navigation.getParam('producto', '0')
    const [text, setText] = useState('')
    const [message, setMessage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [likeado, setLikeado] = useState(false)
    const [likes, setLikes] = useState(0)

    const verificar_likes = async () => {
        try {
            setLoading(true)
            const id_user = await AsyncStorage.getItem('id_user')
            if(id_user==null){
                setLikeado(false)
                setLoading(false)
                setMessage(true)
                setText('¡Tienes que iniciar Sesion para dar likes a los Productos!')
            }else{
                
                const json = JSON.stringify({ id_usuario : id_user ,id_producto: producto.id_producto })
                await fetch(Route + 'verificar_likes',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data[0].verificar_likes == 3) {
                        setLikeado(true)
                        setLoading(false)
                    }
                    else if (data[0].verificar_likes == 2) {
                        setLikeado(false)
                        setLoading(false)
                    }
                    else if (data[0].verificar_likes == 1) {
                        setLikeado(true)
                        setLoading(false)
                    }
                    obtenerLikes()
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setLikeado(false)
                })
            }
            
        }
        catch (e) {
            console.log(e)
                setLoading(false)
                setLikeado(false)
        }
    }
    const like_al_entrar = async () => {
        try {
            setLoading(true)
            const id_user = await AsyncStorage.getItem('id_user')
            if(id_user==null){
                setLikeado(false)
                setLoading(false)
            }else{
                const json = JSON.stringify({ id_usuario : id_user ,id_producto: producto.id_producto })
                await fetch(Route + 'like_al_entrar',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data[0].tiene >0) {
                        setLikeado(true)
                        setLoading(false)
                    } else {
                        setLikeado(false)
                        setLoading(false)
                    } 
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setLikeado(false)
                })
            }
            
        }
        catch (e) {
            console.log(e)
                setLoading(false)
                setLikeado(false)
        }
    }
    const obtenerLikes = async () => {
        try {
            const json = JSON.stringify({id_producto: producto.id_producto })
            await fetch(Route + 'likesProducto',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            .then((response) => response.json())
            .then((data) => {
                setLikes(data[0].likes)
            })
            .catch((error) => {
                console.log(error)
                setLikes(0)
            })
        }
        catch (e) {
            console.log(e)
            setLikes(0)
        }
    }

    const reportarProducto = async () =>{
        const id_user = await AsyncStorage.getItem('id_user')
            if(id_user==null){
                setMessage(true)
                setText('¡Tienes que iniciar Sesion para reportar un Producto!')
            }else{
                navigation.navigate("Reportar", { producto: producto })
            }
    }
    const contactosUsuario = async () =>{
        navigation.navigate("Contactos", { id_usuario: producto.id_usuario })
    }
    const comentarProducto = async () =>{
        navigation.navigate("Comentarios", {  producto: producto  })
    }
    useEffect(() => {
        obtenerLikes()
        like_al_entrar()
    }, [])

    return (
        <View animation={'fadeInUpBig'} style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            {!loading ? (
                <ScrollView style={styles.body}>
                    <View style={styles.card}>
                        <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                                <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(2)}>
                                    <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>{producto.nombre_producto}</Text>
                            </View>

                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10, }}>Información General:</Text>
                            <View style={styles.itemContainer}>
                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'column', width: '90%', marginTop: 10 }}>
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Likes: </Text>
                                            <Text style={{ fontSize: 14, }}>{likes}</Text>
                                        </View>

                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>Usuario: </Text>
                                            <Text style={{ fontSize: 14, }}>{producto.nombre_usuario}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: '10%', marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => verificar_likes()}>
                                            {likeado ? (
                                                <MaterialIcons name="thumb-up" color="#1f44ff" size={50} style={{ flex: 1, alignSelf: 'center' }} />
                                            ) : (
                                                <MaterialIcons name="thumb-up" color="#9ca19c" size={50} style={{ flex: 1, alignSelf: 'center' }} />
                                            )}
                                            
                                        </TouchableOpacity>
                                    </View>
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
                                <TouchableOpacity onPress={() => contactosUsuario()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='accessibility' color='green' size={30} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Contactos y Redes</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={30} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => comentarProducto()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='chat-bubble' color='blue' size={30} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Comentarios</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={30} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => reportarProducto()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, marginTop: 10 }}>
                                        <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                            <MaterialIcons name='warning' color='red' size={30} />
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 10 }}>Reportar</Text>
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <MaterialIcons name='keyboard-arrow-right' color='lightgray' size={30} />
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

                <Message visibility={message}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{text}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setMessage(false)} style={{ backgroundColor: '#000', borderRadius: 10, width: 150, height: 40, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Aceptar</Text>
                    </TouchableOpacity>
                </Message>
        </View>
    )
}
