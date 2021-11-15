import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Button, Image, TextInput, ImageBackground } from 'react-native';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import NewAccountScreen from './screens/NewAccount';
import SettingsScreen from './screens/Settings';

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
        component = { HomeScreen }
        options = {{ title: 'Grubber'}}
        />
        <Stack.Screen name = "Login" component={ LoginScreen } />
        <Stack.Screen name = "Create An Account" component={NewAccountScreen} />
        <Stack.Screen name = "Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
