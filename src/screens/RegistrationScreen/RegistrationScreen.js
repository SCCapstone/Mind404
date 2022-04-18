import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./../../../components/styles";
import { firebase } from "./../../firebase/config";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import RNPickerSelect from "react-native-picker-select";
import MonthDateYearField from 'react-native-datefield'

export default function RegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [dobFull, setDOBFull] = useState()
  const [password, setPassword] = useState("");
  const [typeOfUser, setTypeOfUser] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const types = ["Client", "Provider"];

  const dobString = (value) => {
    setDOBFull(value);
    let day = value.getDate()
    let month = value.getMonth()+1
    if(day < 10){
      day = '0' + day
    }
    if(month < 10){
      month = '0' + month
    }
    setDOB(month+'/'+day+'/'+value.getFullYear())
  }

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (typeOfUser == null) {
      alert("Account type not selected.");
      return;
    }
    if (!isValidDate(dobFull)) {
      return;
    }
    /** checks to see if passwords match */
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    /** checks to see if a first name is entered into the field */
    if (firstName == "") {
      alert("First Name field cannot be empty");
      return;
    }

    /** checks to see if a last name is entered into the field */
    if (lastName == "") {
      alert("Last Name field cannot be empty");
      return;
    }

    /** checks to see if email field is empty */
    if (email == "") {
      alert("Email field cannot be empty");
      return;
    }

    /**checks to see if password field is empty */
    if (password == "") {
      alert("Password field cannot be empty");
      return;
    }

    /**checks to see if confirm password field is empty */
    if (confirmPassword == "") {
      alert("Confirm password field cannot be empty");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        response.user.sendEmailVerification();
        const uid = response.user.uid;
        alert("Thank you for joining Grubber! We have sent you a link to your email to confirm your registration.")
        
        if(typeOfUser == 'Provider'){
          const data = {
            id: uid,
            email,
            firstName,
            lastName,
            dob,
            typeOfUser,
            reviews: [],
          };
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate('Login')
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          const data = {
            id: uid,
            email,
            firstName,
            lastName,
            dob,
            typeOfUser,
          };
          const usersRef = firebase.firestore().collection("users");
          usersRef
            .doc(uid)
            .set(data)
            .then(() => {
              navigation.navigate('Login')
            })
            .catch((error) => {
              alert(error);
            });
        }
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
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%"}}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/grubber.png")}
        />
        <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
          <TextInput
            style={styles.regInput}
            placeholder="First Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            maxLength={20}
          />
          <TextInput
            style={styles.regInput}
            placeholder="Last Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            maxLength={20}
          />
          <RNPickerSelect
              onValueChange={(value) => setTypeOfUser(value)}
              items={[
                  { label: 'Client', value: 'Client' },
                  { label: 'Provider', value: 'Provider' },
              ]}
              placeholder={{ label: "Select Account Type", value: null, color: '#9EA0A4' }}
              value={typeOfUser}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  fontSize: 16,
                  height: 48,
                  padding: 15,
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  borderRadius: 5,
                  color: 'black',
                  backgroundColor: '#FFAC1C',
                  marginTop: 10,
                  marginBottom: 18,
                  width: 225,
                },
                iconContainer: {
                  top: 18,
                  right: 10,
                },
                placeholder: {
                  color: 'black'
                }
              }}
              Icon={() => {
                return <MaterialCommunityIcon name="chevron-down" color="#000" size={30} />;
              }}
          />
          <TextInput
            style={styles.regInput}
            placeholder="E-mail"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            maxLength={45}
          />
          <View style={{marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{fontSize: 15}}>Date of birth:   </Text>
            <MonthDateYearField
              labelDate="Day"
              labelMonth="Month"
              labelYear="Year"
              containerStyle={{
                borderRadius: 5,
                backgroundColor: 'white',
                padding: 7,
                width:'60%'
              }}
              onSubmit={(value)=> dobString(value)}
            />
          </View>
          <TextInput
            style={styles.regInput}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            maxLength={20}
          />
          <TextInput
            style={styles.regInput}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            maxLength={20}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

/** algorithm to check to see if a valid date is present within a string*/
function isValidDate(value) {
  let today = new Date();
  if(today.getFullYear() - value.getFullYear() < 18){
    alert("You must be at least 18 years of age to use Grubber.")
    return false;
  }
  if(today.getFullYear() - value.getFullYear() == 18){
    console.log(today.getMonth()+1, value.getMonth()+1)
    if(today.getMonth()+1 < value.getMonth()+1){
      alert("You must be at least 18 years of age to use Grubber.")
      return false;
    }
    if(today.getMonth()+1 == value.getMonth()+1){
      if(today.getDate() < value.getDate()){
        alert("You must be at least 18 years of age to use Grubber.")
        return false;
      }
    }
  }
  if(today.getFullYear() - value.getFullYear()>110){
    alert("Please enter a valid date of birth")
    return false;
  }
  return true;
}
