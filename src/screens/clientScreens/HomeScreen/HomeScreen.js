import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./../../../../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import ServiceListing from "../../../../components/ServiceListing";

export const firestoreAutoId = () => {
  const CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let autoId = "";

  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }
  return autoId;
};

export default function HomeScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState('');
  const [randomService, setRandomService] = useState();
  const { user } = useUser();
  
  const onSettingsCogPress = () => {
    navigation.navigate("Settings");
  };

  React.useEffect(() => {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(displayDate(month,day,year));
  }, []);

  useEffect(() => {
    const servicesRef = firebase.firestore().collection("services");
    const query = async () => {
      let queryRef = await servicesRef
        .where("__name__", ">=", firestoreAutoId())
        .orderBy("__name__")
        .limit(1)
        .get();
      const newRandomService = [];
      queryRef.forEach((documentSnapshot) => {
        let serviceDetails = {};
        serviceDetails = documentSnapshot.data();
        serviceDetails["id"] = documentSnapshot.id;
        newRandomService.push(serviceDetails);
      });
      if (newRandomService.length === 0) {
        queryRef = await servicesRef
          .where("__name__", ">=", "")
          .orderBy("__name__")
          .limit(1)
          .get();
        queryRef.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          newRandomService.push(serviceDetails);
        });
      }
      setRandomService(newRandomService[0]);
    };
    query();
  }, []);

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => onSettingsCogPress()}
      >
        <MaterialCommunityIcons name="cog-outline" color="#000" size={30} />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            color: "#FFAC1C",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 33,
            textShadowColor: "black",
            textShadowRadius: 2,
            paddingBottom: 15,
          }}
        >
          Welcome {user.firstName}!
        </Text>
        <Text  style={{
            color: "#FFAC1C",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 33,
            textShadowColor: "black",
            textShadowRadius: 2,
            paddingBottom: 15,
          }}>
            {currentDate}
            </Text>
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            color: "black",
            fontWeight: "bold",
            paddingBottom: 5,
          }}
        >
          Recommended Service:
        </Text>
      </View>
      <View>{randomService && <ServiceListing item={randomService} rate={true}/>}</View>
    </ImageBackground>
  );
}
function displayDate(month, day, year){
  let monthName = "";
  switch(month){
    case 1:
      monthName="January";
      break;
    case 2:
      monthName="February";
      break;
    case 3:
      monthName="March";
      break;
    case 4:
      monthName="April";
      break;
    case 5:
      monthName="May";
      break;
    case 6:
      monthName="June";
      break;
    case 7:
      monthName="July";
      break;
    case 8:
      monthName="August";
      break;
    case 9:
      monthName="September";
      break;
    case 10:
      monthName="October";
      break;
    case 11:
      monthName="November";
      break;
    case 12:
      monthName="December";
      break;
  }
  return monthName + ' ' + day + ', ' + year;
}
