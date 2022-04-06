import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import Ratings from "../../../../components/Ratings";

export default function ServiceDetailsScreen({ route, navigation }) {
  const [providerData, setProviderData] = useState(Object);
  const [reviews, setReviews] = useState(Array);
  const { item, shouldRefresh } = route.params;

  const { user } = useUser();
  var docRef = firebase
    .firestore()
    .collection("users/" + user.id + "/ClientFavorites");

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(item.providerId)
      .onSnapshot((querySnapshot) => {
        setProviderData(querySnapshot.data());
      });
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      firebase
        .firestore()
        .collection("users")
        .doc(item.providerId)
        .onSnapshot((querySnapshot) => {
          setProviderData(querySnapshot.data());
        });
    }
  }, [shouldRefresh]);

  const contactTel = () => {
    if (checkAvailable(item.fromTime, item.toTime, item.contact) != "") {
      Linking.openURL(`tel:${item.contact}`);
    } else {
      return;
    }
  };
  const checkForName = (companyName) => {
    if (companyName) {
      return companyName;
    } else {
      return;
    }
  };
  const onAddPress = () => {
    docRef
      .doc(item.id)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          firebase
            .firestore()
            .collection("users/" + user.id + "/ClientFavorites")
            .doc(item.id)
            .set(item)
            .then(() => {
              Alert.alert("Service has been favorited!");
              navigation.navigate("Client Home");
            });
        } else {
          Alert.alert("Service is already favorited.");
        }
      });
  };
  const onUnfavoritePress = () => {
    docRef
      .doc(item.id)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          docRef.doc(item.id).delete();
          /* setlistData( listData => {
          return listData.filter(Aservice => Aservice.id != item.id);
        }); */
          Alert.alert("Service has been unfavorited.");
          navigation.navigate("Client Home");
        } else {
          Alert.alert("Service was not previously favorited.");
        }
      });
  };
  if (!providerData.firstName) {
    return null;
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
          <Text style={{ fontSize: 15, color: "grey", marginBottom: 20 }}>
            Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} -{" "}
            {`${convertTo12Hour(item.toTime)}`}
          </Text>
        </View>
        <View style={styles.locationNumberContainer}>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.company}>{checkForName(item.CompanyName)}</Text>
        </View>
        <View>
          <Text style={styles.phoneNumber} onPress={() => contactTel()}>
            {`${checkAvailable(item.fromTime, item.toTime, item.contact)}`}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "grey",
              marginStart: 20,
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.titleText}>Reviews</Text>
              <Ratings
                reviews={providerData.reviews ? providerData.reviews : []}
              />
            </View>
            <View style={styles.marginTop10}>
              {providerData.reviews && providerData.reviews.length == 0 && (
                <Text>This Service Provider has no reviews yet.</Text>
              )}
              {providerData.reviews &&
                providerData.reviews.length > 0 &&
                providerData.reviews.map((item, index) => {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#000",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                      }}
                      key={index}
                    >
                      <Text>{`${item.firstName} ${item.lastName}`}</Text>
                      <Text>{item.description}</Text>
                      <Text>{item.rating}/5.0</Text>
                    </View>
                  );
                })}
              <Pressable
                onPress={() =>
                  navigation.navigate("Post Your Review", {
                    providerData,
                    item,
                  })
                }
                style={{
                  backgroundColor: "#FFAC1C",
                  marginEnd: 20,
                  width: 90,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.buttonTitle}>Add Review</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.profileDescriptionWrapper}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFAC1C",
                  marginEnd: 20,
                  width: 90,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={onAddPress}
              >
                <Text style={styles.buttonTitle}>Favorite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFAC1C",
                  width: 90,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={onUnfavoritePress}
              >
                <Text style={styles.buttonTitle}>Unfavorite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

function promptOutOfHours(fromTime, toTime, contact) {
  if (checkAvailable(fromTime, toTime, contact) == "") {
    return "Check back later during the allotted availability times for the provider's phone number!";
  } else {
    return "";
  }
}

function convertTo12Hour(time) {
  if (time < 12 && time > 0) {
    return time.toString() + " A.M.";
  } else if (time > 12) {
    return (time - 12).toString() + " P.M.";
  } else if (time == 12) {
    return "12 P.M.";
  } else {
    return "12 A.M.";
  }
}

function checkAvailable(fromTime, toTime, tel) {
  let currentHour = new Date().getHours();

  if (toTime < fromTime) {
    toTime = toTime + 24;
  }
  if (currentHour < fromTime) {
    currentHour = currentHour + 24;
  }
  if (toTime == fromTime) {
    return tel;
  } else if (currentHour > fromTime && currentHour < toTime) {
    return tel;
  } else {
    return "";
  }
}
