import React, { useState, useEffect } from "react";
import {
    ImageBackground,
} from "react-native";
import styles from "./../../../../components/styles";
import { firebase } from "../../../firebase/config";

export default function EditServiceScreen({ route, navigation }) {
    
    return (
        <ImageBackground
        source={require("../../../../assets/GrubberBackground.png")}
        resizeMode="cover"
          style={styles.backgroundImage}
        >

        </ImageBackground>
    )
}