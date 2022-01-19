import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";


export default function ServicesPostScreen({ navigation }) {
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDecription] = useState("");
  const { user } = useUser();
  const [isEnabled,setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onPostPress = () => {
    /** Checks to see if type of service is an empty string */
    if (serviceType == "") {
      alert("Please enter a type of service.");
      return;
    }
    /** Checks to see if location field is an empty string */
    if (location == "") {
      alert("Please enter a valid location.");
      return;
    }
    /**Checks to see if phone number is a valid entry */
    if (!validPhoneCheck(contact)) {
      alert("Please enter a valid phone number.");
      return;
    }
    /**Checks to see if the description field is empty */
    if (description == "") {
      alert("Please enter a description detailing your service.");
      return;
    }
    const data = {
      contact,
      description,
      location,
      serviceType,
      providerId: user.id,
    };
    firebase
      .firestore()
      .collection("services")
      .add(data)
      .then(() => {
        alert("Your service was successfully posted!");
        navigation.navigate("Prov Home");
      });
  };

  const displayCalendar = () => {
    return <Text>hello</Text>
  }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <Text style={styles.instructionText}>
            {" "}
            Please Enter the following information:
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Type of Service"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setServiceType(text)}
          value={serviceType}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Location (City, State)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLocation(text)}
          value={location}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Phone Number eg. xxx-xxx-xxxx"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setContact(text)}
          value={contact}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Book through app:</Text>
          <Switch
            trackColor={{false: "#767577", true: "#81b0ff"}}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
            onChange={displayCalendar}/>
        </View>
        {}
        <TouchableOpacity
          style={styles.servicesPostButton}
          onPress={onPostPress}
        >
          <Text style={styles.buttonTitle}>Post Service</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

/** Function to see if a string is in phone number syntax*/
function validPhoneCheck(phoneNumber) {
  
  if(/^(1?\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{4})$/.test(phoneNumber)){
    return true;
  }else if(/^(1?\s?\({1}[0-9]{3}\){1}\s?[0-9]{3}\-?\s?[0-9]{4})$/.test(phoneNumber)){
    return true;
  }else if(/^(1?\s?[0-9]{3}\-?\s?[0-9]{3}\-?\s?[0-9]{4})$/.test(phoneNumber)){
    return true;
  }
  else {
    return false;
  }
}
