import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import DateTimePicker from '@react-native-community/datetimepicker'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddEvent({ navigation }) {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");

    const [dateAct, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const { user } = useUser(); 
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateAct;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    const showDatepicker = () => {
         showMode('date');
    };

    const onAddPress = () => {
        if (subject == "") {
            alert("Please enter a subject.");
            return;
        }
        let date = getDate(dateAct);
        const data= {
            subject,
            description,
            date
        }
        firebase
            .firestore()
            .collection("users/"+user.id+"/events")
            .add(data)
            .then(() => {
                alert("Your event has been successfully added. Please click on date to refresh events.");
                navigation.navigate("Prov Home");
            });
    }

    return (
        <ImageBackground
            source={require("../../../../assets/GrubberBackground.png")}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
            >
                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSubject(text)}
                    value={subject}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    maxLength={40}
                />
                <TextInput
                    style={styles.multilineInput}
                    placeholder="Description"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDescription(text)}
                    value={description}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    multiline
                    maxLength={325}
                />
                <View style={{flex: 1, padding: 30, alignContent: 'center'}}>
                    <Text style={styles.selectedDateOption}>{getDisplayDate(getDate(dateAct))}</Text>
                    <Button style={{alignItems: 'baseline'}} onPress={showDatepicker} title="Select Date For Event" />
                </View>
                {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateAct}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
                )}
                <TouchableOpacity
                    style={styles.servicesPostButton}
                    onPress={onAddPress}
                >
                    <Text style={styles.buttonTitle}>Add Event to Calendar</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </ImageBackground>
    );
}

function getDate(date) {
    let day = date.getDate().toString();
    let monthNum = date.getMonth()+1;
    let month = monthNum.toString();
    let year = date.getFullYear().toString();
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
