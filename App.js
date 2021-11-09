import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, Image, Alert, SafeAreaView, TextInput, ImageBackground } from 'react-native';

const image = { uri: ""}
const Stack = createNativeStackNavigator();
const Seperator = () => (
  <View style = {styles.seperator} />
);

const App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component = {HomeScreen}
        options = {{ title: 'Grubber'}}
        />
        <Stack.Screen name = "Login" component={LoginScreen} />
        <Stack.Screen name = "CreateAnAccount" component={NewAccountScreen} />
        <Stack.Screen name = "Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
  <SafeAreaView style={styles.container}>
    <ImageBackground
      source={ require('./assets/GrubberBackground.png')}
      resizeMode='cover' style={styles.backgroundImage}/>
      <Text> Welcome to Grubber! </Text>
      <View>
    <Button
    title="Log in"
    color="blue"
    onPress={() =>
    navigation.navigate('Login')
  } />
  </View>
  <Seperator/>
    <View>
      <Text style={styles.title}>
        </Text>
        <Button
        title="Create an account"
        color="blue"
        onPress={() =>
        navigation.navigate('CreateAnAccount')
    } />
    </View>
  <Seperator/>
  <View>
      <Text style={styles.title}>
        </Text>
        <Button
        title="Settings"
        color="blue"
        onPress={() =>
        navigation.navigate('Settings')
    } />
    </View>
    </SafeAreaView>
  );
};
const LoginScreen = ({ navigation, route }) => { 
  return (
          <Text> Please enter your email and password.</Text>
  );
};
const NewAccountScreen = ({ navigation, route }) => { 
  return(

   <Text> Name: </Text>
  );
};
const Settings = ({ navigation, route }) => { 
  return ( <Text> Welcome to Settings </Text>
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
});

export default App;
