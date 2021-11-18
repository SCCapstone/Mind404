import * as React from "react"
import { firebase } from '/Users/tylershatley/Desktop/Mind404/firebase/config.js'

import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import Button from "../components/Button";

export default function NewAccountScreen ({ navigation, route })  { 
    const [text, onChangeText] = React.useState("text");
    const [number, onChangeNumber] = React.useState(null);

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dob, setDOB] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onRegisterPress = () => {
      if (password == "idk") {
          return
      }
  
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((response) => {
              const uid = response.user.uid
              const data = {
                  id: uid,
                  email,
                  fullName,
              };
              const usersRef = firebase.firestore().collection('users')
              usersRef
                  .doc(uid)
                  .set(data)
                  .then(() => {
                      navigation.navigate('Map', {user: data})
                  })
                  .catch((error) => {
                      alert(error)
                  });
          })
          .catch((error) => {
              alert(error)
      });
  }

    return(
    <ImageBackground
      source={require("../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Text style={styles.BiggerText}>
        {" "}
        Please enter your information below.
      </Text>
      <SafeAreaView>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          placeholder="Date of Birth"
          style={styles.input}
          onChangeText={(text) => setDOB(text)}
          value={dob}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button onPress={() => navigation.navigate("Map")}>Login</Button>
      </SafeAreaView>
    </ImageBackground>
    
    );
};

const styles = StyleSheet.create({
    BiggerText: {
      fontSize: 20,
      textAlign: "center",
    },
    backgroundImage: {
      width: "100%",
      height: "100%",
    },
    input: {
      height: -200,
      margin: 10,
      borderWidth: 4,
      padding: 20,
      fontSize: 20,
    },
  });
