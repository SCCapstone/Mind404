import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./../../../../components/styles";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";
import { acc } from "react-native-reanimated";
import NumericInput from 'react-native-numeric-input';
import SelectDropdown from "react-native-select-dropdown";

export default function ServicesPostScreen({ navigation }) {
  const [serviceType, setServiceT] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDecription] = useState("");
  const [CompanyName, setCompanyname] = useState("");
  const { user } = useUser();
  
  const [fromAMPM, setFromAMPM] = useState('A.M.');
  const [toAMPM, setToAMPM] = useState('P.M.');
  const [fTime, setFTime] = useState(9);
  const [tTime, setTTime] = useState(5);

  const onPostPress = () => {
    /** Checks to see if type of service is an empty string */
    if (serviceType == "") {
      alert("Please select a type of service.");
      return;
    }
    /** Checks to see if location field is an empty string */
    if (location == "") {
      alert("Please enter a valid location.");
      return;
    }
    if(!validCityState(location)){
      alert("Please enter a proper formatted location (i.e. Columbia, SC)")
      return;
    }
    /**Checks to see if phone number is a valid entry */
    if (!validPhoneCheck(contact)) {
      alert("Please enter a valid phone number.");
      return;
    }
    if(!validEmail(email)){
      alert("Please enter a valid email address.");
      return;
    }
    /**Checks to see if the description field is empty */
    if (description == "") {
      alert("Please enter a description detailing your service.");
      return;
    }
    let fromTime = fTime;
    let toTime = tTime;
    if(fromAMPM == 'P.M.'){
      if(fTime != 12){
        fromTime = fromTime + 12
      }
    }
    if(toAMPM == 'P.M.'){
      if(tTime != 12){
        toTime = toTime + 12
      }
    }
    if(fTime == 12 && fromAMPM == 'A.M.'){
      fromTime = 0;
    }
    if(tTime == 12 && tTime == 'A.M.'){
      toTime = 0;
    }
    const data = {
      contact,
      email,
      description,
      location,
      serviceType,
      CompanyName,
      fromTime,
      toTime,
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

  const services = [
    "Landscaping",
    "Car Detailing",
    "Housekeeping",
    "Accounting",
    "Tech Support",
    "Tutoring",
    "Contracting",
    "Consulting",
  ];

  const ampm = [
    "A.M.",
    "P.M."
  ]

  const numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
  ]

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
        <Text style={styles.explanation}>Select your type of service:</Text>
        <View style={{flex: 1, alignItems: 'center'}}>
          <SelectDropdown
            data={services}
            onSelect={(selectedItem, index) => {
              setServiceT(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
            rowTextForSelection={(item, index) => { return item; }}
            buttonStyle={{
              backgroundColor: "#FFAC1C",
              borderRadius: 2,
              height: 30,
              width: 160,
              alignContent: 'center',
              justifyContent: 'center'
            }}
            buttonTextStyle={{ fontWeight: "bold", color: "white" }}
            defaultButtonText={"None"}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Location (City, State Abbreviation)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLocation(text)}
          value={location}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name (if applicable, otherwise blank)"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setCompanyname(text)}
          value={CompanyName}
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
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number eg. xxx-xxx-xxxx"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setContact(text)}
          value={contact}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Text style={styles.explanation}>
           Please set timeframe, to the nearest hour, of telephone availability:
        </Text>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}>
          <Text style={styles.timeExplanation}>FROM:</Text>
          <SelectDropdown
            data={numbers}
            onSelect={(selectedItem,index) => {
              setFTime(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
            rowTextForSelection={(item, index) => { return item; }}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 2,
              height: 30,
              width: 50,
            }}
            buttonTextStyle={{ fontSize: 12, color: "black" }}
            defaultButtonText={"9"}
          />
          <SelectDropdown
            data={ampm}
            onSelect={(selectedItem, index) => {
              setFromAMPM(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
            rowTextForSelection={(item, index) => { return item; }}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 2,
              height: 30,
              width: 60,
            }}
            buttonTextStyle={{ fontSize: 12, color: "black" }}
            defaultButtonText={"A.M."}
          />
          <Text style={styles.timeExplanation}>TO:</Text>
          <SelectDropdown
            data={numbers}
            onSelect={(selectedItem,index) => {
              setTTime(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
            rowTextForSelection={(item, index) => { return item; }}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 2,
              height: 30,
              width: 50,
            }}
            buttonTextStyle={{ fontSize: 12, color: "black" }}
            defaultButtonText={"5"}
          />
          <SelectDropdown
            data={ampm}
            onSelect={(selectedItem, index) => {
              setToAMPM(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
            rowTextForSelection={(item, index) => { return item; }}
            buttonStyle={{
              backgroundColor: "white",
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 2,
              height: 30,
              width: 60,
            }}
            buttonTextStyle={{ fontSize: 12, color: "black" }}
            defaultButtonText={"P.M."}
          />
        </View>

        <TouchableOpacity
          style={styles.postService}
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

function validEmail(email){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)){
      return true;
    } else {
      return false;
    }
}

function validCityState(location){
  var fields = location.split(',');
  var fieldsWspace = location.split(", ");
  var allStates = ['State','AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM', 'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY'];
  for(let i = 0; i < 50; i++){
    if(fields[1] == allStates[i] || fieldsWspace[1] == allStates[i]){
      return true;
    }
  }
  return false;
}