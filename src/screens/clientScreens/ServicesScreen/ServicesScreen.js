import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";

export default function ServicesScreen({ navigation }) {

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
    </ImageBackground>
  );
}
