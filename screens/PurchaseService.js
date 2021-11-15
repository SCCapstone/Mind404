import * as React from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native'
import Button from "../components/Button.js";

const PurchaseServicesScreen = ({ navigation, route }) => { 
    return(
    <ImageBackground
        source={ require('../assets/GrubberBackground.png')}
        resizeMode='cover' style={styles.backgroundImage}>
            <Text> Purchase page </Text>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
});

export default PurchaseServicesScreen
