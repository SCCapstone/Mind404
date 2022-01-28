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
import Button from "./../../../../components/Button";
import useUser from "../../../../useUser";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { firebase } from "./../../../firebase/config";

export default function ProvProfileScreen({ navigation }) {
  const { user, setUser } = useUser();
  const [description, setDecription] = useState(user.description);
  const onPostPress = () => {
    /** Checks to see if type of service is an empty string */
    if (description == "") {
      alert("Please enter services offered.");
      return;
    }
    const usersRef = firebase.firestore().collection("users");
    const data = { description };
    usersRef.doc(user.id).update(data);
    setUser({
      ...user,
      ...data,
    });
    navigation.navigate("Prov Home");
  };

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
            onChangeText={setDecription}
            value={description}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            multiline
          ></TextInput>
        </View>
        <Button style={styles.servicesPostButton} onPress={onPostPress}>
          <Text style={styles.buttonTitle}>Post Service</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}
