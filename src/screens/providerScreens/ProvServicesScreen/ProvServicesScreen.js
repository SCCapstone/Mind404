
import * as React from "react";
import { Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";

export default function ProvServicesScreen({ navigation }) {
  const onPostPress = () => {
    navigation.navigate("Post Your Service");
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.servicesPostButton} onPress={onPostPress}>
        <Text style={styles.buttonTitle}>Post a New Service</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}