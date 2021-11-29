import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import Button from "../../../components/Button";
import styles from "./../../../components/styles";

export default function ServicesScreen({ navigation }) {
  const onPostPress = () => {
    navigation.navigate("ServicesPost");
  };

  return (
    <ImageBackground
      source={require("../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1 }} />
      <View style={styles.postButton}>
        <Button onPress={onPostPress}>Post New Service</Button>
      </View>
    </ImageBackground>
  );
}
