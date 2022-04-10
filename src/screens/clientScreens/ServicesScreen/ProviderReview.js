import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import RNPickerSelect from "react-native-picker-select";

const ProviderReview = ({ route, navigation }) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const { providerData, item } = route.params;
  const { user } = useUser();

  const getRoundedRate = (rate) =>{
    let rating = 0;
    providerData.reviews.forEach((element) => {
      rating = Number(element.rating) + rating;
    })
    rating = rating + rate;
    let average = rating / (providerData.reviews.length+1);
    let roundedRating = Math.round(parseFloat(average) * 2) / 2;
    return roundedRating;
  }

  const addReview = async () => {
    if(rating == 0){
      alert("Please enter a rating")
      return;
    }
    if(description=='') {
      alert("Please enter a description")
      return;
    }
    try {
      const usersRef = firebase.firestore().collection("users");
      await usersRef.doc(providerData.id).update({
        reviews: [
          ...providerData.reviews,
          {
            description,
            rating,
            lastName: user.lastName,
            firstName: user.firstName,
          },
        ],
      });
      let roundedRate = getRoundedRate(rating);
      await usersRef.doc(providerData.id).set({
        avgRating: roundedRate
      }, { merge: true });
    } catch (e) {
      console.log(e);
    }
    navigation.navigate("Service Details", {
      shouldRefresh: true,
      item: item,
    });
  };
  
  return (
    <View style={{ padding: 30 }}>
      <View
        style={{
          marginVertical: 30,
          borderBottomWidth: 1,
          borderStyle: "solid",
        }}
      >
        <RNPickerSelect
          placeholder={{ label: "Select Rating", value: null }}
          onValueChange={setRating}
          value={rating}
          style={{
            inputAndroid: {
              color: rating < 4 ? "red" : "green",
            },
          }}
          items={[
            { label: "1", value: 1 },
            { label: "1.5", value: 1.5 },
            { label: "2", value: 2 },
            { label: "2.5", value: 2.5 },
            { label: "3", value: 3 },
            { label: "3.5", value: 3.5 },
            { label: "4", value: 4 },
            { label: "4.5", value: 4.5 },
            { label: "5", value: 5 },
          ]}
        />
      </View>
      <View style={{ borderBottomWidth: 1, borderStyle: "solid" }}>
        <TextInput
          placeholder="Description"
          style={styles.reviewDescription}
          value={description}
          onChangeText={setDescription}
          maxLength={325}
          multiline
        />
      </View>
      <Button title="Post Review" onPress={addReview}/>
    </View>
  );
};
export default ProviderReview;
