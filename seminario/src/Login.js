import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Route from '../hooks/routes'
import Message from '../components/message'

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    header: {
        flex: 4,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.3,
    },

    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 35,
    },

    body: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flex: 6,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: -20,
        padding: 20,
    },

    formContainer: {
        marginTop: 10,
    },

    action: {
        marginTop: 50,
        marginBottom: 10,
        flexDirection: 'row',
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },

    ingresarContainer: {
        marginTop: 50,
    },

    btnIngresar: {
        backgroundColor: '#000',
        width: 250,
        height: 50,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default function Login({ navigation }) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('1010')
    const [text, setText] = useState('')

    const [logining, setLogining] = useState(false)
    const [message, setMessage] = useState(false)
    const [verificando, setVerificando] = useState(false)

    const handleLogin = async () => {
        //SE CONSULTA LA INFORMACIÓN ENVIADA EN LA BASE DE DATOS
        setLogining(true)
        if (user !== '' && pass !== '') {
            const json = JSON.stringify({ user: user, pass: pass })
            await fetch(Route + 'login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data[0].login == 3) {
                        setText('Nombre de usuario incorrecto')
                        setMessage(true)
                        setLogining(false)
                    }
                    else if (data[0].login == 2) {
                        setText('Contraseña incorrecta')
                        setMessage(true)
                        setLogining(false)
                    }
                    else if (data[0].login == 1) {
                        obtenerid(user)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setLogining(false)
                })
        }
        else {
            setLogining(false)
            setText('Debe ingresar todos los datos solicitados')
            setMessage(true)
        }
    }
    const obtenerid = async (user) => {
        //OBTIENE EL ID  CUANDO SE ACCEDE CON EXITO
        const json = JSON.stringify({ nu: user })
        const response = await fetch(Route + 'obtener-usuario',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }
        )
        const data = await response.json()
        await AsyncStorage.setItem('id_user', JSON.stringify(await data[0].id_usuario))
        
        _storeSession(JSON.stringify(await data[0].nombre_usuario),JSON.stringify(await data[0].es_admin))

    }
    const _storeSession = async (nombrex,es_admin) => {
        //GUARDA LOS DATOS  EN LA SESION
        try {
            await AsyncStorage.setItem('isLoged', 'true')
            await AsyncStorage.setItem('user', nombrex)
            await AsyncStorage.setItem('es_admin', es_admin)
            navigation.replace('MercadoUCM')
            setLogining(false)
        }
        catch (e) {
            console.error('Error al guardar los datos para el inicio de sesión: ')
            console.error(e)
            Alert.alert(
                'Error al Iniciar Sesión',
                'Hemos tenido un inconveniente al guardar los datos para el inicio de Sesión',
                [{ text: 'Entendido', }]
            )
            setLogining(false)
        }
    }
    
    if (verificando) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Mercado UCM</Text>
            </View>
        )
    }

    else {
        return (
            <View style={styles.container}>
                <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                        <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.replace('MercadoUCM')}>
                            <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000'}}>Login</Text>
                    </View>
                </View>
                
                <View style={styles.header}>
                    <Image source={require('./image/loginBackground2.jpeg')} style={styles.image} />
                    <Text style={styles.title}>Mercado UCM</Text>
                </View>

                <View style={styles.body}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#000' }}>Iniciar Sesión</Text>
                    </View>

                    <View style={styles.action}>
                        <FeatherIcon color="gray" name="user" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                        <TextInput placeholder="Correo electronico" style={{ marginBottom: 10, width: '100%' }} onChangeText={(text) => setUser(text)} ></TextInput>
                    </View>

                    <View style={styles.action}>
                        <FeatherIcon color="gray" name="unlock" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                        <TextInput secureTextEntry={true} placeholder="Contraseña" style={{ marginBottom: 10, width: '100%' }} onChangeText={(pass) => setPass(pass)} ></TextInput>
                    </View>

                    <View style={styles.ingresarContainer}>
                        {
                            logining ? (
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Ingresando...</Text>
                            ) : (
                                <TouchableOpacity style={styles.btnIngresar} onPress={() => handleLogin()}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Ingresar</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
                <Message visibility={message}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{text}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setMessage(false)} style={{ backgroundColor: '#000', borderRadius: 10, width: 150, height: 40, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Aceptar</Text>
                    </TouchableOpacity>
                </Message>
            </View>
        );
    }
}