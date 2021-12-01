import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";


export default function ProfileScreen() {
  const user = firebase.auth().currentUser;
  user.providerData.forEach((userInfo) => {
    console.log('User info for provider: ', userInfo);
  })

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View>
        <Text style ={styles.title}> Welcome {user.userInfo}</Text>
      </View>
    </ImageBackground>    
  );
}
