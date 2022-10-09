import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, TouchableOpacity, FlatList, TextInput, Dimensions, } from 'react-native'

import * as Animatable from 'react-native-animatable'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import * as SQLite from 'expo-sqlite'

const windowHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        minHeight: Math.round(windowHeight)
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.3,
    },

    header: {
        flex: 0.5,
        width: '100%',
        height: '100%',
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

    body: {
        flex: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red',
    },

    card: {
        backgroundColor: '#fff',
        width: '100%',
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

    footer: {
        flex: 0.5,
        width: '100%',
        height: '100%',
        //backgroundColor: 'red'
    },
})

const bd = SQLite.openDatabase('localhost.db', '1.0')

export default function faenas({ navigation }) {
    const [faenas, setFaenas] = useState([])
    const [filterFaenas, setFilterFaenas] = useState([])

    const [busqueda, setBusqueda] = useState('')
    const [loading, setLoading] = useState(true)

    const filtrarFaena = (text) => {
        if (text) {
            const newData = faenas.filter((item) => {
                const itemData = item.nombre_faena + item.nombre_comuna
                const textData = text.toUpperCase();

                return itemData.indexOf(textData) > -1;
            })

            setFilterFaenas(newData)
            setBusqueda(text)
        }
        else {
            setFilterFaenas(faenas)
            setBusqueda(text)
        }
    }

    const goVehiculos = (item) => {
        console.log(item.id_faena)
        navigation.navigate('VehiculoFaena', {idFaena: item.id_faena, nombreFaena: item.nombre_faena})
    }

    const getFaenas = async () => {
        bd.transaction(tx => {
            tx.executeSql(
                "select f.id_faena, f.nombre_faena, c.nombre_comuna from faena f join comuna c on c.id_comuna = f.id_comuna where f.vigente = true order by nombre_faena asc;",
                [],
                (tx, res) => {
                    const array = res.rows._array
                    console.log(array)
                    const noDuplicate = array.filter((value, index, self) =>
                        index === self.findIndex((item) => (
                            item.id_faena === value.id_faena &&
                            item.nombre_faena === item.nombre_faena
                        ))
                    )

                    setFaenas(noDuplicate)
                    setFilterFaenas(noDuplicate)
                    setLoading(false)
                },
                (tx, e) => {
                    console.error(e)
                }
            )
        })
    }

    useEffect(() => {
        getFaenas()
    }, [])

    console.log(faenas, filterFaenas)

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />

            <View style={styles.header} />

            <Animatable.View animation={'fadeInUpBig'} style={styles.body}>
                <View style={styles.card}>
                    <View style={{ paddingLeft: 20, paddingRight: 20, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                            <TouchableOpacity name={'fadeInUpBig'} style={styles.botonAtras} onPress={() => navigation.pop(1)}>
                                <MaterialIcons name="arrow-back" color="#000" size={20} style={{ alignSelf: 'center'}} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#000',  }}>Faenas</Text>
                        </View>
                        <View style={styles.action}>
                            <MaterialIcons color="gray" name="search" size={20} style={{ flex: 1, marginRight: 10, alignSelf: 'center' }} />
                            <TextInput
                                placeholder="Buscar Faena"
                                style={{ width: '100%', flex: 10 }}
                                onChangeText={(text) => filtrarFaena(text)}
                                value={busqueda} />
                        </View>

                        {loading ? (
                            <ActivityIndicator size={'large'} color='#000' style={{ alignSelf: 'center', flex: 1 }} />
                        ) : (
                            <FlatList
                                data={filterFaenas}
                                key={(x) => filterFaenas.indexOf(x)}
                                keyExtractor={(x) => filterFaenas.indexOf(x)}
                                renderItem={({ item }) => (
                                    <TouchableOpacity name={'fadeInUpBig'} style={styles.itemContainer} onPress={() => goVehiculos(item)}>
                                        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 5, }}>
                                            <MaterialIcons name="fiber-manual-record" color="#5dd069" size={10} style={{ alignSelf: 'center', marginRight: 5 }} />
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000' }}>{item.nombre_faena}</Text>
                                        </View>
                                        <View style={{ width: 100, backgroundColor: '#000', borderRadius: 50, padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text numberOfLines={1} style={{ fontSize: 10, fontWeight: 'bold', color: '#fff', }}>{item.nombre_comuna}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                style={{ height: '85%' }}
                            />
                        )}
                    </View>
                </View>
            </Animatable.View>
        </View>
    )
}