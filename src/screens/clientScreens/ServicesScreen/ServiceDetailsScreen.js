import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
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
  const { item, shouldRefresh } = route.params;
  const [reviewed, setReviewed] = useState(false);

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

  const checkMatch = (id) => {
    if(user.id == id){
      return "Click to Edit"
    }
  }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
        <View style={styles.sContainer}>
          <Text style={styles.title}>{item.serviceType}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={{ fontSize: 15, color: "grey", marginBottom: 20 }}>
            Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} -{" "}
            {`${convertTo12Hour(item.toTime)}`}
          </Text>
        </View>
        <View style={{} }>
          <Text style={styles.company}>{checkForName(item.CompanyName)}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
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
                rating={providerData.avgRating}
              />
            </View>
            <View style={styles.marginTop10}>
              {providerData.reviews && providerData.reviews.length == 0 && (
                <Text>This Service Provider has no reviews yet.</Text>
              )}
              {providerData.reviews &&
                providerData.reviews.length > 0 &&
                providerData.reviews.map((review, index) => {
                  if(reviewed == false && review.id == user.id) {
                    setReviewed(true);
                  }
                  return (
                    <Pressable
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#000",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                      }}
                      key={index}
                      onPress={() => {
                        if (review.id === user.id) {
                          navigation.navigate("Post Your Review", {
                            providerData,
                            service: item,
                            review,
                          });
                        }
                      }}
                    >
                      <Text>{`${review.firstName} ${review.lastName}`}</Text>
                      <Text>{review.description}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text>{review.rating}/5.0</Text>
                        <Text style={{fontSize: 15, color: '#788eec'}}>{checkMatch(review.id)}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              <Pressable
                onPress={() => {
                  if(!reviewed) {
                    navigation.navigate("Post Your Review", {
                      providerData,
                      service: item,
                      review: {description: "", rating: "", id: "", firstName: "", lastName: ""},
                    })
                  } else {
                    alert("You have already reviewed this provider.  You may edit your posted review, but can not post another.")
                  }
              }}
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
