import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import {
    ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Route from '../hooks/routes'
import Message from '../components/message'
import {
    MaterialCommunityIcons,
} from "@expo/vector-icons";
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
        flex: 2,
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

export default function Registro({ navigation }) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [correo, setCorreo] = useState('')
    const [numero, setNumero] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [text, setText] = useState('')

    const [logining, setLogining] = useState(false)
    const [message, setMessage] = useState(false)

    const handleLogin = async () => {
        //COMPUREBA LOS DATOS PARA REGISTRARSE EN LA APP
        setLogining(true)
        console.log(validateEmail(correo))
        if (user !== '' && pass !== '' && pass2 !== '' && correo !== '') {
            if (pass == pass2) {
                if (validateEmail(correo)) {
                    if (numero == '' && facebook == '' && instagram == '' && whatsapp == '') {
                        setLogining(false)
                        setText('Debe tener al menos 1 forma de contacto')
                        setMessage(true)
                    }else{
                        const json = JSON.stringify({ user: user, pass: pass, correo: correo, numero: numero, facebook: facebook, instagram: instagram, whatsapp: whatsapp })
                        await fetch(Route + 'registro',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: json
                            })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data[0].registro == 0) {
                                    setText('El correo ya esta ingresado')
                                    setMessage(true)
                                    setLogining(false)
                                } else {
                                    obtenerid(correo)
                                }
                            })
                            .catch((error) => {
                                console.error(error)
                                setLogining(false)
                            })
                    }
                } else {
                    setLogining(false)
                    setText('Correo invalido')
                    setMessage(true)
                }

            } else {
                setLogining(false)
                setText('Las contraseñas no coinciden')
                setMessage(true)
            }
        } else {
            setLogining(false)
            setText('Debe ingresar todos los datos obligatorios(*)')
            setMessage(true)
        }
    }
    function validateEmail(email) {
        //VALIDADOR DE EMAIL
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const obtenerid = async (user) => {
        //OBTIENE EL IDE DEL USUARIO RECIEN CREADO
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

        _storeSession(JSON.stringify(await data[0].nombre_usuario), JSON.stringify(await data[0].es_admin))

    }
    const _storeSession = async (nombrex, es_admin) => {
        //GUARDA LA SESION DEL USUARIO RECIEN CREADO
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


    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                    <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.replace('MercadoUCM')}>
                        <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>Registro</Text>
                </View>
            </View>

            <View style={styles.header}>
                <Image source={require('./image/loginBackground2.jpeg')} style={styles.image} />
                <Text style={styles.title}>Mercado UCM</Text>
            </View>

            <View style={styles.body}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#000' }}>Registro</Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="user" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput placeholder="Nombre(*)" maxLength={25} style={{ marginBottom: 10, width: '100%' }} onChangeText={(text) => setUser(text)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="unlock" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput secureTextEntry={true} maxLength={20} placeholder="Contraseña(*)" style={{ marginBottom: 10, width: '100%' }} onChangeText={(pass) => setPass(pass)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="unlock" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput secureTextEntry={true} maxLength={20} placeholder="Contraseña Nuevamente(*)" style={{ marginBottom: 10, width: '100%' }} onChangeText={(pass2) => setPass2(pass2)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="mail" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput placeholder="Correo electronico(*)" maxLength={50} style={{ marginBottom: 10, width: '100%' }} onChangeText={(correo) => setCorreo(correo)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="smartphone" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput placeholder="Numero Telefono" maxLength={30} style={{ marginBottom: 10, width: '100%' }} onChangeText={(numero) => setNumero(numero)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="facebook" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput placeholder="Facebook" maxLength={40} style={{ marginBottom: 10, width: '100%' }} onChangeText={(facebook) => setFacebook(facebook)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="instagram" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput placeholder="Instagram" maxLength={40} style={{ marginBottom: 10, width: '100%' }} onChangeText={(instagram) => setInstagram(instagram)} />
                        </View>
                        <View style={styles.action}>
                            <MaterialCommunityIcons color="gray" name="whatsapp" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <TextInput placeholder="Whatsapp" maxLength={40} style={{ marginBottom: 10, width: '100%' }} onChangeText={(whatsapp) => setWhatsapp(whatsapp)} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.ingresarContainer}>
                    {
                        logining ? (
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Ingresando...</Text>
                        ) : (
                            <TouchableOpacity style={styles.btnIngresar} onPress={() => handleLogin()}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Registrarse</Text>
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