import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import styles from "../../../../components/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../../firebase/config";
import useUser from "../../../../useUser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddFavservices({ navigation }) {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    
    const { user } = useUser(); 

    const onAddPress = () => {
        if (subject == "") {
            alert("Please enter a subject.");
            return;
        }
        const data= {
            subject,
            description
        }
        firebase
            .firestore()
            .collection("users/"+user.id+"/FavoriteServices")
            .add(data)
            .then(() => {
                alert("You Have succesfully added a favorited service!");
                navigation.navigate("Client Home");
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
                />
            
                <TouchableOpacity
                    style={styles.servicesPostButton}
                    onPress={onAddPress}
                >
                    <Text style={styles.buttonTitle}>Add Favorited Service</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </ImageBackground>
    );
}
