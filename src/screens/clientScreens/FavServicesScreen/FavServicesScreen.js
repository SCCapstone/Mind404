import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import ServiceListing from "../../../../components/ServiceListing";
import useUser from "../../../../useUser";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ServicesScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const { user } = useUser(); 
  const [refreshing, setRefreshing] = useState(true);

  var docRef = firebase.firestore().collection("users");

  React.useEffect(() => {
    loadServices();
    onRefresh();
  }, [navigation]);

  //loading favorited services from firebase
  const loadServices = () => {
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
        if(querySnapshot.empty){
          setListData([])
        }
      });
      setRefreshing(false);
  }

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
    setListData([]);
    loadServices();
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
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatList
          data={listData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ServiceListing item={item} rate={false}/>}
          ListEmptyComponent={()=> <Text style={styles.noEvent}>No services currently favorited.</Text>}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </ImageBackground>
  );
}