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
import Route from './hooks/routes'
import Login from './src/Login'
import Registro from './src/Registro'
import Buscar from './src/Buscar'
import Categoria from './src/Categoria'
import Comentarios from './src/Comentarios'
import Reportar from './src/Reportar'
import ReportarComentario from './src/ReportarComentario'
import Contactos from './src/Contactos'
import SeleccionCategoria from './src/seleccionCategoria'
import SeleccionSubcategoria from './src/seleccionSubcategoria'
import Categorias_reportes from './src/Categorias_reportes'
import Categorias_Likes from './src/Categorias_Likes'
import EditarProducto from './src/EditarProducto'
import Productos_propios from './src/Productos_propios'
import Productos_subcategorias from './src/Productos_subcategorias'
import DetalleProducto from './src/detalleProducto'
import CrearProducto from './src/CrearProducto'
import SeleccionCategoriaAgregar from './src/seleccionCategoriaAgregar'
import CrearSubcategoria from './src/CrearSubcategoria'
import DetalleComentario from './src/detalleComentario'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListadoReporteProductos from "./src/ListadoReporteProductos";
import ListadoReporteComentarios from "./src/ListadoReporteComentarios";
import ListadoLikesComentarios from "./src/ListadoLikesComentarios";
import ListadoLikesProductos from "./src/ListadoLikesProductos";
import Productos_eliminados from "./src/Productos_eliminados";
import DetalleProductoEliminado from "./src/DetalleProductoEliminado";
import MantencionUsuarios from "./src/MantencionUsuarios";
import DetalleUsuarios from "./src/DetalleUsuarios";
import CrearCategoria from "./src/CrearCategoria";
import ListadoNotificacionesProductos from "./src/ListadoNotificacionesProductos";
import ListadoNotificacionesComentarios from "./src/ListadoNotificacionesComentarios";
import Categorias_notificaciones from "./src/Categorias_notificaciones";
import Categorias_revisar_reportes from "./src/Categorias_revisar_reportes";
import ListadoReporteProductosRevisar from "./src/ListadoReporteProductosRevisar";
import ListadoReporteComentariosRevisar from "./src/ListadoReporteComentariosRevisar";
import ListadoReportesRealesProducto from "./src/ListadoReportesRealesProducto";
import ListadoReportesRealesComentarios from "./src/ListadoReportesRealesComentarios";


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
  menuCardsAdmin: {
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

    backgroundColor: "lightblue"
  },
  btnCards: {
    marginLeft: 10,
    height: "100%",
    justifyContent: "center",
  },
  btnCards2: {
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
  const [report, setReport] = useState([])
  useEffect(() => {
    getReports()
  }, [])
  const getReports = async () => {
    try {
      const response = await fetch(Route + 'busquedaCategorias',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      const data = await response.json()
      setReport(data)

    }
    catch (e) {
      console.log(e)
    }
  }
  const wena = async (item,key) => {
    console.log(key)
    navigation.navigate("Categoria", { cat: item.id_categoria })
  }
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
          {report.map((item, key) => (
            <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => wena(item,key)}>
              <Image
                style={styles.imgPersonas}
                source={require('./images/icono_ropa.png')}
              />
            </TouchableOpacity>
          </View>
          ))}
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
              Productos o servicios con mas likes
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
                    <TouchableOpacity onPress={() => navigation.navigate("Productos_propios")}>
                      <View style={styles.btnCards}>
                        <MaterialCommunityIcons
                          name={"dropbox"}
                          size={23}
                          color={"lightblue"}
                        />
                        <Text>Mis productos y servicios</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => navigation.navigate("Categorias_reportes")}>
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
                      <>
                        <View style={styles.menuCardsAdmin}>
                          <TouchableOpacity onPress={() => navigation.navigate("Categorias_revisar_reportes")}>
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
                        <View style={styles.menuCardsAdmin}>
                          <TouchableOpacity onPress={() => navigation.navigate("CrearCategoria")}>
                            <View style={styles.btnCards}>
                              <MaterialCommunityIcons
                                name={"plus-circle-outline"}
                                size={28}
                                color={"green"}
                              />
                              <Text>Agregar Categoria</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.menuCardsAdmin}>
                          <TouchableOpacity onPress={() => navigation.navigate("SeleccionCategoriaAgregar")}>
                            <View style={styles.btnCards}>
                              <MaterialCommunityIcons
                                name={"plus-circle-outline"}
                                size={28}
                                color={"green"}
                              />
                              <Text>Agregar Subcategoria</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>

                    ) : null}


                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => navigation.navigate("SeleccionCategoria", { propio: false })}>
                      <View style={styles.btnCards}>
                        <MaterialCommunityIcons
                          name={"plus-circle-outline"}
                          size={28}
                          color={"green"}
                        />
                        <Text>Crear Producto o servicio</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>



                <View style={{ width: "50%", flexDirection: "column", marginTop: 10 }}>
                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => navigation.navigate("Categorias_notificaciones")}>
                      <View style={styles.btnCards}>
                        <Ionicons name={"notifications"} color={"red"} size={20} />
                        <Text>Notificaciones</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuCards}>
                    <TouchableOpacity onPress={() => navigation.navigate("Categorias_Likes")}>
                      <View style={styles.btnCards}>
                        <Entypo name={"thumbs-up"} size={28} color={"blue"} />
                        <Text>Mis Likes</Text>
                      </View>
                    </TouchableOpacity>
                  </View>



                  {esAdmin ?
                    (
                      <>
                        <View style={styles.menuCardsAdmin}>
                          <TouchableOpacity onPress={() => navigation.navigate("Productos_eliminados")}>
                            <View style={styles.btnCards}>
                              <MaterialCommunityIcons
                                name={"dropbox"}
                                size={23}
                                color={"red"}
                              />
                              <Text>Productos o servicios eliminados</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.menuCardsAdmin}>
                          <TouchableOpacity onPress={() => navigation.navigate("MantencionUsuarios")}>
                            <View style={styles.btnCards}>
                              <Entypo name={"users"} size={28} color={"blue"} />
                              <Text>Administracion de usuarios</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </>

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
    SeleccionCategoria: {
      screen: SeleccionCategoria,
      navigationOptions: {
        title: 'SeleccionCategoria',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    SeleccionSubcategoria: {
      screen: SeleccionSubcategoria,
      navigationOptions: {
        title: 'SeleccionSubcategoria',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    CrearProducto: {
      screen: CrearProducto,
      navigationOptions: {
        title: 'CrearProducto',
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
    ReportarComentario: {
      screen: ReportarComentario,

      navigationOptions: {
        title: 'ReportarComentario',
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
    DetalleComentario: {
      screen: DetalleComentario,

      navigationOptions: {
        title: 'DetalleComentario',
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
    EditarProducto: {
      screen: EditarProducto,

      navigationOptions: {
        title: 'EditarProducto',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Categorias_reportes: {
      screen: Categorias_reportes,

      navigationOptions: {
        title: 'Categorias_reportes',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Categorias_Likes: {
      screen: Categorias_Likes,

      navigationOptions: {
        title: 'Categorias_Likes',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoReporteProductos: {
      screen: ListadoReporteProductos,

      navigationOptions: {
        title: 'ListadoReporteProductos',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoReporteComentarios: {
      screen: ListadoReporteComentarios,

      navigationOptions: {
        title: 'ListadoReporteComentarios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoLikesProductos: {
      screen: ListadoLikesProductos,

      navigationOptions: {
        title: 'ListadoLikesProductos',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoLikesComentarios: {
      screen: ListadoLikesComentarios,

      navigationOptions: {
        title: 'ListadoLikesComentarios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    SeleccionCategoriaAgregar: {
      screen: SeleccionCategoriaAgregar,

      navigationOptions: {
        title: 'SeleccionCategoriaAgregar',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    CrearSubcategoria: {
      screen: CrearSubcategoria,

      navigationOptions: {
        title: 'CrearSubcategoria',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Productos_eliminados: {
      screen: Productos_eliminados,

      navigationOptions: {
        title: 'Productos_eliminados',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    DetalleProductoEliminado: {
      screen: DetalleProductoEliminado,

      navigationOptions: {
        title: 'DetalleProductoEliminado',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    MantencionUsuarios: {
      screen: MantencionUsuarios,

      navigationOptions: {
        title: 'MantencionUsuarios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    DetalleUsuarios: {
      screen: DetalleUsuarios,

      navigationOptions: {
        title: 'DetalleUsuarios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    CrearCategoria: {
      screen: CrearCategoria,

      navigationOptions: {
        title: 'CrearCategoria',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },

    ListadoNotificacionesProductos: {
      screen: ListadoNotificacionesProductos,

      navigationOptions: {
        title: 'ListadoNotificacionesProductos',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoNotificacionesComentarios: {
      screen: ListadoNotificacionesComentarios,

      navigationOptions: {
        title: 'ListadoNotificacionesComentarios',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Categorias_notificaciones: {
      screen: Categorias_notificaciones,

      navigationOptions: {
        title: 'Categorias_notificaciones',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Categorias_notificaciones: {
      screen: Categorias_notificaciones,

      navigationOptions: {
        title: 'Categorias_notificaciones',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    Categorias_revisar_reportes: {
      screen: Categorias_revisar_reportes,

      navigationOptions: {
        title: 'Categorias_revisar_reportes',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoReporteProductosRevisar: {
      screen: ListadoReporteProductosRevisar,

      navigationOptions: {
        title: 'ListadoReporteProductosRevisar',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoReporteComentariosRevisar: {
      screen: ListadoReporteComentariosRevisar,

      navigationOptions: {
        title: 'ListadoReporteComentariosRevisar',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoReportesRealesProducto: {
      screen: ListadoReportesRealesProducto,

      navigationOptions: {
        title: 'ListadoReportesRealesProducto',
        headerTintColor: '#fff',
        headerShown: false,
        headerBackTitleVisible: false,
      },
    },
    ListadoReportesRealesComentarios: {
      screen: ListadoReportesRealesComentarios,

      navigationOptions: {
        title: 'ListadoReportesRealesComentarios',
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
