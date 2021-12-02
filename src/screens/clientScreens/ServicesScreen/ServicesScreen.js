import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";

export default function ServicesScreen({ navigation }) {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("services")
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
          setListData(temp);
        });
      });
  }, []);

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  let itemView = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              {item.serviceType}
            </Text>
          </View>
          <View>
            <Text
              style={{ color: "blue", textDecorationLine: "underline" }}
              onPress={() => Linking.openURL(`tel:${item.contact}`)}
            >
              {item.contact}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>{item.location}</Text>
        <View style={{ marginTop: 10 }}>
          <Text>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={listData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemView}
        />
      </View>
    </ImageBackground>
  );
}
