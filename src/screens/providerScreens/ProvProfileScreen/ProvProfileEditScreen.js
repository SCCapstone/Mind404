import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./../../../../components/styles";
import useUser from "../../../../useUser";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProvProfileScreen({ navigation }) {
  const { user } = useUser();
  const [description, setDecription] = useState("");
  // const onPostPress = () => {
  //   /** Checks to see if type of service is an empty string */
  //   if (serviceType == "") {
  //     alert("Please enter a type of service.");
  //     return;
  //   }
  // }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.layout}>
        <View style={styles.profileDescriptionWrapper}>
          <View>
            <Text style={styles.titleText}>Services Provided</Text>
          </View>
          <TextInput
            style={styles.multilineInput}
            placeholder="Description of services"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setDecription(text)}
            value={description}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            multiline
          ></TextInput>
        </View>
        <TouchableOpacity
          style={styles.servicesPostButton}
          // onPress={navigation.navigate("Prov Home")}
        >
          <Text style={styles.buttonTitle}>Post Service</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
