import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";
import { firebase } from "../src/firebase/config";

const Ratings = ({ rating, size = 30 }) => {
  if (rating == 0) {
    return (
      <View>
        <Text>No Reviews</Text>
      </View>
    );
  }

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    let Icon = (
      <MaterialCommunityIcons
        name="star-outline"
        key={`star-outline${i}`}
        color="#000"
        size={size}
      />
    );
    if (i <= rating) {
      Icon = (
        <MaterialCommunityIcons
          name="star"
          key={`star${i}`}
          color="#000"
          size={size}
        />
      );
    } else if (i - rating === 0.5) {
      Icon = (
        <MaterialCommunityIcons
          name="star-half-full"
          key={`star-half-full${i}`}
          color="#000"
          size={size}
        />
      );
    }
    stars.push(Icon);
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};
export default Ratings;
