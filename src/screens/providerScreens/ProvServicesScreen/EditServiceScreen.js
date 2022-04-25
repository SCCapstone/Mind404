import React, { useState, useEffect } from "react";
import {
    View,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SelectDropdown from "react-native-select-dropdown";
import useUser from "../../../../useUser";

export default function EditServiceScreen({ route, navigation }) {
    const { user } = useUser();
    const {item} = route.params;
    const [description, setDecription] = useState(item.description)
    const [company, setCompany] = useState(checkForName(item.CompanyName))
    const [email, setEmail] = useState(item.email)
    const [fTime, setFromTime] = useState(getTime(item.fromTime))
    const [tTime, setToTime] = useState(getTime(item.toTime))
    const [number, setNumber] = useState(item.contact)
    const [fromAMPM, setFromAMPM] = useState(getAMPM(item.fromTime));
    const [toAMPM, setToAMPM] = useState(getAMPM(item.toTime));

    const ampm = [
        "A.M.",
        "P.M."
    ]

    const numbers = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
    ]
    //updating services in user favorites
    const updateFavorites = (data, id) => {
        firebase
        .firestore()
        .collection("users")
        .get()
        .then((users) =>
            users.forEach((userT) =>
            userT.ref.collection("ClientFavorites")
            .get()
            .then((doc) => {
                doc.forEach((documentSnapshot) => {
                if (documentSnapshot.id == id){
                    firebase
                        .firestore()
                        .collection("users/"+userT.id+"/ClientFavorites")
                        .doc(id)
                        .set({
                            contact: data.contact,
                            email: data.email,
                            description: data.description,
                            location: data.location,
                            serviceType: data.serviceType,
                            CompanyName: data.CompanyName,
                            fromTime: data.fromTime,
                            toTime: data.toTime,
                            providerId: data.providerId,
                        }), {merge: true}
                }
                });
            })
            )
        )
    }
    //updating service in all collections
    const updateService = () => {
        /**Checks to see if phone number is a valid entry */
        if (!validPhoneCheck(number)) {
            alert("Please enter a valid phone number.");
            return;
        }
        if(!validEmail(email)){
            alert("Please enter a valid email address.");
            return;
        }
        /**Checks to see if the description field is empty */
        if (description == "") {
            alert("Please enter a description detailing your service.");
            return;
        }
        
        let fromTime = fTime;
        let toTime = tTime;
        if(fromAMPM == 'P.M.'){
        if(fTime != 12){
            fromTime = fromTime + 12
        }
        }
        if(toAMPM == 'P.M.'){
        if(tTime != 12){
            toTime = toTime + 12
        }
        }
        if(fTime == 12 && fromAMPM == 'A.M.'){
        fromTime = 0;
        }
        if(tTime == 12 && tTime == 'A.M.'){
        toTime = 0;
        }
        let avgRating = 0;
        let location = item.location;
        let serviceType = item.serviceType;
        let contact = number;
        let CompanyName = checkForName(company);
        if(user.avgRating){
            avgRating = user.avgRating;
        } 
        const data = {
            contact,
            email,
            description,
            location,
            serviceType,
            CompanyName,
            fromTime,
            toTime,
            providerId: user.id,
            avgRating,
        };
        firebase
            .firestore()
            .collection("services")
            .doc(item.id)
            .set(data)
            .then(() => {
                updateFavorites(data, item.id)
                alert("Your service has been successfully updated!");
                navigation.goBack()
            });
    };

    return (
        <ImageBackground
        source={require("../../../../assets/GrubberBackground.png")}
        resizeMode="cover"
          style={styles.backgroundImage}
        >
            <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%", padding: 25 }}
            keyboardShouldPersistTaps="handled"
            >
                <View style={{padding: 8, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly'}}>
                    <Text style={styles.serviceTitle}>{item.serviceType}</Text>
                    <Text style={styles.locationText}>{item.location}</Text>
                </View>
                <View>
                    <Text style={styles.editingInputText}>Company Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Company Name"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={setCompany}
                        value={company}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        multiline
                        numberOfLines={1}
                        maxLength={50}
                    />
                    <Text style={styles.editingInputText}>Description:</Text>
                    <TextInput
                        style={styles.multilineInput}
                        placeholder="Service Description"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={setDecription}
                        value={description}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        multiline
                        numberOfLines={1}
                        maxLength={325}
                    />
                    <Text style={styles.editingInputText}>Contact Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contact E-mail"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={setEmail}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        multiline
                        numberOfLines={1}
                        maxLength={45}
                    />
                    <Text style={styles.editingInputText}>Contact Number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Telephone Number (XXX-XXX-XXXX)"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={setNumber}
                        value={number}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                        multiline
                        numberOfLines={1}
                        maxLength={12}
                    />
                    <Text style={styles.editingInputText}>Telephone Avaliability:</Text>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                        marginTop: 8
                    }}>
                    <Text style={styles.timeExplanation}>FROM:</Text>
                    <SelectDropdown
                        data={numbers}
                        onSelect={(selectedItem,index) => {
                        setFromTime(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                        rowTextForSelection={(item, index) => { return item; }}
                        buttonStyle={{
                        backgroundColor: "white",
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 2,
                        height: 30,
                        width: 50,
                        }}
                        buttonTextStyle={{ fontSize: 12, color: "black" }}
                        defaultButtonText={fTime}
                    />
                    <SelectDropdown
                        data={ampm}
                        onSelect={(selectedItem, index) => {
                        setFromAMPM(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                        rowTextForSelection={(item, index) => { return item; }}
                        buttonStyle={{
                        backgroundColor: "white",
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 2,
                        height: 30,
                        width: 60,
                        }}
                        buttonTextStyle={{ fontSize: 12, color: "black" }}
                        defaultButtonText={fromAMPM}
                    />
                    <Text style={styles.timeExplanation}>TO:</Text>
                    <SelectDropdown
                        data={numbers}
                        onSelect={(selectedItem,index) => {
                        setToTime(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                        rowTextForSelection={(item, index) => { return item; }}
                        buttonStyle={{
                        backgroundColor: "white",
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 2,
                        height: 30,
                        width: 50,
                        }}
                        buttonTextStyle={{ fontSize: 12, color: "black" }}
                        defaultButtonText={tTime}
                    />
                    <SelectDropdown
                        data={ampm}
                        onSelect={(selectedItem, index) => {
                        setToAMPM(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                        rowTextForSelection={(item, index) => { return item; }}
                        buttonStyle={{
                        backgroundColor: "white",
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 2,
                        height: 30,
                        width: 60,
                        }}
                        buttonTextStyle={{ fontSize: 12, color: "black" }}
                        defaultButtonText={toAMPM}
                    />
                    </View>
                    <TouchableOpacity
                        style={styles.postService}
                        onPress={updateService}
                    >
                        <Text style={styles.buttonTitle}>Update Service</Text>
                    </TouchableOpacity>
                </View>
            <View style={{height: 50}}></View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
}

function validPhoneCheck(phoneNumber) {
  
    if(/^(1?\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{4})$/.test(phoneNumber)){
        return true;
    }else if(/^(1?\s?\({1}[0-9]{3}\){1}\s?[0-9]{3}\-?\s?[0-9]{4})$/.test(phoneNumber)){
        return true;
    }else if(/^(1?\s?[0-9]{3}\-?\s?[0-9]{3}\-?\s?[0-9]{4})$/.test(phoneNumber)){
        return true;
    }
    else {
        return false;
    }
}

function validEmail(email){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email)){
    return true;
    } else {
    return false;
    }
}


function checkForName (companyName) {
    if (companyName) {
      return companyName;
    } else {
      return "";
    }
};

function getAMPM(time) {
    if(time > 11) {
        return("P.M.")
    }
    return("A.M.")
}

function getTime(time){
    if(time < 12 && time != 0){
        return time;
    } else if (time > 12){
        return time-12;
    } else if (time == 12){
        return 12;
    } else {
        return 12;
    }
}