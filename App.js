import { LogBox } from "react-native";
import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  RegistrationScreen,
  SettingsScreen,
  ChangePasswordScreen,
  ChangeEmailScreen,
  ServicesPostScreen,
  ServiceDetailsScreen,
  ProviderReview,
  PSettingsScreen,
  PChangeEmailScreen,
  PChangePasswordScreen,
  ProvProfileEditScreen,
  AddEvent,
} from "./src/screens";

import { decode, encode } from "base-64";
import TabNavigation from "./TabNavigation";
import PTabNavigator from "./PTabNavigator";
import UserProvider from "./UserContext";

LogBox.ignoreLogs(["Setting a timer"]);

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
          <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings'}}/>
          <Stack.Screen
            name="Change Password"
            component={ChangePasswordScreen}
            options={{title: 'Change Password'}}
          />
          <Stack.Screen name="Change Email" component={ChangeEmailScreen} options={{title: 'Change Email'}}/>
          <Stack.Screen
            name="Service Details"
            component={ServiceDetailsScreen}
          />
          <Stack.Screen name="Post Your Review" component={ProviderReview} />
          <Stack.Screen name="Prov Settings" component={PSettingsScreen} options={{title: 'Settings'}}/>
          <Stack.Screen
            name="Prov Change Password"
            component={PChangePasswordScreen}
            options={{title: 'Change Password'}}
          />
          <Stack.Screen
            name="Prov Change Email"
            component={PChangeEmailScreen}
            options={{title: 'Change Email'}}
          />
          <Stack.Screen
            name="Prov Edit Profile"
            component={ProvProfileEditScreen}
            options={{title: 'Edit Profile'}}
          />
          <Stack.Screen name="Add Event" component={AddEvent} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
