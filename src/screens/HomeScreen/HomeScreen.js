import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import styles from './../../../components/styles';
import Button from "../../../components/Button.js";

export default function HomeScreen({navigation}) {

  const onSettingsCogPress = () => {
    navigation.navigate('Settings')
  }
  return (
  <ImageBackground
    source={require("../../../assets/GrubberBackground.png")}
    resizeMode="cover"
    style={styles.backgroundImage}>
       
    <TouchableOpacity
      style={styles.settingsButton}
      onPress={() => onSettingsCogPress()} >
      <Text style={styles.buttonTitle}>S</Text>
    </TouchableOpacity>
    
    </ImageBackground>
  );
};

