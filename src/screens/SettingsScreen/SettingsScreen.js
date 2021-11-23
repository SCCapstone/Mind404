import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import styles from './../../../components/styles';
import Button from "../../../components/Button.js";

export default function SettingsScreen({navigation}) {
    return (
    <ImageBackground
      source={require("../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}>
    
    </ImageBackground>
  );
};