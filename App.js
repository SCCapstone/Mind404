import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { firebase } from './firebase/config';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import HomeScreen from "./screens/Home"
import LoginScreen from "./screens/Login"
import NewAccountScreen from "./screens/NewAccount"
import SettingsScreen from "./screens/Settings"
import MapScreen from "./screens/Map"
import ViewServicesScreen from "./screens/ViewServices"
import ViewPastServicesScreen from "./screens/ViewPastServices"
import PurchaseServicesScreen from "./screens/PurchaseService"


const image = { uri: "" };
const Stack = createNativeStackNavigator();
const Seperator = () => <View style={styles.seperator} />;

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Grubber" }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="NewAccount" component={NewAccountScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="ViewServices" component={ViewServicesScreen} />
        <Stack.Screen name="ViewPastServices" component={ViewPastServicesScreen} />
        <Stack.Screen name="PurchaseServices" component={PurchaseServicesScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
