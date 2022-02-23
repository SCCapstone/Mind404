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
import { TextInput } from "react-native-gesture-handler";

export default function ServicesScreen({ navigation }) {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState(''); 
  const [serviceFilter, setServiceFilter] = useState('');
  const [completeList, setCompleteList] = useState('');


  let landscaping = "Landscaping";
  let carDetailing = "Car Detailing";
  let housekeeping = "Housekeeping";
  let accounting = "Accounting";
  let techSupport = "Tech Support";
  let tutoring = "Tutoring";
  let contracting = "Contracting";
  let consulting = "Consulting";

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
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{paddingTop: 30, paddingBottom: 10 }}>
      <Text style={styles.explanation2}>Filter by service type:</Text>
        <View style={{height: 60}}>
          <ScrollView persistentScrollbar={true} horizontal={true}>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(landscaping)}>
              <Text style={styles.buttonTitle}> {landscaping} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(carDetailing)}>
              <Text style={styles.buttonTitle}> {carDetailing} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(housekeeping)}>
              <Text style={styles.buttonTitle}> {housekeeping} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(accounting)}>
              <Text style={styles.buttonTitle}> {accounting} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(techSupport)}>
              <Text style={styles.buttonTitle}> {techSupport} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(tutoring)}>
              <Text style={styles.buttonTitle}> {tutoring} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(contracting)}>
              <Text style={styles.buttonTitle}> {contracting} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceTypeButton}
            onPress={() => setFilter(consulting)}>
              <Text style={styles.buttonTitle}> {consulting} </Text>
            </TouchableOpacity>
          </ScrollView>
          
        </View>
        <View style={{flexDirection: 'row', height: 38, paddingTop: 5}}>
          <Text style={styles.explanation}>Activated filter type: </Text>
          <Text style={styles.selectedOption}>{serviceFilter}</Text>
        </View>
        <TouchableOpacity onPress={() => resetFilter()}>
            <Text style={{textAlign: 'center', color: 'red', paddingTop: 6}} >Clear Filter</Text>
          </TouchableOpacity>
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
