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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ServicesScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const { user } = useUser(); 

  var docRef = firebase.firestore().collection("users/"+user.id+"/ClientFavorites");

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("users/"+user.id+"/ClientFavorites")
      .onSnapshot((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
          setListData(temp);
        });
      });
  }, [navigation]);

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
        }}
      />
    );
  };

  const onRefresh = () => {
    if(listData[0]){
      docRef.doc(listData[0].id).get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          setListData([])
        }
      }); 
    }
  }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Text style={{
        color: "#FFAC1C", 
        paddingTop: 30, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 30,
        textShadowColor: "black",
        textShadowRadius: 1,
      }}
      >
        Favorited Services
      </Text>
      <TouchableOpacity
        style={styles.refresh2}
        onPress={() => onRefresh()}
      >
        <MaterialCommunityIcons name="refresh" style={{fontSize: 20,color: '#788eec', fontWeight: 'bold'}}/>
        <Text style={{fontSize: 15, color: '#788eec'}}> Refresh List</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={listData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ServiceListing item={item} />}
          ListEmptyComponent={()=> <Text style={styles.noEvent}>No services currently favorited.</Text>}
        />
      </View>
    </ImageBackground>
  );
}