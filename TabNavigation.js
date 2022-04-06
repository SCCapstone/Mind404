import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  ServicesScreen,
  FavServicesScreen,
  ServiceDetailsScreen,
  ProviderReview
} from "./src/screens";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const ServicesStack = createStackNavigator();

function ServicesStackScreen() {
  return ( 
    <ServicesStack.Navigator>
      <ServicesStack.Screen name="Services" component={ServicesScreen} options={{headerShown: false}}/>
      <ServicesStack.Screen name="Service Details" component={ServiceDetailsScreen} />
      <ServicesStack.Screen name="Post Your Review" component={ProviderReview} />
    </ServicesStack.Navigator>
  )
}

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Welcome"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flower" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      
      <Tab.Screen
        name="Favorites"
        component={FavServicesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
