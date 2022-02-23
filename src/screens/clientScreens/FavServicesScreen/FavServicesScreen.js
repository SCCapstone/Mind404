import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import ServiceListing from "../../../../components/ServiceListing";
import { TextInput } from "react-native-gesture-handler";
import useUser from "../../../../useUser";

export default function ServicesScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState(''); 

  const { user } = useUser(); 

  useEffect(() => {
    firebase
      .firestore()
      .collection("users/"+user.id+"/ClientFavorites")
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
          setListData(temp);
          setSearch(temp);
        });
      });
  }, []);
  
  const searchFilter = (text) => {
    if (text) {
      const newData = listData.filter((item) => {
        const itemData = item.title ?
        item.title.toUpperCase()
        : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearch(newData);
      setSearch(text);
    }
    else {
      setFilteredData(listData);
      setSearch(text);
    }
  }

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

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
            <TextInput
            style={styles.searchInput}
            placeholder="Search Listings"
            value={search}
            placeholderTextColor="#aaaaaa"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(text) => searchFilter(text)}

          />

      <View style={{ flex: 1, paddingTop: 20 }}>

        <FlatList
          data={listData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ServiceListing item={item} />}
        />
      </View>
    </ImageBackground>
  );
}