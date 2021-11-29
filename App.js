import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  SettingsScreen,
} from "./src/screens";
import { decode, encode } from "base-64";
import TabNavigation from "./TabNavigation";
import ServicesPostScreen from "./src/screens/ServicesPostScreen/ServicesPostScreen";
import ChangePasswordScreen from "./src/screens/SettingsScreen/ChangePasswordScreen"
import ChangeEmailScreen from "./src/screens/SettingsScreen/ChangeEmailScreen";;
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="Change Email" component={ChangeEmailScreen} />
        <Stack.Screen name="Services Post" component={ServicesPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
