import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import styles from "../../../../components/styles";
import { Agenda, Calendar } from "react-native-calendars";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProvCalendarScreen({ navigation }) {
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();
  const [selectedDay, setSelectedDay] = useState(getDisplayDate(getToday()));
  const [dayData, setDayData] = useState([]);
  
  var docRef = firebase.firestore().collection("users/"+user.id+"/events");

  useEffect(() => {
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
        if(selectedDay == getDisplayDate(getToday())){
          daySelected(getToday(), temp);
        }
      });
  }, [navigation]);

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

  const daySelected = (dateString, list) => {
    let temp = list;
    temp = temp.filter(function(item){
      return item.date == dateString;
    }).map(function({description, subject, id}){
      return {description, subject, id}
    });
    setDayData(temp);
    setSelectedDay(getDisplayDate(dateString))
  }

  const onAddPress = () => {
    navigation.navigate("Add Event");
  }

  const deleteEvent = (id) => {
    console.log(id);
    docRef.doc(id).delete();
    setDayData( dayData => {
      return dayData.filter(item => item.id != id);
    });
  }

  return (
    <ImageBackground
    source={require("../../../../assets/GrubberBackground.png")}
    resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{padding: 20, marginTop: 20}}>
        <Calendar
          style={{
            borderWidth: 2,
            borderColor: 'orange',
            height: 370
          }}
          //markedDates={markedDate}
          minDate='2022-01-01'
          onDayPress={day => {
              daySelected(day.dateString, listData);
          }}
          >
        </Calendar>
      </View>
      <View style={styles.addEventView}>
        <TouchableOpacity style={styles.addEventButton} onPress={onAddPress}>
          <MaterialCommunityIcons name="plus" style={{fontSize: 25,color: 'white', fontWeight: 'bold', textAlign: 'center'}}/>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Add Event</Text>
        </TouchableOpacity>
      </View>
      <FlatList
          data={dayData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={()=><Text style={styles.dateTitle}>{selectedDay}</Text>}
          renderItem={({item}) => (
            <View style={{backgroundColor: "#e9e9e9",
            padding: 20,
            borderRadius: 12,
            borderColor: 'grey',
            borderWidth: 1, 
            marginBottom: 3,
            marginTop: 3,
            marginStart: 6,
            marginEnd: 6,
            elevation: 4,}}>
              <View
                style={{
                  padding: 0,
                  width: '90%',
                }}
              >
                <Text style={styles.subject}>{item.subject}</Text>
                <Text style={styles.descriptionEvent}>{item.description}</Text>
                <TouchableOpacity style={{marginEnd: 3, width: 60}} onPress={() => deleteEvent(item.id)}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 15,color: 'red'}}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={()=> <Text style={styles.noEvent}>Woo hoo! No events today.</Text>}
      />
    </ImageBackground>
  );
}

function getToday() {
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

function getDisplayDate(dayT){
  return dayT.slice(5)+'-'+dayT.slice(0,-6);
}