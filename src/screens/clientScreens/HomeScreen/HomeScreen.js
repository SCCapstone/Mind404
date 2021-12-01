import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./../../../../components/styles";
import Button from "./../../../../components/Button.js";
import MapView from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";

export default function HomeScreen({ navigation }) {
  const onSettingsCogPress = () => {
    navigation.navigate("Settings");
  };
  
  const user = firebase.auth().currentUser;

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => onSettingsCogPress()}
      >
        <MaterialCommunityIcons 
          name="cog-outline" 
          color="#000" 
          size={30}
          
        />
      </TouchableOpacity>
      <View style={styles.layout}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
