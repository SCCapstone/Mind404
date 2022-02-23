import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";

export default function ServiceDetailsScreen({ route, navigation }) {
  const [providerData, setProviderData] = useState(Object);
  const { item } = route.params;

  const { user } = useUser(); 
  var docRef = firebase.firestore().collection("users/"+user.id+"/ClientFavorites");
  
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

  const contactTel = () => {
    if(checkAvailable(item.fromTime, item.toTime, item.contact) != ""){
      Linking.openURL(`tel:${item.contact}`);
    } else {
      return;
    }
  }
  const onAddPress = () => {
    if (!docRef.doc(item.id)) {

      firebase
            .firestore()
            .collection("users/"+user.id+"/ClientFavorites")
            .add(item)
            .then(() => {
                navigation.navigate("Client Favorite Services");
            });
    }
    }
    const onUnfavoritePress = () => {
        if(item.id)
        docRef.doc(item.id).delete();
        navigation.navigate("Client Favorite Services");   
      }

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
          <Text style={{ fontSize: 15, color: "#808080", marginBottom: 20}}>
            Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} - {`${convertTo12Hour(item.toTime)}`}  
          </Text>
        </View>
        <View style={styles.locationNumberContainer}>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.email}>{item.email}</Text> 
        </View>
        <View>
          <Text
            style={styles.phoneNumber}
            onPress={() => contactTel()}
          >
            {`${checkAvailable(item.fromTime, item.toTime, item.contact)}`}
          </Text>
          <Text style={{fontSize: 15, color: "#808080", marginStart: 20, marginBottom: 20, justifyContent: 'center'}}>
            {`${promptOutOfHours(item.fromTime, item.toTime, item.contact)}`}
          </Text>
        </View>
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
          <View style={styles.profileDescriptionWrapper}>
            <View>
              <Text style={styles.titleText}>Make this a Favorited Service</Text>
            </View>
            <TouchableOpacity
                    style={styles.servicesPostButton}
                    onPress={onAddPress}
                >
              <Text style={styles.buttonTitle}>Favorite</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.servicesPostButton}
                    onPress={onUnfavoritePress}
                >
              <Text style={styles.buttonTitle}>Unfavorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function promptOutOfHours(fromTime, toTime, contact){
  if(checkAvailable(fromTime, toTime, contact) == ""){
    return "Check back later during the allotted availability times for the provider's phone number!"
  } else {
    return "";
  }
}

function convertTo12Hour (time){
  if (time < 13 && time > 0){
    return (time).toString() + " A.M.";
  } else if (time > 12) {
    return (time-12).toString() + " P.M."
  } else {
    return "1 A.M."
  }
}

function checkAvailable (fromTime, toTime, tel) {
  let currentHour = new Date().getHours();;

  if(toTime < fromTime){
    toTime = toTime+24;
  }
  if(currentHour < fromTime) {
    currentHour = currentHour+24;
  }
  if (toTime == fromTime){
    return tel;
  } else if (currentHour > fromTime && currentHour < toTime) {
    return tel;
  } else {
    return "";
  }
}