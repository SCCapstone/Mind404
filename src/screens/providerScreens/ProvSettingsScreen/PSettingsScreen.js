import * as React from "react";
import {
  Text,
  View,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "../../../../components/styles";
import { firebase } from "../../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PSettingsScreen({ navigation }) {
  const onChangePasswordPress = () => {
    navigation.navigate("Prov Change Password");
  };
  const onChangeEmailPress = () => {
    navigation.navigate("Prov Change Email");
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    firebase.auth().signOut();
    Alert.alert("Successfully logged out");
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => onChangePasswordPress()}
      >
        <Text style={styles.buttonTitle}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.changePasswordButton}
        onPress={() => onChangeEmailPress()}
      >
        <Text style={styles.buttonTitle}>Change Email</Text>
      </TouchableOpacity>
      <View style={styles.footerView}>
        <Text onPress={onLogout} style={styles.footerLink}>
          Log Out
        </Text>
      </View>
    </ImageBackground>
  );
}
