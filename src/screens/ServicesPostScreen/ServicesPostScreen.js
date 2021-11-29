import React, { useState } from "react";
import { Text, View, ImageBackground, TextInput } from "react-native";
import Button from "../../../components/Button";
import styles from "./../../../components/styles";

export default function ServicesPostScreen({ navigation }) {
  const onPostPress = () => {
    navigation.navigate("Services");
  };
  const [post, setPost] = useState("");
  return (
    <ImageBackground
      source={require("../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View>
        <Text>Service Details</Text>
      </View>
      <TextInput
        style={styles.multilineInput}
        placeholder="Service Explanation"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setPost(text)}
        value={post}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        multiline
      ></TextInput>
      <Button onPress={onPostPress}>Post</Button>
    </ImageBackground>
  );
}
