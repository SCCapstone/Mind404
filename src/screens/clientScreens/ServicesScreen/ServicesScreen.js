import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  SafeAreaView
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import ServiceListing from "../../../../components/ServiceListing";
import SelectDropdown from "react-native-select-dropdown";

export default function ServicesScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [serviceFilter, setServiceFilter] = useState('None');
  const [completeList, setCompleteList] = useState('');

  const services = ["All", "Landscaping", "Car Detailing", "Housekeeping", "Accounting", "Tech Support", "Tutoring", "Contracting","Consulting"]

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
          setCompleteList(temp);
          setServiceFilter('');
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

  const resetFilter = () => {
    setListData(completeList);
    setServiceFilter('');
  }

  const setFilter = (service) => {
    setServiceFilter(service);
    setListData(completeList);
    setListData( listData => {
      return listData.filter(item => item.serviceType == service);
    });
  }

  return (
    <ImageBackground
      source={require("../../../../images/grey_background.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{paddingTop: 30, paddingBottom: 10 }}>
 
        <View style={{marginTop: 25, height: 50, flexDirection: 'row', height: 50, justifyContent: 'center'}}>
          <Text style={styles.explanation2}>Service type:</Text>
          <SelectDropdown
            data = {services}
            onSelect={(selectedItem, index) => {
              if(selectedItem == 'All'){
                resetFilter();
              } else {
                setFilter(selectedItem);
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            buttonStyle={{backgroundColor: '#89CFF0', borderRadius: 2, height: 30, width: 140}}
            buttonTextStyle={{fontWeight: 'bold'}}
            defaultValue="All"
          />

        </View>
        
        <View
          style={{
            borderBottomColor: '#949494',
            borderBottomWidth: 2,
          }}
        />
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

{/* <TouchableOpacity style={{borderRadius: 2, backgroundColor: '#FF4F4B', width: 80, height: 25}} onPress={() => resetFilter()}>
              <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white', padding: 3}} >Clear Filter</Text>
          </TouchableOpacity> */}