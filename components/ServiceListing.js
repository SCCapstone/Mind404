import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import Ratings from "./Ratings";

const ServiceListing = ({ item }) => {
  const [reviews, setReviews] = useState(Array);
  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = () => {
    // firebase.firestore
    //   .collection("reviews")
    //   .doc(item.providerId)
    //   .get()
    //   .then((querySnapshot) => {});
    setReviews([
      { rating: 3.5, review: "This is a review." },
      { rating: 3.5, review: "This is a review." },
    ]);
  };
  const navigation = useNavigation();
  const detailsPage = () => {
    navigation.navigate("Service Details", { item });
  };
  return (
    <TouchableOpacity onPress={() => detailsPage()}>
      <View
        style={{
          backgroundColor: "#e9e9e9",
          padding: 20,
          borderRadius: 12,
          marginBottom: 3,
          marginTop: 3,
          marginStart: 6,
          marginEnd: 6,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              {item.serviceType}
            </Text>
          </View>
          <View>
            <Ratings reviews={reviews} size={20} />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: "#808080" }}>
              {item.location}
            </Text>
            <Text style={{ fontSize: 12, color: "#808080" }}>{item.email}</Text>
          </View>
          <View>
            <Text
              style={styles.phoneNumber}
              onPress={() => Linking.openURL(`tel:${item.contact}`)}
            >
              {`${checkAvailable(item.fromTime, item.toTime, item.contact)}`}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>{item.description}</Text>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>
          Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} -{" "}
          {`${convertTo12Hour(item.toTime)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceListing;

function convertTo12Hour(time) {
  if (time < 12 && time > 0) {
    return time.toString() + " A.M.";
  } else if (time > 12) {
    return (time - 12).toString() + " P.M.";
  } else if (time == 12){
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
