import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, TextInput, ImageBackground,
} from "react-native";
import styles from './styles';
import Button from "../../../components/Button.js";

export default function HomeScreen({navigation}) {
    return (
    <ImageBackground
      source={require("../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Image style={styles.logo} source={require("../../../assets/grubber.png")} />

    </ImageBackground>
  );
};

