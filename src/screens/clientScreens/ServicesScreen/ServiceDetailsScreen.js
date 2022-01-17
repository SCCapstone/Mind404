import * as React from "react";
import { Text, View, ImageBackground, Button, TouchableOpacity, Alert} from "react-native";
import styles from "./../../../../components/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function ServiceDetailsScreen({ route, navigation }) {
  const { item } = route.params;

  const bookingPrompt = () => {
    Alert.alert(
      "Would you like to schedule an appointment for this service?",
      "Select book to proceed to booking details and availability.",
      [
        {
          text: "Book",
          onPress: () => navigation.navigate('Service Booking')
        },
        {
          text: "Cancel",
          color: "red"
        },
      ]
    )
  }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always">
        
        <View style={styles.container}>
            <Text style ={styles.title}>{item.serviceType}</Text>
            <Text style ={styles.description}>{item.description}</Text> 
        </View>
        <View style={styles.locationNumberContainer}>
            <Text style={styles.location}>{item.location}</Text>
            <Text
              style={styles.phoneNumber}
              onPress={() => Linking.openURL(`tel:${item.contact}`)}
            >
              {item.contact}
            </Text>
        </View>
        <TouchableOpacity
            style={styles.bookButton}
            onPress={() => bookingPrompt()}
        >
            <Text style={styles.buttonTitle}>Book</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
