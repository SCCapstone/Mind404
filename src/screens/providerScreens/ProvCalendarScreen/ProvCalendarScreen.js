import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import styles from "../../../../components/styles";
import { Agenda, Calendar } from "react-native-calendars";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function ProvCalendarScreen() {
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();
  const [selectedDay, setSelectedDay] = useState('No Date Selected');
  const [dayData, setDayData] = useState([]);

  
  React.useEffect(() => {
    firebase
      .firestore()
      .collection("users/"+user.id+"/events")
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let eventDetails = {};
          eventDetails = documentSnapshot.data();
          eventDetails["id"] = documentSnapshot.id;
          temp.push(eventDetails);
          setListData(temp);
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

  let itemView = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.descriptionEvent}>{item.description}</Text>
      </View>
    );
  };

  const daySelected = (dateString) => {
    let temp = listData;
    temp = temp.filter(function(item){
      return item.date == dateString;
    }).map(function({description, subject}){
      return {description, subject}
    });
    setSelectedDay(getDisplayDate(dateString))
    setDayData(temp);
  }
  
  // const markedDate = {
  //   selectedDay: {selected: true, marked: true, selectedColor: 'blue'}
  // }

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{padding: 7, marginTop: 20}}>
        <Calendar
          style={{
            borderWidth: 2,
            borderColor: 'orange',
            height: 370
          }}
          //markedDates={markedDate}
          minDate='2022-01-01'
          onDayPress={day => {
              daySelected(day.dateString);
          }}
          >
        </Calendar>
      </View>
      <TouchableOpacity style={styles.TOContainer}>
        <MaterialCommunityIcons name="plus" style={{fontSize: 25,color: 'white', fontWeight: 'bold'}}/>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Add Event </Text>
      </TouchableOpacity>
      <FlatList
          data={dayData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemView}
          ListHeaderComponent={()=><Text style={styles.dateTitle}>{selectedDay}</Text>}
      />
    </ImageBackground>
  );
}

function getToday() {
  let tts = new Date();
  let day = tts.getDate().toString();
  let monthNum = tts.getMonth()+1;
  let month = monthNum.toString();
  let year = tts.getFullYear().toString();
  if(day.length == 1){
    day = '0'+day;
  }
  if(month.length == 1){
    month = '0'+month;
  }
  return year+'-'+month+'-'+day;
}

function getDisplayDate(dayT){
  return dayT.slice(5)+'-'+dayT.slice(0,-6);
}