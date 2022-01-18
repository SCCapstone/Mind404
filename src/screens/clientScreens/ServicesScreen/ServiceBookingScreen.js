import React, { useState } from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { NavigationContainer } from "@react-navigation/native";
import useUser from "../../../../useUser";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ServiceBookingScreen({route, navigation}) {
  const { item } = route.params;
  const { user } = useUser();
  const [date, setDate] = useState('');

  

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <CalendarList
          onDayPress={ day => {
            setDate(day.dateString);
            console.log('selected day', date);
          }} 
          minDate={new Date()}
          maxDate='2022-12-31' 
          pastScrollRange={0} 
          futureScrollRange={12}
          scrollEnabled={true}
          showScrollIndicator={true}
          pagingEnabled={true} 
          horizontal={true}/>
          <Text>{date.dateString}</Text>
        </View>
        
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}
