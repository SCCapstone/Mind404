import React, { useState, useEffect} from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList
} from "react-native";
import styles from "./../../../../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";

export default function ProvHomeScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState('');
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();
  const [dayData, setDayData] = useState([]);

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  useEffect(() => {
    let day = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    setCurrentDate(displayDate(month,day,year));
    getEvents();
  }, []);
  
  const onSettingsCogPress = () => {
    navigation.navigate("Prov Settings");
  };
  const onAddPress = () => {
    navigation.navigate("Services")
  }

  const getEvents = () => {
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
        eventsToday(getDateString(), temp)
      });
  };

  const eventsToday = (dateString, list) => {
    const tempDate = dateString
    const temp = list.filter(
      (item) => item.date == dateString
    );
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
        onPress={() => getEvents()}
      >
        <MaterialCommunityIcons name="refresh" style={{fontSize: 20,color: '#788eec', fontWeight: 'bold'}}/>
        <Text style={{fontSize: 15, color: '#788eec'}}> Refresh Events</Text>
      </TouchableOpacity>
      
      <FlatList
          data={dayData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={()=><Text style={styles.listTitle}>Today's Events</Text>}
          renderItem={({item}) => (
            <View style={{
              backgroundColor: "#e9e9e9",
              padding: 10,
              borderRadius: 5,
              borderColor: 'grey',
              borderWidth: 1,
              marginBottom: 5,
              marginTop: 3,
              marginStart: 8,
              marginEnd: 8,
              elevation: 4,
            }}>
                <View
                  style={{
                    padding: 10,
                    width: '100%',
                  }}
                >
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.descriptionEvent}>{item.description}</Text>
                </View>

              </View>
          )}
          ListEmptyComponent={()=> <Text style={styles.noEvent}>Woo hoo! No events today.</Text>}
      />
    </ImageBackground>
  );
}

function getDateString(){
  var temp = new Date();
  var monthNum = temp.getMonth()+1;
  var ret = "";
  if (monthNum < 10){
    ret = temp.getFullYear() + '-' + '0'+ monthNum + '-';
  } else {
    ret = temp.getFullYear() + '-' + monthNum + '-';
  }
  if (temp.getDate() < 10){
    ret = ret + '0' + temp.getDate()
    return ret;
  } else {
    ret = ret + temp.getDate();
    return ret;
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
