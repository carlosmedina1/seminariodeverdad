import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, Touchable } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
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
import { clockRunning, color } from "react-native-reanimated";
import { TabView, SceneMap } from "react-native-tab-view";
import Video from "react-native-video";
import YouTube from "react-native-youtube";
import YoutubePlayer from "react-native-youtube-iframe";

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
        <View style={{ flexDirection: "row", backgroundColor: "white" }}>
          {
            /*
            <Image style={styles.miniImg} source={require("./images/1.jpg")} />
            */
          }
          
          <TouchableOpacity style={styles.txtInput}>
            <Text
              style={{ marginLeft: 10 }}
              placeholder="¿Qué estás pensando?"
              onPress={() => navigation.navigate("Busqueda")}
            >
              ¿Qué estás buscando?
            </Text>
          </TouchableOpacity>
          {
            /*
            <TouchableOpacity>
              <Ionicons
                style={styles.icon}
                name="images"
                color="green"
                size={25}
                onPress={() => navigation.navigate("addFoto")}
              />
            </TouchableOpacity>
            */
          }

        </View>

        {
          /*
          <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "white",
                marginTop: 15,
              }}
            >
              <TouchableOpacity style={styles.boton}>
                <Text style={styles.txtBtn}>Historias</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton}>
                <Text style={styles.txtBtn}>Rests</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton} inactiveTintColor={"white"}>
                <Text style={styles.txtBtn}>Salas</Text>
              </TouchableOpacity>
            </View>
            */
        }

        <View style={{ backgroundColor: "white", height: 230 }}>
          <View style={{ height: 30, alignContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 10,
                fontSize: 15,
              }}
            >
              Mis productos
            </Text>
          </View>
          <ScrollView horizontal={true} flexDirection="row">
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity>
                <Image
                  style={styles.imgPersonas}
                  source={{ uri: "http://placekitten.com/100/200" }}
                />
              </TouchableOpacity>
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
        <View style={{ backgroundColor: "white", marginTop: 15, height: 300 }}>
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

const WatchScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Texto de Watch</Text>
    </View>
  );
};

const StoreScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Texto de Store</Text>
    </View>
  );
};

const NotificationScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Texto de Notificaciones</Text>
    </View>
  );
};

const MenuScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: "rgba(239, 244, 245, 1)", flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "rgba(239, 244, 245, 1)",
            height: 50,
          }}
        >
          <View style={{ width: "50%", justifyContent: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 20 }}>
              Menú
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "50%",
            }}
          >
            <View style={[styles.btnMenu, { marginRight: 5 }]}>
              <TouchableOpacity>
                <FontAwesome name={"gear"} size={20}></FontAwesome>
              </TouchableOpacity>
            </View>
            <View style={[styles.btnMenu, { marginRight: 10 }]}>
              <TouchableOpacity>
                <Entypo name={"magnifying-glass"} size={20}></Entypo>
              </TouchableOpacity>
            </View>
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
              <Text style={{ fontWeight: "bold" }}>Nombre Usuario</Text>
              <Text style={{ color: "gray" }}>Ver tu perfil</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            <View
              style={{ width: "50%", flexDirection: "column", marginTop: 10 }}
            >
              <View style={styles.menuCards}>
                <TouchableOpacity onPress={() => navigation.navigate("Amigos")}>
                  <View style={styles.btnCards}>
                    <MaterialCommunityIcons
                      name={"account-search"}
                      size={23}
                      color={"lightblue"}
                    />
                    <Text>Buscar amigos</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity onPress={() => navigation.navigate("Store")}>
                  <View style={styles.btnCards}>
                    <FontAwesome5
                      name={"store"}
                      size={18}
                      color={"lightblue"}
                    />
                    <Text>Marketplace</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <Entypo
                      name={"back-in-time"}
                      size={28}
                      color={"lightblue"}
                    />
                    <Text>Recuerdos</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <AntDesign name={"flag"} size={28} color={"red"} />
                    <Text>Páginas</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <MaterialCommunityIcons
                      name={"calendar-star"}
                      size={28}
                      color={"red"}
                    />
                    <Text>Eventos</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{ width: "50%", flexDirection: "column", marginTop: 10 }}
            >
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <FontAwesome name={"group"} color={"lightblue"} size={20} />
                    <Text>Grupos</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity onPress={() => navigation.navigate("Watch")}>
                  <View style={styles.btnCards}>
                    <MaterialCommunityIcons
                      name={"youtube-tv"}
                      size={20}
                      color={"lightblue"}
                    />
                    <Text>Videos en Watch</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <Entypo name={"bookmark"} size={28} color={"purple"} />
                    <Text>Guardado</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <MaterialCommunityIcons
                      name={"movie"}
                      size={28}
                      color={"orange"}
                    />
                    <Text>Reels</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.menuCards}>
                <TouchableOpacity>
                  <View style={styles.btnCards}>
                    <MaterialIcons
                      name={"videogame-asset"}
                      size={28}
                      color={"lightblue"}
                    />
                    <Text>Videojuegos</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>

    /*
     */
  );
};

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Amigos: {
      screen: AmigosScreen,
    },
    Watch: {
      screen: WatchScreen,
    },
    Store: {
      screen: StoreScreen,
    },
    Notifications: {
      screen: NotificationScreen,
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
        } else if (routeName === "Watch") {
          iconName = `youtube-tv`;
          return (
            <MaterialCommunityIcons
              focused={focused}
              name={iconName}
              size={20}
              color={tintColor}
            ></MaterialCommunityIcons>
          );
        } else if (routeName === "Store") {
          iconName = `store`;
          return (
            <FontAwesome5
              focused={focused}
              name={iconName}
              size={20}
              color={tintColor}
            ></FontAwesome5>
          );
        } else if (routeName === "Notifications") {
          iconName = `bell`;
          return (
            <FontAwesome
              focused={focused}
              name={iconName}
              size={20}
              color={tintColor}
            ></FontAwesome>
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

const RootStack = createStackNavigator(
  {
    MercadoUCM: AppNavigator,
    Busqueda: () => (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image style={styles.miniImg} source={require("./images/1.jpg")} />
          </View>
          <View style={{}}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                Nombre Persona
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "gray",
                    height: 30,
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                    <Fontisto
                      name={"persons"}
                      size={10}
                      color={"gray"}
                      style={{ marginTop: 5 }}
                    ></Fontisto>
                    <Text style={{ marginHorizontal: 5, color: "gray" }}>
                      Amigos
                    </Text>
                    <AntDesign
                      name={"caretdown"}
                      size={10}
                      color={"gray"}
                      style={{ marginTop: 5 }}
                    ></AntDesign>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "gray",
                    height: 30,
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
                    <Entypo
                      name={"plus"}
                      size={12}
                      color={"gray"}
                      style={{ marginTop: 3 }}
                    ></Entypo>
                    <Text style={{ marginHorizontal: 5, color: "gray" }}>
                      Álbum
                    </Text>
                    <AntDesign
                      name={"caretdown"}
                      size={10}
                      color={"gray"}
                      style={{ marginTop: 5 }}
                    ></AntDesign>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <TextInput
          style={{ marginLeft: 10, marginTop: 10, fontSize: 20 }}
          multiline={true}
          placeholder="¿Qué estás pensando?"
        ></TextInput>
      </View>
    ),
    addFoto: () => (
      <View>
        <Text>-- Aquí va la galería --</Text>
      </View>
    ),
    Login: {
      screen: Login,
  
      navigationOptions: {
        title: 'Ingresar',
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

/*
const renderScene = SceneMap({
  primero: primeraRuta,
  segundo: SegundaRuta,
  tercero: TerceraRuta
})

export function TabViewExample(){
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    {key: 'primero', title:'Historias'},
    {key: 'segundo', title:'Rests'},
    {key: 'tercero', title:'Salas'},
  ]);

  return(
    <TabView 
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={initialLayout}
    style={styles.container}/>
  )
}*/

export default createAppContainer(RootStack);
