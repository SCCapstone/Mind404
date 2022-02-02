import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import styles from "../../../../components/styles";
import { Agenda } from "react-native-calendars";

export default function ProvCalendarScreen() {
  
  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <Agenda
        items= {{
          '2022-01-02': [{name: 'item 1 - any object'}],
        }}
        loadItemsForMonth={month => {
          console.log('trigger items loading');
        }}
        selected={new Date()}
        minDate={'2022-01-01'}
        pastScrollRange={50}
        futureScrollRange={20}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return <View />;
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return <View />;
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify how agenda knob should look like
        renderKnob={() => {
          return <View />;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        markedDates={{
          '2021-05-16': {selected: true, marked: true},
          '2021-05-17': {marked: true},
          '2021-05-18': {disabled: true}
        }}
        hideKnob={true}
        showClosingKnob={false}
        disabledByDefault={true}
        // Agenda theme
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue'
        }}
        // Agenda container style
        style={{}}/>
    </ImageBackground>
  );
}