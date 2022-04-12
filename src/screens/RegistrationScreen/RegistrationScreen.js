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

export default function RegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [typeOfUser, setTypeOfUser] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const types = ["Client", "Provider"];

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (typeOfUser == null) {
      alert("Account type not selected.");
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

    /** checks to see if valid date of birth entry is present */
    if (!isValidDate(dob)) {
      alert("Invalid date of birth entry");
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
          <TextInput
            style={styles.regInput}
            placeholder="Date of Birth (mm/dd/yyyy)"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setDOB(text)}
            value={dob}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            maxLength={10}
          />
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
function isValidDate(dateString) {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
