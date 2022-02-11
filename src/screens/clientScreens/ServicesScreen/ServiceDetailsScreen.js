import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";

export default function ServiceDetailsScreen({ route, navigation }) {
  const [providerData, setProviderData] = useState(Object);
  const { item } = route.params;

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(item.providerId)
      .get()
      .then((querySnapshot) => {
        setProviderData(querySnapshot.data());
      });
  }, []);
  console.log(providerData);
  const bookingPrompt = () => {
    Alert.alert(
      "Would you like to schedule an appointment for this service?",
      "Select book to proceed to booking details and availability.",
      [
        {
          text: "Book",
          onPress: () => navigation.navigate("Service Booking", { item }),
        },
        {
          text: "Cancel",
          color: "red",
        },
      ]
    );
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.serviceType}</Text>
          <Text style={styles.description}>{item.description}</Text>
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
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "black", fontSize: 20 }}>
            Provider Profile:
          </Text>
          <Text style={styles.welcome}>
            {providerData.firstName} {providerData.lastName}
          </Text>
          <Image
            style={styles.profilePhoto}
            source={
              providerData.imageURL
                ? { uri: providerData.imageURL }
                : require("../../../../assets/unknown-user-image.png")
            }
          />
          <View style={styles.profileDescriptionWrapper}>
            <View>
              <Text style={styles.titleText}>Service Provided</Text>
            </View>
            <View style={styles.marginTop10}>
              <Text>{providerData.description}</Text>
            </View>
          </View>
          <View style={styles.profileDescriptionWrapper}>
            <View>
              <Text style={styles.titleText}>Reviews</Text>
            </View>
            <View style={styles.marginTop10}>
              <Text>This Service Provider has no reviews yet.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
