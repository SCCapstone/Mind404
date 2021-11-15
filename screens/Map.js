import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  SafeAreaView,
  TextInput,
  ImageBackground,
} from "react-native";
import Button from "../components/Button";
const Map = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.layout}>
        <Text style={styles.welcome}>Welcome Username!</Text>
        <View style={styles.map} />
        <View style={styles.navBar}>
          <Button>a</Button>
          <Button>b</Button>
          <Button>c</Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  space: {
    textAlign: "center",
    marginVertical: 120,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 40,
    width: "100%",
    textAlign: "center",
  },
  logo: {
    position: "absolute",
    top: 160,
    left: 80,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  map: {
    height: "50%",
    backgroundColor: "grey",
    width: "100%",
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    padding: 10,
    backgroundColor: "orange",
  },
});
export default Map;
