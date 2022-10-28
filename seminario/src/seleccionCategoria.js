import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, TextInput, StatusBar, FlatList, Image, TouchableOpacity, Dimensions, Alert, ToastAndroid, Platform } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import * as Animatable from 'react-native-animatable'

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
    contentContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    footer: {
        flex: 0.5,
        width: '100%',
        height: '100%',
        //backgroundColor: 'red'
    },
    imgPersonas: {
        width: 250,
        height: 200,
        borderRadius: 20,
        marginVertical: 7,
    },
})

export default function seleccionCategoria({ navigation }) {
    const propio = navigation.getParam('propio', 'false')

    const paraAtras = () => {
        if(propio){
            navigation.replace("Productos_propios")
        }else{
            navigation.replace("MercadoUCM")
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
            <Animatable.View animation={'fadeInUpBig'} style={styles.body}>
                <View style={styles.card}>
                    <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', marginTop: 50 }}>
                        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                            <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => paraAtras()}>
                                <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000', }}>Selecciona una categoria</Text>
                        </View>
                        <View style={{ backgroundColor: "white", height: '100%' }}>
                            <View style={{ height: 30, alignContent: "center" }}>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        marginLeft: 20,
                                        marginTop: 50,
                                        fontSize: 15,
                                    }}
                                >
                                    
                                </Text>
                            </View>
                            <ScrollView contentContainerStyle={styles.contentContainer} >
                                <View style={{ marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.replace("SeleccionSubcategoria", { cat: 1, propio:propio })}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={require('../images/icono_ropa.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 10, }}>
                                    <TouchableOpacity onPress={() => navigation.replace("SeleccionSubcategoria", { cat: 2, propio:propio })}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={require('../images/icono_celulares.png')}
                                        />

                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.replace("SeleccionSubcategoria", { cat: 3, propio:propio })}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={require('../images/icono_electronica.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.replace("SeleccionSubcategoria", { cat: 4, propio:propio })}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={require('../images/icono_juegos.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.replace("SeleccionSubcategoria", { cat: 5, propio:propio })}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={require('../images/icono_libros.png')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    <TouchableOpacity onPress={() => navigation.replace("SeleccionSubcategoria", { cat: 6, propio:propio })}>
                                        <Image
                                            style={styles.imgPersonas}
                                            source={require('../images/icono_otros.png')}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        </View>
    )
}