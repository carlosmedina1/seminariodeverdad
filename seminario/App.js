import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Touchable, Alert } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Animatable from 'react-native-animatable'
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createTabNavigator,
} from "react-navigation-tabs";
import {
  Ionicons,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Login from './src/Login'
import Registro from './src/Registro'
import Buscar from './src/Buscar'
import Categoria from './src/Categoria'
import Comentarios from './src/Comentarios'
import Reportar from './src/Reportar'
import Contactos from './src/Contactos'
import Productos_propios from './src/Productos_propios'
import Productos_subcategorias from './src/Productos_subcategorias'
import DetalleProducto from './src/detalleProducto'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  boton: {
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    width: 100,
    height: 60,
    alignItems: "center",
    alignContent: "center",
  },
  txtBtn: {
    color: "blue",
    fontWeight: "bold",
    padding: 20,
  },
  txtInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    width: 400,
    height: 45,
    justifyContent: "center",
    marginTop: 15,
    marginLeft: 7,
    borderColor: "lightgray",
  },
  itemContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: "center",
    borderRadius: 10,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
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
  miniImg: {
    height: 50,
    width: 50,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  icon: {
    marginTop: 20,
    marginLeft: 20,
  },
  imgHistorias: {
    width: 100,
    height: 200,
    borderRadius: 20,
    marginVertical: 15,
  },
  imgPersonas: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 7,
  },
  imgProfiles: {},
  txtProfiles: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20,
    marginTop: 15,
  },
  vProfiles: {
    flexDirection: "row",
    marginTop: 5,
    marginHorizontal: 20,
  },
  menuCards: {
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 5,
    width: "95%",
    height: 80,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  btnCards: {
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
  },
  btnMenu: {
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
});

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: "lightgray", flex: 1 }}>
        <View style={{ backgroundColor: "white", height: 100 }}>
          <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("Buscar")}>
            <View>
              <Text style={{ marginLeft: 10 }}>
                ¿Qué estás buscando?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white", height: 250 }}>
          <View style={{ height: 30, alignContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 10,
                fontSize: 15,
              }}
            >
              CATEGORIAS
            </Text>
          </View>
          <ScrollView horizontal={true} flexDirection="row">
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("Categoria", { cat: 1 })}>
                <Image
                  style={styles.imgPersonas}
                  source={require('./images/icono_ropa.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("Categoria", { cat: 2 })}>
                <Image
                  style={styles.imgPersonas}
                  source={require('./images/icono_celulares.png')}
                />

              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("Categoria", { cat: 3 })}>
                <Image
                  style={styles.imgPersonas}
                  source={require('./images/icono_electronica.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("Categoria", { cat: 4 })}>
                <Image
                  style={styles.imgPersonas}
                  source={require('./images/icono_juegos.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("Categoria", { cat: 5 })}>
                <Image
                  style={styles.imgPersonas}
                  source={require('./images/icono_libros.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity onPress={() => navigation.replace("Categoria", { cat: 6 })}>
                <Image
                  style={styles.imgPersonas}
                  source={require('./images/icono_otros.png')}
                />
              </TouchableOpacity>
            </View>

          </ScrollView>

        </View>
        <View style={{ backgroundColor: "white", height: 300 }}>
          <View style={{ height: 30, alignContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 10,
                fontSize: 15,
              }}
            >
              Productos con mas likes
            </Text>
          </View>
          <ScrollView horizontal={true} flexDirection="row">
            <View style={{ marginLeft: 10 }}>
              <Image
                style={styles.imgPersonas}
                source={{ uri: "http://placekitten.com/200/200" }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Image
                style={styles.imgPersonas}
                source={{ uri: "http://placekitten.com/200/200" }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Image
                style={styles.imgPersonas}
                source={{ uri: "http://placekitten.com/200/200" }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Image
                style={styles.imgPersonas}
                source={{ uri: "http://placekitten.com/200/200" }}
              />
            </View>
            <View style={{ marginHorizontal: 10, borderRadius: 20 }}>
              <Image
                style={styles.imgPersonas}
                source={{ uri: "http://placekitten.com/200/200" }}
              />
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const AmigosScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <View style={{ height: 40, alignContent: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              marginTop: 10,
              marginLeft: 10,
              alignItems: "center",
            }}
          >
            usuarios
          </Text>
        </View>

        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flexDirection: "row" }}
          >
            <Image
              style={{ height: 100, width: 100, borderRadius: 100 }}
              source={{ uri: "http://placekitten.com/100/200" }}
            />
            <View>
              <Text style={styles.txtProfiles}>Nombre de persona</Text>
              <View style={styles.vProfiles}>
                <View style={{}}>
                  <Button style={{}} color="blue" title="Perfil"></Button>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Button
                    style={{ marginLeft: 10 }}
                    color="gray"
                    title="Eliminar"
                  ></Button>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const MenuScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [esAdmin, setEsAdmin] = useState(false)
  const [logueado, setLogueado] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    setLoading(true)
    _loadSession()
  }, [])

  const irInicioSesion = async () => {
    navigation.replace("Login")
  }

  const irRegistro = async () => {
    navigation.replace("Registro")
  }
  const _loadSession = async () => {
    try {
      const session = await AsyncStorage.getItem('isLoged')
      if (session) {
        setLogueado(true)
        const nombre = await AsyncStorage.getItem('user')
        const admin = await AsyncStorage.getItem('es_admin')
        if (admin == 'true') {
          setEsAdmin(true)
        } else {
          setEsAdmin(false)
        }
        setUser(nombre)

      } else {
        setLogueado(false)
      }
      setLoading(false)
    } catch (e) {
      setVerificando(false)
      console.error('Error al traer los datos para el inicio de sesión: ')
      console.error(e)

      Alert.alert(
        'Error al Iniciar Sesión',
        'Hemos tenido un inconveniente recuperar los datos para el inicio de Sesión',
        [{ text: 'Entendido', }]
      )
    }
  }

  const cerrarSesion = async () => {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('isLoged')
    await AsyncStorage.removeItem('id_user')
    await AsyncStorage.removeItem('es_admin')
    setLogueado(false)
  }
  return (

    <ScrollView>
      {!loading ? (
        logueado ? (
          <View style={{ backgroundColor: "rgba(239, 244, 245, 1)", flex: 1 }}>

            <View style={{ flexDirection: "row", backgroundColor: "rgba(239, 244, 245, 1)", height: 50, }}>
              <View style={{ width: "100%", justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 20 }}>
                  Menú
                </Text>
              </View>
            </View>



            <TouchableOpacity>
              <View
                style={{ marginTop: 5, flexDirection: "row", alignItems: "center" }}
              >
                <View>
                  <Image
                    style={styles.miniImg}
                    source={require("./images/1.jpg")}
                  />
                </View>
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ fontWeight: "bold" }}>{user}</Text>
                  <Text style={{ color: "gray" }}>Ver tu perfil</Text>
                </View>
              </View>
            </TouchableOpacity>




            <View>
              <View style={{ flexDirection: "row", marginHorizontal: 10 }}>



                <View style={{ width: "50%", flexDirection: "column", marginTop: 10 }}>
                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => navigation.replace("Productos_propios")}>
                      <View style={styles.btnCards}>
                        <MaterialCommunityIcons
                          name={"dropbox"}
                          size={23}
                          color={"lightblue"}
                        />
                        <Text>Mis productos</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuCards}>
                    <TouchableOpacity>
                      <View style={styles.btnCards}>
                        <MaterialIcons
                          name={"report"}
                          size={28}
                          color={"red"}
                        />
                        <Text>Mis reportes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {esAdmin ?
                    (
                      <View style={styles.menuCards}>
                        <TouchableOpacity>
                          <View style={styles.btnCards}>
                            <MaterialIcons
                              name={"report"}
                              size={28}
                              color={"red"}
                            />
                            <Text>Revisar Reportes</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}


                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => navigation.navigate("Amigos")}>
                      <View style={styles.btnCards}>
                        <MaterialCommunityIcons
                          name={"plus-circle-outline"}
                          size={28}
                          color={"green"}
                        />
                        <Text>Crear Producto</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>



                <View style={{ width: "50%", flexDirection: "column", marginTop: 10 }}>
                  <View style={styles.menuCards}>
                    <TouchableOpacity>
                      <View style={styles.btnCards}>
                        <Ionicons name={"notifications"} color={"red"} size={20} />
                        <Text>Notificaciones</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuCards}>
                    <TouchableOpacity>
                      <View style={styles.btnCards}>
                        <Entypo name={"thumbs-up"} size={28} color={"blue"} />
                        <Text>Mis Likes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>



                  {esAdmin ?
                    (
                      <View style={styles.menuCards}>
                        <TouchableOpacity onPress={() => navigation.navigate("Amigos")}>
                          <View style={styles.btnCards}>
                            <MaterialCommunityIcons
                              name={"dropbox"}
                              size={23}
                              color={"red"}
                            />
                            <Text>Productos eliminados</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    ) : null}


                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => cerrarSesion()}>
                      <View style={styles.btnCards}>
                        <Entypo name={"log-out"} size={28} color={"purple"} />
                        <Text>Cerrar Sesion</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>




              </View>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.itemContainer2}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5, }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginLeft: 5, }}>Para poder acceder a estas opciones, inicie sesion o cree una cuenta nueva con su correo institucional</Text>
              </View>
            </View>
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={{ marginTop: 150, margin: 20, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', width: 200, height: 50, borderRadius: 10, }}
                onPress={() => irInicioSesion()}>
                <MaterialIcons name="login" color='#fff' size={20} />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginTop: 20, width: 200, height: 50, borderRadius: 10, }}
                onPress={() => irRegistro()}>
                <MaterialIcons name="badge" color='#fff' size={20} />
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginLeft: 10 }}>Registrarse</Text>
              </TouchableOpacity>
            </Animatable.View>
          </>

        )
      ) : (
        <Animatable.View animation={'fadeInUpBig'} style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Comprobando...</Text>
          <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
            <MaterialCommunityIcons name='reload' size={40} color='#000' />
          </Animatable.View>
        </Animatable.View>
      )}

    </ScrollView>
  );
};

