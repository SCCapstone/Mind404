import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ProvHomeScreen,
} from "./src/screens";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Prov Home"
        component={ProvHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
