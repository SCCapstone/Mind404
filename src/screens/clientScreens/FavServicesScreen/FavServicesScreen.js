import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import styles from "./../../../../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import DateTimePicker from '@react-native-community/datetimepicker'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ClientFavoritesScreen({ route, navigation }) {
 
  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text>ClientFavoritesScreen</Text>
      </View>
    </ImageBackground>
  );
}