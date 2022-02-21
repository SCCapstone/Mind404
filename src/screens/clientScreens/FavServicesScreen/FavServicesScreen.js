import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import styles from "./../../../../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import DateTimePicker from '@react-native-community/datetimepicker'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ClientFavoritesScreen({ route, navigation }) {
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();
  const [FavData, setFavData] = useState([]);

  var docRef = firebase.firestore().collection("users/"+user.id+"/FavoriteServices");

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("users/"+user.id+"/FavoriteServices")
      .onSnapshot((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let FavoriteServicesDetails = {};
          FavoriteServicesDetails = documentSnapshot.data();
          FavoriteServicesDetails["id"] = documentSnapshot.id;
          temp.push(FavoriteServicesDetails);
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
          backgroundColor: "#808080",
        }}
      />
    );
  };
  const FavSelected = (subjectString) => {
    let temp = listData;
    temp = temp.filter(function(item){
      return item.subject == subjectString;
    }).map(function({subject, description, id}){
      return {subject, description, id}
    });
    setFavData(temp);
  }
  const onAddPress = () => {
    navigation.navigate("Add Fav Services");
  }

   const deleteFavorites = (id) => {
    console.log(id);
    docRef.doc(id).delete();
    setFavData( FavData => {
      return FavData.filter(item => item.id != id);
    });
  } 
  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text>ClientFavoritesScreen</Text>
      </View>
      <TouchableOpacity style={styles.TOContainer} onPress={onAddPress}>
        <MaterialCommunityIcons name="plus" style={{fontSize: 25,color: 'white', fontWeight: 'bold'}}/>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Add Favorited Service </Text>
      </TouchableOpacity>
      <FlatList
          data={FavData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={()=><Text>FavoriteServices</Text>}
          renderItem={({item}) => (
              <View style={styles.containerSide}>
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    width: '90%',
                  }}
                >
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.descriptionEvent}>{item.description}</Text>
                </View>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => deleteFavorites(item.id)}>
                  <MaterialCommunityIcons name="close" style={{fontSize: 25,color: 'red', fontWeight: 'bold'}}/>
                </TouchableOpacity>
              </View>
          )}
          
      />
    </ImageBackground>
  );
}