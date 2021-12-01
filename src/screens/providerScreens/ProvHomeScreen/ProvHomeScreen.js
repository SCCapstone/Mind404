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

export default function ProvHomeScreen({ navigation }) {
  const onSettingsCogPress = () => {
    navigation.navigate("Prov Settings");
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
      </View>
    </ImageBackground>
  );
}