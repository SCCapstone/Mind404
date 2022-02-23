import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  HomeScreen,
  ServicesScreen,
  RegistrationScreen,
  SettingsScreen,
  ChangePasswordScreen,
  ChangeEmailScreen,
  ServicesPostScreen,
  ServiceDetailsScreen,
  ProvHomeScreen,
  ProvServicesScreen,
  PSettingsScreen,
  PChangeEmailScreen,
  PChangePasswordScreen,
  ProvProfileEditScreen,
  AddEvent,
  FavServicesScreen,
  AddFavServices
} from "./src/screens";

import { decode, encode } from "base-64";
import TabNavigation from "./TabNavigation";
import PTabNavigator from "./PTabNavigator";
import UserProvider from "./UserContext";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();


export default function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen
            name="Client Home"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Prov Home"
            component={PTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen
            name="Change Password"
            component={ChangePasswordScreen}
          />
          <Stack.Screen name="Change Email" component={ChangeEmailScreen} />
          <Stack.Screen
            name="Service Details"
            component={ServiceDetailsScreen}
          />
          <Stack.Screen name="Prov Services" component={ProvServicesScreen} />
          <Stack.Screen
            name="Post Your Service"
            component={ServicesPostScreen}
          />
          <Stack.Screen name="Prov Settings" component={PSettingsScreen} />
          <Stack.Screen
            name="Prov Change Password"
            component={PChangePasswordScreen}
          />
          <Stack.Screen
            name="Prov Change Email"
            component={PChangeEmailScreen}
          />
          <Stack.Screen
            name="Prov Edit Profile"
            component={ProvProfileEditScreen}
          />
          <Stack.Screen
            name="Add Event"
            component={AddEvent}
          />
          <Stack.Screen
            name="Client Favorite Services"
            component={FavServicesScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
