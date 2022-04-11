import React, { useState } from "react";
import {Text, Alert, TextInput, ImageBackground, TouchableOpacity} from "react-native";
import styles from "../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PChangeEmailScreen({navigation}) {
  const [newEmail, updateEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmailPress = () => {

    reauthenticate(password).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then (() => {
        Alert.alert("Email has been successfully changed");
        navigation.navigate("Prov Settings");
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
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          keyboardType="email-address"
          placeholder="New Email"
          onChangeText={(text) => updateEmail(text)}
          value={newEmail}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          maxLength={45}
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
          maxLength={45}
        />
        <TouchableOpacity style={styles.changePasswordButton} onPress={onChangeEmailPress}>
            <Text style={styles.buttonTitle}>Change Email</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>  
    </ImageBackground>
  );
};