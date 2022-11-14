import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Platform, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import {
    ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Route from '../hooks/routes'
import Route2 from '../hooks/rutaImagen'
import Message from '../components/message'
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
    itemContainer2: {
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
    imgPersonas: {
        width: 200,
        height: 200,
        borderRadius: 20,
        marginVertical: 7,
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
        width: 300,
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

export default function CrearProducto({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [text, setText] = useState('')
    const datos = navigation.getParam('subcategoria', '0')
    const propio = navigation.getParam('propio', 'false')
    const [logining, setLogining] = useState(false)
    const [message, setMessage] = useState(false)
    const [image1, setImage1] = useState(Route2 + 'photos/imagen_defecto.jpg')
    const [image2, setImage2] = useState(Route2 + 'photos/imagen_defecto.jpg')
    const [image3, setImage3] = useState(Route2 + 'photos/imagen_defecto.jpg')
    const [image4, setImage4] = useState(Route2 + 'photos/imagen_defecto.jpg')
    const [img1fija, setImg1fija] = useState(false)
    const [img2fija, setImg2fija] = useState(false)
    const [img3fija, setImg3fija] = useState(false)
    const [img4fija, setImg4fija] = useState(false)
    const [imageName1, setImageName1] = useState('_1.jpg')
    const [imageName2, setImageName2] = useState('_2.jpg')
    const [imageName3, setImageName3] = useState('_3.jpg')
    const [imageName4, setImageName4] = useState('_4.jpg')
    const handleLogin = async () => {
        setLogining(true)

        if (nombre !== '' && descripcion !== '') {
            const id_user = await AsyncStorage.getItem('id_user')
            const json = JSON.stringify({ nombre_producto: nombre, descripcion: descripcion, id_subcategoria: datos.id_subcategoria, id_usuario: id_user })
            await fetch(Route + 'guardarNuevoProducto',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    subirImagenes(data[0].id_producto)
                })
                .catch((error) => {
                    console.error(error)
                    setLogining(false)
                })
        } else {
            setLogining(false)
            setText('El nombre y descripcion del producto es obligatorio')
            setMessage(true)
        }
    }

    const subirImagenes = async (id_producto) => {
        var i1 = id_producto + imageName1;
        var i2 = id_producto + imageName2;
        var i3 = id_producto + imageName3;
        var i4 = id_producto + imageName4;
        try {
            let type = 'image/jpg';
            let formData = new FormData();
            if (img1fija == true) {
                formData.append('photo', { uri: image1, name: i1, type });
                await fetch( Route2 + '/upload.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                });
            } else {
                i1 = 'sin_imagen.jpg'
            }
            if (img2fija == true) {
                formData.append('photo', { uri: image2, name: i2, type });
                await fetch( Route2 + '/upload.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                });
            } else {
                i2 = 'sin_imagen.jpg'
            }
            if (img3fija == true) {
                formData.append('photo', { uri: image3, name: i3, type });
                await fetch( Route2 + '/upload.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                });
            } else {
                i3 = 'sin_imagen.jpg'
            }
            if (img4fija == true) {
                formData.append('photo', { uri: image4, name: i4, type });
                await fetch( Route2 + '/upload.php', {
                    method: 'POST',
                    body: formData,
                    header: {
                        'content-type': 'multipart/form-data',
                    },
                });
            } else {
                i4 = 'sin_imagen.jpg'
            }
        } catch (error) {
            console.error('1')
            console.error(error)
        }

        try {
            const json = JSON.stringify({ url_1: i1, url_2: i2, url_3: i3, url_4: i4, id_producto: id_producto })
            await fetch(Route + 'guardarImagenProducto',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    if (propio) {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show('Producto Creado', ToastAndroid.SHORT)
                        }
                        else {
                            Alert.alert('Producto Creado')
                        }
                        navigation.pop(7)
                    } else {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show('Producto Creado', ToastAndroid.SHORT)
                        }
                        else {
                            Alert.alert('Producto Creado')
                        }
                        navigation.pop(7)
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

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false, // higher res on iOS
            aspect: [4, 3],
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
        } else if (numero == 2) {
            setImage2(localUri)
            setImg2fija(true)
        } else if (numero == 3) {
            setImage3(localUri)
            setImg3fija(true)
        } else if (numero == 4) {
            setImage4(localUri)
            setImg4fija(true)
        }
        /*
        return await fetch('http://192.168.32.133/upload.php', {
            method: 'POST',
            body: formData,
            header: {
                'content-type': 'multipart/form-data',
            },
        });
        */
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
                    <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#000' }}>Nuevo Producto o servicio</Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 20 }}>Nombre del producto o servicio:</Text>
                        <View style={styles.action2}>
                            <TextInput placeholder="Nombre(*)" maxLength={50} style={{ marginBottom: 10, width: '100%' }} onChangeText={(text) => setNombre(text)} />
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="unlock" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <Text style={{ marginBottom: 10, width: '100%' }}>Categoria: {datos.nombre_categoria}</Text>
                        </View>
                        <View style={styles.action}>
                            <FeatherIcon color="gray" name="unlock" size={20} style={{ marginBottom: 10, marginRight: 10 }} />
                            <Text style={{ marginBottom: 10, width: '100%' }}>Subcategoria: {datos.nombre_subcategoria}</Text>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10 }}>Descripcion:</Text>
                        <View style={styles.action2}>
                            <TextInput maxLength={200} multiline={true} placeholder="Descripcion(200)" style={{ marginBottom: 10, width: '100%' }} onChangeText={(pass2) => setDescripcion(pass2)} />
                        </View>
                    </View>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 20, marginLeft: 10 }}>Imágenes (Max 4):</Text>
                    <View style={styles.itemContainer2}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, }}>
                            <ScrollView horizontal={true} flexDirection="row">
                                <TouchableOpacity onPress={() => takePhotoAndUpload(1)}>
                                    <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: image1 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => takePhotoAndUpload(2)}>
                                    <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: image2 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => takePhotoAndUpload(3)}>
                                    <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: image3 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => takePhotoAndUpload(4)}>
                                    <View style={{ marginLeft: 10 }}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={{ uri: image4 }}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.ingresarContainer}>
                    {
                        logining ? (
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Guardando</Text>
                        ) : (
                            <TouchableOpacity style={styles.btnIngresar} onPress={() => handleLogin()}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Grabar producto o servicio</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View >
            <Message visibility={message}>
                <View>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{text}</Text>
                </View>

                <TouchableOpacity onPress={() => setMessage(false)} style={{ backgroundColor: '#000', borderRadius: 10, width: 150, height: 40, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Aceptar</Text>
                </TouchableOpacity>
            </Message>
        </View >
    );
}