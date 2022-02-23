import { StatusBar } from "expo-status-bar";
import React, { useContext, useState,FlatList } from "react";
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
} from "react-native";
import styles from "./../../../../components/styles";
import Button from "./../../../../components/Button.js";
import MapView from "react-native-maps";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";

export default function ProvHomeScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState('');
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();
  const [selectedDay, setSelectedDay] = useState('No Date Selected');
  const [dayData, setDayData] = useState([]);

  React.useEffect(() => {
    var day = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setCurrentDate(
      year + '-' + month + '-' + day
    );
  }, []);
  
  const onSettingsCogPress = () => {
    navigation.navigate("Prov Settings");
  };
  const onAddPress = () => {
    navigation.navigate("Prov Services")
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
  const daySelected = (dateString) => {
    let temp = listData;
    temp = temp.filter(function(item){
      return item.date == currentDate;
    }).map(function({description, subject, id}){
      return {description, subject, id}
    });
    setSelectedDay(getDisplayDate(dateString))
    setDayData(temp);
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
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => onSettingsCogPress()}
      >
        <MaterialCommunityIcons name="cog-outline" color="#000" size={30} />
      </TouchableOpacity>
      <View style={styles.layout}>
        <Text style={styles.welcome}>Welcome {user.firstName}!</Text>
        <Text style = {styles.welcome}>{currentDate}</Text>
      <TouchableOpacity
        style={styles.servicesPostButton}
        onPress={() => onAddPress()}
      >
        <Text style={styles.buttonTitle}>Let's Add a Service!</Text>
      </TouchableOpacity>
      {/* <FlatList
          data={dayData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={()=><Text style={styles.dateTitle}>{selectedDay}</Text>}
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
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => deleteEvent(item.id)}>
                  <MaterialCommunityIcons name="close" style={{fontSize: 25,color: 'red', fontWeight: 'bold'}}/>
                </TouchableOpacity>
              </View>
          )}
          ListEmptyComponent={()=> <Text style={styles.noEvent}>Woo hoo! No events today.</Text>}
      /> */}
      </View>
    </ImageBackground>
  );
}
