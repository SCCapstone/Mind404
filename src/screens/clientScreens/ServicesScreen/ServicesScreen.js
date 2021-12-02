import React, { useState, useEffect } from 'react'
import { Text, View, ImageBackground, FlatList, TouchableOpacity } from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";

export default function ServicesScreen({ navigation }) {

  const [listData, setListData] = useState([])

  useEffect(() => {
    firebase
      .firestore()
      .collection('services')
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails['id'] = documentSnapshot.id;
          temp.push(serviceDetails);
          setListData(temp);
        });
      });
  }, []);

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }} />
    );
  };

  let itemView = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 20
        }}>
          <Text>Service: {item.serviceType}</Text>
          <Text>Location: {item.location}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Contact: {item.contact}</Text>
        </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View>
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
