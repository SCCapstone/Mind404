import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import styles from './../../../../components/styles';
import Button from "./../../../../components/Button";
import { firebase } from "../../../firebase/config";

export default function SettingsScreen({navigation}) {
  
  const onChangePasswordPress = () => {
    navigation.navigate('Change Password')
  }  
  const onChangeEmailPress = () => {
    navigation.navigate('Change Email')
  }

  const onLogout = () => {
    firebase.auth().signOut();
    Alert.alert("Successfully logged out")
    navigation.navigate('Login')
  }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}>
      
      <Button testID = "dostuff.Button" text = "do stuff" onPress ={console.log("button pressed")}/>

      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => onChangePasswordPress()}>
          <Text style={styles.buttonTitle}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => onChangeEmailPress()}>
          <Text style={styles.buttonTitle}>Change Email</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text onPress={onLogout} style={styles.footerLink}>
          Log Out
        </Text>
      </View>
    
    </ImageBackground>
  );
};