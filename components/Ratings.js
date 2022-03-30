import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { firebase } from "../src/firebase/config";


const Ratings = ({ reviews, size = 30 }) => {
  let rating = 0;
  reviews.forEach((element) => {
    rating = Number(element.rating) + rating;
  });
  const average = rating / reviews.length;
  const roundedRating = Math.round(parseFloat(average) * 2) / 2;

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    let Icon = (
      <MaterialCommunityIcons name="star-outline" color="#000" size={size} />
    );
    if (i <= roundedRating) {
      Icon = <MaterialCommunityIcons name="star" color="#000" size={size} />;
    } else if (i - roundedRating === 0.5) {
      Icon = (
        <MaterialCommunityIcons
          name="star-half-full"
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
