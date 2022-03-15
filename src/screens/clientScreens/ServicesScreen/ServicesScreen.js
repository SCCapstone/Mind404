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
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Line } from "react-native-svg";

export default function ServicesScreen({ navigation }) {
  //displayed List in services
  const [listData, setListData] = useState([]);
  //Maintains full list at all times
  const [completeList, setCompleteList] = useState([]);
  //intermediate list to handle filters
  const [tempList, setTempList] = useState([]);
  //placeholder for service Type box (to maintain actual selection on filter close)
  const [placeHolder, setPlaceHolder] = useState('All')

  const services = ["All", "Landscaping", "Car Detailing", "Housekeeping", "Accounting", "Tech Support", "Tutoring", "Contracting","Consulting"]

  const LineSeparator = () => {
    return (
      <View
          style={{
            borderBottomColor: '#949494',
            borderBottomWidth: 2,
            marginBottom: 15,
          }}
        />
    );
  };

  const loadListData = () => {
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
          setCompleteList(temp);
          setListData(temp);
          setTempList(temp);
        });
      });
  }

  useEffect(() => {
    loadListData();
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
    setTempList(completeList);
    setPlaceHolder('All');
  }

  const setServiceFilter = (service) => {
    setListData(completeList);
    setListData( listData => {
      return listData.filter(item => item.serviceType == service);
    });
  }

  const setOverallFilter = () => {
    setServiceFilter(service)
  }

  return (
    <ImageBackground
      source={require("../../../../images/grey_background.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Text style={{
        color: "#FFAC1C", 
        paddingTop: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        fontSize: 33,
        textShadowColor: "black",
        textShadowRadius: 8,
      }}
      >
        Services
      </Text>
      <View style={{paddingBottom: 10 }}>
        <Collapse>
          <CollapseHeader>
              <View style={{height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{backgroundColorfontSize: 18, fontWeight: 'bold', fontStyle: 'italic', marginEnd: 3, color: '#1C6FFF'}}>
                  Filter
                </Text>
                <AntDesign name="down" color='#1C6FFF' size={15} />
              </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={{backgroundColor: '#9CC0FF'}}>
              <LineSeparator/>
              <View style={{marginBottom: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 18,fontWeight: 'bold', color: "black", padding: 6, marginStart: 20,}}>
                  Service type: 
                </Text>
                <SelectDropdown
                  data = {services}
                  onSelect={(selectedItem, index) => {
                    setPlaceHolder(selectedItem)
                    if(selectedItem == 'All'){
                      resetFilter();
                    } else {
                      setServiceFilter(selectedItem);
                    }
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return placeHolder;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                  buttonStyle={{backgroundColor: '#FFAC1C', borderRadius: 2, height: 30, width: 160}}
                  buttonTextStyle={{fontWeight: 'bold', color: 'white'}}
                  defaultButtonText={placeHolder}
                />
              </View>
              <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity style={{borderRadius: 6, backgroundColor: '#FFAC1C', width: 130, height: 22}} onPress={() => resetFilter()}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <AntDesign name="close" color='white' size={15} />
                      <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white'}} >Clear All Filters</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
        
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
            ListEmptyComponent={()=> <Text style={styles.noEvent}>No services are available with the applied filters.</Text>}
          />
        </View>
    </ImageBackground>
  );
}