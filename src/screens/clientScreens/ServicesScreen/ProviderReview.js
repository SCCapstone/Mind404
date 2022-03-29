import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  Button,
  Linking,
  ScrollView,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import Ratings from "../../../../components/Ratings";
import { getDatabase, ref, set } from "firebase/database";
import RNPickerSelect from "react-native-picker-select";

const ProviderReview = ({ route, navigation }) => {
  const [description, setDescription] = useState();
  const [rating, setRating] = useState();
  const { providerData, item } = route.params;
  const { user } = useUser();
  const addReview = async () => {
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
    } catch (e) {
      console.log(e);
    }
    navigation.navigate("Service Details", {
      shouldRefresh: true,
      item: item,
    });
  };
  console.log(rating);
  console.log(typeof rating);
  return (
    <View style={{ padding: 30 }}>
      <View style={{ borderBottomWidth: 1, borderStyle: "solid" }}>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View
        style={{
          marginVertical: 30,
          borderBottomWidth: 1,
          borderStyle: "solid",
        }}
      >
        <RNPickerSelect
          placeholder={{ label: "select the rating", value: null }}
          onValueChange={setRating}
          value={rating}
          style={{
            inputAndroid: {
              color: rating < 4 ? "red" : "black",
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
      <Button title="Post Review" onPress={addReview} />
    </View>
  );
};
export default ProviderReview;
