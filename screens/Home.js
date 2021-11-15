import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, Image, Alert, SafeAreaView, TextInput, ImageBackground } from 'react-native';


const HomeScreen = ({ navigation }) => {
    return (
    <ImageBackground
    source={ require('../assets/GrubberBackground.png')}
    resizeMode='cover' style={styles.backgroundImage}>
      <Image style = {styles.logo} source={require('../assets/grubber.png')} />
      <Text style={styles.welcome}> Welcome! </Text>
      <View>
        <Text style={styles.space}/>
        <Button
        title="Log in" color="blue"
        onPress={() => navigation.navigate('Login')} />
        <Text style={styles.title}/>
        <Button
          title="Create an account" color="blue"
          onPress={() => navigation.navigate('NewAccount')} />
        <Text style={styles.title}/>
        <Button
          title="Settings" color="blue"
          onPress={() => navigation.navigate('Settings')} />
        <Text style={styles.title}/>

      </View>
      
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  space: {
    textAlign: 'center',
    marginVertical: 120,
  },
  welcome:{
    fontWeight: "bold",
    fontSize: 20,
    top: 240,
    left: 155,
    right: 0,
    bottom: 0,
  },
  logo: {
    position: 'absolute',
    top: 160,
    left: 80,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});
export default HomeScreen;