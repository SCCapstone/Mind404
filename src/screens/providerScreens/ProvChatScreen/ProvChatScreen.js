import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "../../../../components/styles";

export default function ProvChatScreen() {
  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View>
        <Text>Chat</Text>
      </View>
    </ImageBackground>
  );
}