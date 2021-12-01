import * as React from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";

const ProfileScreen = () => {
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
      <View style={styles.footerView}>
        <Text style ={styles.welcome}> Profile: {user.firstName}</Text>
      </View>
      <View style = {styles.headerView}>
        <Text style = {styles.welcome}> {user.userInfo} </Text>
      </View>
    </ImageBackground>    
  );
}
export default ProfileScreen; 