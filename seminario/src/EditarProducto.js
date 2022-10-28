import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity,Platform,ToastAndroid,Alert } from 'react-native';
import {
    ScrollView,
} from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Route from '../hooks/routes'
import Message from '../components/message'
import Modal from '../components/customModal'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#eee',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        margin: 10,
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

export default function EditarProducto({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [idSubcategoria, setIdSubcategoria] = useState(0)
    const [text, setText] = useState('')
    const producto = navigation.getParam('producto', '0')
    const [modalCategoria, setModalCategoria] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const [busqueda2, setBusqueda2] = useState('')
    const [categorias, setCategoriasr] = useState([])
    const [subcategorias, setSubcategorias] = useState([])
    const [filteredCategorias, setFilteredCategorias] = useState([])
    const [filteredSubategorias, setFilteredSubategorias] = useState([])
    const [modalSubCategoria, setModalSubCategoria] = useState(false)
    const [logining, setLogining] = useState(false)
    const [message, setMessage] = useState(false)
    const [nombreCategoria, setNombreCategoria] = useState('')
    const [nombreSubcategoria, setNombreSubcategoria] = useState('')


    const handleLogin = async () => {
        setLogining(true)
        if (nombre !== '' && descripcion !== '' && idSubcategoria !== 0) {
            const json = JSON.stringify({ nombre_producto: nombre, descripcion: descripcion, id_subcategoria: idSubcategoria, id_producto: producto.id_producto })
            await fetch(Route + 'guardarProductoEditado',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                .then((response) => response.json())
                .then((data) => {
                    setLogining(false)
                    if (Platform.OS === 'android') {
                        ToastAndroid.show('Producto Modificado', ToastAndroid.SHORT)
                        navigation.pop(5)
                    }
                    else {
                        Alert.alert('Producto modificado')
                        navigation.pop(5)
                    }

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
    useEffect(() => {
        setNombre(producto.nombre_producto)
        setDescripcion(producto.descripcion)
        getCategoria()
        setIdSubcategoria(producto.setIdSubcategoria)
        getsubcategorias(producto.id_categoria)
        setNombreCategoria(producto.nombre_categoria)
        setNombreSubcategoria(producto.nombre_subcategoria)
    }, [])

    const handleSelectItem = (item) => {
        getsubcategorias(item.id_categoria)
        setModalCategoria(false)
        setNombreCategoria(item.nombre_categoria)
        setNombreSubcategoria('Selecciona una!')
        setIdSubcategoria(0)

    }
    const handleSelectItem2 = (item) => {
        setIdSubcategoria(item.id_subcategoria)
        setNombreSubcategoria(item.nombre_subcategoria)
        setModalSubCategoria(false)
    }

    const getCategoria = async () => {
        try {
            const response = await fetch(Route + 'buscarCategoria',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await response.json()
            if (await data.length != 0) {
                setFilteredCategorias(data)
                setCategoriasr(data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const getsubcategorias = async (id_categoria) => {
        try {
            const json = JSON.stringify({ id_categoria: id_categoria })
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
                setFilteredSubategorias(data)
                setSubcategorias(data)
            } else {
                setFilteredSubategorias(data)
                setSubcategorias(data)
            }
        }
        catch (e) {
            console.log(e)
        }
    }
    const filtrarCategoria = (text) => {
        if (text) {
            const newData = categorias.filter((item) => {
                const itemData = item.nombre_categoria.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setBusqueda(text)
            setFilteredCategorias(newData)
        }
        else {
            setBusqueda(text)
            setFilteredCategorias(categorias)
        }
    }
    const filtrarSubategoria = (text) => {
        if (text) {
            const newData = subcategorias.filter((item) => {
                const itemData = item.nombre_subcategoria.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })
            setBusqueda2(text)
            setFilteredSubategorias(newData)
        }
        else {
            setBusqueda2(text)
            setFilteredSubategorias(subcategorias)
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, marginTop: 10 }}>
                    <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(5)}>
                        <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>Modifique Los datos</Text>
                </View>
            </View>

            <View style={styles.body}>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#000' }}>Editar Producto</Text>
                </View>
                <ScrollView>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 20 }}>Nombre del producto:</Text>
                        <View style={styles.action2}>
                            <TextInput placeholder="Nombre(*)" value={nombre} maxLength={50} style={{ marginBottom: 10, width: '100%' }} onChangeText={(text) => setNombre(text)} />
                        </View>
                        <TouchableOpacity onPress={() => setModalCategoria(true)}>
                            <View style={styles.action}>
                                <MaterialIcons name="touch-app" color="#000" size={30} style={{ marginBottom: 10, marginRight: 10 }} />
                                <Text style={{ marginBottom: 10, width: '90%' }}>Categoria: {nombreCategoria}</Text>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalSubCategoria(true)}>
                            <View style={styles.action}>
                                <MaterialIcons name="touch-app" color="#000" size={30} style={{ marginBottom: 10, marginRight: 10 }} />
                                <Text style={{ marginBottom: 10, width: '90%' }}>Subcategoria: {nombreSubcategoria}</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray', marginTop: 10 }}>Descripcion:</Text>
                        <View style={styles.action2}>
                            <TextInput maxLength={200} multiline={true} value={descripcion} placeholder="Descripcion(200)" style={{ marginBottom: 10, width: '100%' }} onChangeText={(pass2) => setDescripcion(pass2)} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.ingresarContainer}>
                    {
                        logining ? (
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Guardando</Text>
                        ) : (
                            <TouchableOpacity style={styles.btnIngresar} onPress={() => handleLogin()}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#fff' }}>Grabar producto</Text>
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





            <Modal visibility={modalCategoria}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>
                    Seleccionar Categoria
                </Text>
                <View style={styles.action}>
                    <MaterialIcons color="gray" name="search" size={20} style={{ flex: 1, marginRight: 10, alignSelf: 'center' }} />
                    <TextInput
                        placeholder="Buscar Categoria"
                        style={{ width: '100%', flex: 10 }}
                        onChangeText={(text) => filtrarCategoria(text)}
                        value={busqueda}
                        contextMenuHidden={true}
                        numberOfLines={1}
                        removeClippedSubviews={true}
                    />
                </View>
                <FlatList
                    data={filteredCategorias}
                    key={(x) => filteredCategorias.indexOf(x)}
                    keyExtractor={(x) => filteredCategorias.indexOf(x)}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectItem(item)}>
                            <Text style={{ flex: 15, fontSize: 14, fontWeight: 'bold', color: '#000' }}>{item.nombre_categoria}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={{ backgroundColor: 'red', width: '90%', height: 40, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => setModalCategoria(false)}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </Modal>



            <Modal visibility={modalSubCategoria}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>
                    Seleccionar Sub-Categoria
                </Text>
                <View style={styles.action}>
                    <MaterialIcons color="gray" name="search" size={20} style={{ flex: 1, marginRight: 10, alignSelf: 'center' }} />
                    <TextInput
                        placeholder="Buscar SubCategoria"
                        style={{ width: '100%', flex: 10 }}
                        onChangeText={(text) => filtrarSubategoria(text)}
                        value={busqueda2}
                        contextMenuHidden={true}
                        numberOfLines={1}
                        removeClippedSubviews={true}
                    />
                </View>
                <FlatList
                    data={filteredSubategorias}
                    key={(x) => filteredSubategorias.indexOf(x)}
                    keyExtractor={(x) => filteredSubategorias.indexOf(x)}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelectItem2(item)}>
                            <Text style={{ flex: 15, fontSize: 14, fontWeight: 'bold', color: '#000' }}>{item.nombre_subcategoria}</Text>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={{ backgroundColor: 'red', width: '90%', height: 40, borderRadius: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => setModalSubCategoria(false)}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </Modal>


        </View>
    );
}