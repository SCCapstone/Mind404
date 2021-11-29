import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Alert, SafeAreaView, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import styles from './../../../components/styles';
import Button from "../../../components/Button.js";
import { firebase } from "../../firebase/config";

export default function ChangeEmailScreen({navigation}) {
  const [newEmail, updateEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmailPress = () => {

    reauthenticate(password).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then (() => {
        Alert.alert("Password has been successfully changed");
        navigation.navigate("Settings");
      }).catch((error) => {
        Alert.alert(error.message);
      });
    }).catch((error) => {
      Alert.alert(error.message)
    });
  }
  
  const reauthenticate = (password)=> {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  }

  return (
    <ImageBackground
      source={require("../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="email-address"
          placeholder="New Email"
          onChangeText={(text) => updateEmail(text)}
          value={newEmail}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.changePasswordButton} onPress={onChangeEmailPress}>
            <Text style={styles.buttonTitle}>Change Email</Text>
        </TouchableOpacity>
        
    </ImageBackground>
  );
};