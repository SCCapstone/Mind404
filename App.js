import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Grubber!</Text>
      <Image source={require('./assets/grubber.png')}/>
      <Button
        title="Click me"
        color="orange"
        onPress={() =>
          Alert.alert("Title", "Message", [
            {text: "Yes", onPress: () => console.log("Yes") },
            {text: "No", onPress: () => console.log("No") },
          ])
        }
      />
      <Button
        title="Log in"
        color="blue"
        onPress={() =>
          Alert.alert("Title", "Message", [
            {text: "Yes", onPress: () => console.log("Yes") },
            {text: "No", onPress: () => console.log("No") },
          ])
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
