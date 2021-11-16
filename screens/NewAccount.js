import * as React from "react";
//import React, {useContext, useState} from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image, StyleSheet,ImageBackground,TextInput} from "react-native";
import Button from "../components/Button";
import { AuthContext } from '../navigation/AuthProvider';

const NewAccountScreen = ({ navigation}) => { 
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const {register} = useContext(AuthContext);
    return(
      <View style={styles.container}>
        <Text style={styles.text}> Create an Account </Text>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          autoCapitalize="none"
          autoCorrect={false} />
          <FormInput
          labelValue={password}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          autoCapitalize="none"
          autoCorrect={false} 
          />
          <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          autoCapitalize="none"
          autoCorrect={false} 
          secureTextEntry={true}
          />
        <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password)}
      />
          </View>
    ); null }

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f9fafd',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
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

export default NewAccountScreen;
