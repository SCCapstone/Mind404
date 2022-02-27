import { StatusBar } from "expo-status-bar";
import React, { useContext, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import styles from "./../../../../components/styles";
import Button from "./../../../../components/Button.js";
import MapView from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";

export default function ProvHomeScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState('');
  const [eventDate, setEventDate] = useState(getDateString());
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();
  const [dayData, setDayData] = useState([]);

  React.useEffect(() => {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(displayDate(month,day,year));
    setEventDate(getDateString());
  }, []);
  
  const onSettingsCogPress = () => {
    navigation.navigate("Prov Settings");
  };
  const onAddPress = () => {
    navigation.navigate("Services")
  }
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("users/"+user.id+"/events")
      .onSnapshot((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let eventDetails = {};
          eventDetails = documentSnapshot.data();
          eventDetails["id"] = documentSnapshot.id;
          temp.push(eventDetails);
          setListData(temp);
        });
      });
      eventsToday(eventDate);
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

  const eventsToday = (dateString) => {
    let temp = listData;
    temp = temp.filter(function(item){
      return item.date == eventDate;
    }).map(function({description, subject, id}){
      return {description, subject, id}
    });
    setDayData(temp);
  }

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
      <Text style = {styles.headerDate}>{currentDate}</Text>
      <Text style={styles.headerWelcome}>Welcome {user.firstName}!</Text>
      <TouchableOpacity
        style={{paddingStart: 20}}
        onPress={() => onAddPress()}
      >
        <Text style={{padding: 7, fontSize: 15, color: '#788eec',marginEnd: 0}}>+ Add a Service</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.refresh}
        onPress={() => eventsToday(eventDate)}
      >
        <MaterialCommunityIcons name="refresh" style={{fontSize: 20,color: '#788eec', fontWeight: 'bold'}}/>
        <Text style={{fontSize: 15, color: '#788eec'}}> Refresh Events</Text>
      </TouchableOpacity>
      
      <View style={styles.layout}>
      <FlatList
          data={dayData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={()=><Text style={styles.listTitle}>Today's Events</Text>}
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

              </View>
          )}
          ListEmptyComponent={()=> <Text style={styles.noEvent}>Woo hoo! No events today.</Text>}
      />
      </View>
    </ImageBackground>
  );
}

function getDateString(){
  var temp = new Date();
  var monthNum = temp.getMonth()+1;
  if (monthNum < 10){
    return temp.getFullYear() + '-' + '0'+ monthNum + '-' + temp.getDate();
  } else {
    return temp.getFullYear() + '-' + monthNum + '-' + temp.getDate();
  }
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
