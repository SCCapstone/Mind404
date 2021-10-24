import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Button, Image, Alert } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/GrubberBackground.png')} resizeMode='cover' style={styles.backgroundImage}>
      <Text style={styles.text}>Welcome to Grubber!</Text>
      <Image source={require('./assets/grubber.png')} style={styles.logo}/>
      <Button
        title="Click me"
        color="orange"
        style={styles.loginButton}
        onPress={() =>
          Alert.alert("Title", "Message", [
            {text: "Yes", onPress: () => console.log("Yes") },
            {text: "No", onPress: () => console.log("No") },
          ])
        }
      />
      <Button
        title="Log in"
        color= "blue"
        style={styles.loginButton}
        onPress={() =>
          Alert.alert("Title", "Message", [
            {text: "Yes", onPress: () => console.log("Yes") },
            {text: "No", onPress: () => console.log("No") },
          ])
        }
      />
      <Button
        title="Create an account"
        color= "blue"
        style={styles.loginButton}
        onPress={() =>
          Alert.alert("Would you like to create an account", [
            {text: "Yes", onPress: () => console.log("Yes") },
            {text: "No", onPress: () => console.log("No") },
          ])
        }
      />
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 225,
    left: 80,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 21,
    position: 'absolute',
    top: 295,
    left: 105,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  loginButton: {
    margin: 5,
  },
});