//PANTALLA PRINCIPAL
const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Amigos: {
      screen: AmigosScreen,
    },
    Menu: {
      screen: MenuScreen,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `home`;
          return (
            <Ionicons
              focused={focused}
              name={iconName}
              size={20}
              color={tintColor}
            ></Ionicons>
          );
        } else if (routeName === "Amigos") {
          iconName = `persons`;

          return (
            <Fontisto
              focused={focused}
              name={iconName}
              size={20}
              color={tintColor}
            ></Fontisto>
          );
        } else {
          iconName = `menu`;
          return (
            <Ionicons
              focused={focused}
              name={iconName}
              size={25}
              color={tintColor}
            ></Ionicons>
          );
        }
      },
      tabBarOptions: {
        activeTintColor: "blue",
        inactiveTintColor: "lightgray",
        showLabel: false,
        showIcon: true,
        borderRadius: 1,
        borderColor: "black",

        style: {
          backgroundColor: "white",
        },
        indicatorStyle: {
          backgroundColor: "blue",
        },
      },
    }),
  }
);
//CONTROL PANTALLAS
const RootStack = createStackNavigator(
  {
    MercadoUCM: AppNavigator,
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Ingresar',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Registro: {
      screen: Registro,
      navigationOptions: {
        title: 'Registro',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Buscar: {
      screen: Buscar,
      navigationOptions: {
        title: 'Ingresar',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Productos_propios: {
      screen: Productos_propios,
      navigationOptions: {
        title: 'Productos_propios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    DetalleProducto: {
      screen: DetalleProducto,

      navigationOptions: {
        title: 'DetalleProducto',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    
    Productos_subcategorias: {
      screen: Productos_subcategorias,

      navigationOptions: {
        title: 'Productos_subcategorias',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Categoria: {
      screen: Categoria,

      navigationOptions: {
        title: 'Categoria',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Reportar: {
      screen: Reportar,

      navigationOptions: {
        title: 'Reportar',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Comentarios: {
      screen: Comentarios,

      navigationOptions: {
        title: 'Comentarios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Contactos: {
      screen: Contactos,

      navigationOptions: {
        title: 'Contactos',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
  },

  {
    mode: "modal",
    title: "test",
  }
);
export default createAppContainer(RootStack);
