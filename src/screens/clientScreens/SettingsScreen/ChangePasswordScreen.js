import React, { useState } from "react";
import { Text, Alert, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";

export default function ChangePasswordScreen({navigation}) {
  const [newPassword, updatePassword] = useState("");
  const [oldPassword, setPassword] = useState("");

  const onChangePasswordPress = () => {

    reauthenticate(oldPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then (() => {
        Alert.alert("Password has been successfully changed");
        navigation.navigate("Settings");
      }).catch((error) => {
        Alert.alert(error.message);
      });
    }).catch((error) => {
      Alert.alert(error.message)
    });
  }
  
  const reauthenticate = (oldPassword)=> {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
    return user.reauthenticateWithCredential(cred);
  }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Old Password"
          onChangeText={(text) => setPassword(text)}
          value={oldPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          maxLength={20}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="New Password"
          onChangeText={(text) => updatePassword(text)}
          value={newPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          maxLength={20}
        />
        <TouchableOpacity style={styles.changePasswordButton} onPress={onChangePasswordPress}>
            <Text style={styles.buttonTitle}>Change Password</Text>
        </TouchableOpacity>
        
    </ImageBackground>
  );
};