import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./../../../components/styles";
import { firebase } from "../../firebase/config";
import useUser from "../../../useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  useEffect(() => {
    async function checkuser() {
      const value = await AsyncStorage.getItem("loggedInUser");
      if (value) {
        const user = JSON.parse(value);
        let type = user.typeOfUser;
        setUser(user);
        if (type != undefined && type.toLowerCase() == "provider") {
          navigation.navigate("Prov Home", { user });
        } else {
          navigation.navigate("Client Home", { user });
        }
      }
    }
    checkuser();
  }, []);

  const onLoginPress = () => {   
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        //if(!response.user.emailVerified){
          //alert("Email needs verfication, please check your inbox.")
        //} else {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                alert("User no longer exists.");
                return;
              }
              const user = firestoreDocument.data();
              setUser(user);
              const formattedUser = JSON.stringify(user);
              AsyncStorage.setItem("loggedInUser", formattedUser);
              let type = user.typeOfUser;
              if (type != undefined && type.toLowerCase() == "provider") {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Prov Home', params: { user }}],
                })
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Client Home', params: { user }}],
                })
              }
            })
            .catch((error) => {
              alert(error);
            });
          //}
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ImageBackground
      source={require("../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={{ marginTop: 60 }}></Text>
          <Image
            style={styles.logo}
            source={require("../../../assets/grubber.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
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
            maxLength={20}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text testID="Login.testButton" style={styles.buttonTitle}>
              Log in
            </Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Sign up
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ImageBackground>
  );
}
