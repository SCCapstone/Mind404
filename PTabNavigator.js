import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ProvHomeScreen,
  ProvServicesScreen,
  ProvProfileScreen,
  ProvCalendarScreen,
  EditServiceScreen,
  ServicesPostScreen
} from "./src/screens";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const ServicesStack = createStackNavigator();

function ServicesStackScreen() {
  return ( 
    <ServicesStack.Navigator>
      <ServicesStack.Screen name="Services" component={ProvServicesScreen} options={{headerShown: false}}/>
      <ServicesStack.Screen name="Edit Service" component={EditServiceScreen} />
      <ServicesStack.Screen name="Post Your Service" component={ServicesPostScreen}/>
    </ServicesStack.Navigator>
  )
}

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ProvHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Services Stack"
        component={ServicesStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flower" color={color} size={size} />
          ),
          headerShown: false,
          title: "Services"
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProvProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={ProvCalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
