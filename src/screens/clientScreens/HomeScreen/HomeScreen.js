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
import useUser from "../../../../useUser";

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const onSettingsCogPress = () => {
    navigation.navigate("Settings");
  }

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
        <MaterialCommunityIcons name="cog-outline" color="#000" size={30} />
      </TouchableOpacity>
      <View style={styles.layout}>
        <Text style={styles.welcome}>Welcome {user.firstName}!</Text>
      </View>
    </ImageBackground>
  );
}
