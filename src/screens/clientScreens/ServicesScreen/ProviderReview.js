import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ProviderReview = ({ route, navigation }) => {
  const { providerData, review, index } = route.params;
  const { user } = useUser();
  const [description, setDescription] = useState(review.description);
  const [rating, setRating] = useState(review.rating);

  const getRoundedRate = (rate) => {
    let rating = 0;
    providerData.reviews.forEach((element) => {
      rating = Number(element.rating) + rating;
    });
    rating = rating + rate;
    let average = rating / (providerData.reviews.length + 1);
    let roundedRating = Math.round(parseFloat(average) * 2) / 2;
    return roundedRating;
  };

  const getUpdatedRate = (oldRate, newRate) => {
    let rating = 0;
    providerData.reviews.forEach((element) => {
      rating = Number(element.rating) + rating;
    });
    rating = rating - oldRate + newRate;
    let average = rating / (providerData.reviews.length);
    let roundedRating = Math.round(parseFloat(average) * 2) / 2;
    return roundedRating;
  }

  const addReview = async () => {
    if (rating == 0) {
      alert("Please enter a rating");
      return;
    }
    if (description == "") {
      alert("Please enter a description");
      return;
    }
    try {
      // if user is adding a review
      if(review.id == ""){
        const usersRef = firebase.firestore().collection("users");
        await usersRef.doc(providerData.id).update({
          reviews: [
            ...providerData.reviews,
            {
              description,
              rating,
              lastName: user.lastName,
              firstName: user.firstName,
              id: user.id,
            },
          ],
        });
        let roundedRate = getRoundedRate(rating);
        await usersRef.doc(providerData.id).set(
          {
            avgRating: roundedRate,
          },
          { merge: true }
        );
      //if user is editing a review
      } else {
        const usersRef = firebase.firestore().collection("users");
        let temp = [];
        await usersRef.doc(providerData.id).get().then((doc) => {
          temp = doc.data().reviews;
        });
        const updatedReview = {
          description,
          rating,
          lastName: user.lastName,
          firstName: user.firstName,
          id: user.id,
        }
        for(let i = 0; i < temp.length; i++){
          if(temp[i].id == user.id){
            temp[i] = updatedReview;
            break
          }
        }
        await usersRef.doc(providerData.id).update({
          reviews: temp
        });
        let roundedRate = getUpdatedRate(review.rating, rating);
        await usersRef.doc(providerData.id).set(
          {
            avgRating: roundedRate,
          }, { merge: true }
        );
      }
    } catch (e) {
      console.log(e);
    }
   navigation.goBack()
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: "100%", padding: 25 }}
      keyboardShouldPersistTaps="handled"
    >
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
      <Button title="Post Review" onPress={addReview} />
    </KeyboardAwareScrollView>
  );
};
export default ProviderReview;
