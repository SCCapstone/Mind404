import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./../../../../components/styles";
import Button from "./../../../../components/Button.js";
import MapView from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import ServiceListing from "../../../../components/ServiceListing";

export const firestoreAutoId = (): string => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

export default function HomeScreen({ navigation }) {
  const [randomService, setRandomService] = useState();
  const { user } = useUser();
  const onSettingsCogPress = () => {
    navigation.navigate("Settings");
  };

  useEffect(() => {
    const servicesRef = firebase.firestore().collection("services");
    const query = async () => {
      let queryRef = await servicesRef
        .where("__name__", ">=", firestoreAutoId())
        .orderBy("__name__")
        .limit(1)
        .get();
      const newRandomService = [];
      queryRef.forEach((documentSnapshot) => {
        newRandomService.push(documentSnapshot.data());
      });
      if (newRandomService.length === 0) {
        queryRef = await servicesRef
          .where("__name__", ">=", "")
          .orderBy("__name__")
          .limit(1)
          .get();
        queryRef.forEach((documentSnapshot) => {
          newRandomService.push(documentSnapshot.data());
        });
      }
      setRandomService(newRandomService[0]);
    };
    query();
  }, []);
  console.log(randomService);

  return (
    <ImageBackground
      source={require("../../../../images/grey_background.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => onSettingsCogPress()}
      >
        <MaterialCommunityIcons name="cog-outline" color="#000" size={30} />
      </TouchableOpacity>
      <View>
      <Text style={styles.welcome}>Grubber </Text>
        <Text style={styles.welcome}>Welcome {user.firstName}!</Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
          }}
        >
          Recommended Service:
        </Text>
      </View>
      <View>{randomService && <ServiceListing item={randomService} />}</View>
    </ImageBackground>
  );
}
