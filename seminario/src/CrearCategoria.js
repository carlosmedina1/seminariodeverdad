import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Platform, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import {
    ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Route from '../hooks/routes'
import Message from '../components/message'
import Route2 from '../hooks/rutaImagen'
import * as ImagePicker from 'expo-image-picker';

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

    imgPersonas: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginVertical: 7,
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
    action2: {
        marginTop: 20,
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

export default function CrearCategoria({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [text, setText] = useState('')
    const [logining, setLogining] = useState(false)
    const [message, setMessage] = useState(false)
    const [image1, setImage1] = useState(Route2 + 'photos/imagen_defecto.jpg')
    const [img1fija, setImg1fija] = useState(false)
    const [imageName1, setImageName1] = useState('_cat.jpg')
    const handleLogin = async () => {
        //GUARDA LA CATEGORIA
        setLogining(true)
        if (nombre !== '' && img1fija==true) {
            const json = JSON.stringify({ nombre_categoria: nombre })
            await fetch(Route + 'guardarNuevaCategoria',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    subirImagenes(data[0].id_categoria)
                })
                .catch((error) => {
                    console.error(error)
                    setLogining(false)
                })
        } else {
            setLogining(false)
            setText('El  nombre y la imagen son obligatorio')
            setMessage(true)
        }
    }
    const subirImagenes = async (id_categoria) => {
        //SUBE LA IMAGEN DE LA CATEGORIA
        var i1 = id_categoria + imageName1;
        try {
            let type = 'image/jpg';
            let formData = new FormData();
            if (img1fija == true) {
                formData.append('photo', { uri: image1, name: i1, type });
                await fetch(Route2 + '/upload.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                });
            } else {
                i1 = 'sin_imagen.jpg'
            }
        } catch (error) {
            console.error('1')
            console.error(error)
        }

        try {
            const json = JSON.stringify({ url_1: i1, id_categoria: id_categoria })
            await fetch(Route + 'guardarImagenCategoria',
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
                        ToastAndroid.show('Categoria Creada', ToastAndroid.SHORT)
                        navigation.pop(3)
                    }
                    else {
                        Alert.alert('Categoria Creada')
                        navigation.pop(3)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setLogining(false)
                })
        } catch (error) {
            console.error('2')
            console.error(error)
        }

    }
    async function takePhotoAndUpload(numero) {
        //OBTIENE LA FOTO Y LA GUARDA PARA ENVIARLA
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (result.cancelled) {
            return;
        }
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        //let filenamex = localUri.split('.').pop();
        //let match = /\.(\w+)$/.exec(filename);


        if (numero == 1) {
            setImage1(localUri)
            setImg1fija(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, marginTop: 10 }}>
                    <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                        <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>Ingrese los datos</Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#000' }}>Nueva Categoria</Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 20 }}>Nombre de la Categoria:</Text>
                        <View style={styles.action2}>
                            <TextInput placeholder="Nombre(*)" maxLength={50} style={{ marginBottom: 10, width: '100%' }} onChangeText={(text) => setNombre(text)} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, }}>
                        <TouchableOpacity onPress={() => takePhotoAndUpload(1)}>
                            <View style={{ marginLeft: 10 }}>
                                <Image
                                    style={styles.imgPersonas}
                                    source={{ uri: image1 }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <View style={styles.ingresarContainer}>
                    {
                        logining ? (
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Guardando</Text>
                        ) : (
                            <TouchableOpacity style={styles.btnIngresar} onPress={() => handleLogin()}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Grabar Categoria</Text>
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