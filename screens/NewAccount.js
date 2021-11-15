import * as React from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native'
import Button from "../components/Button.js";

const NewAccountScreen = ({ navigation, route }) => { 
    return(
    <ImageBackground
        source={ require('../assets/GrubberBackground.png')}
        resizeMode='cover' style={styles.backgroundImage}>
            <Text> New Account page </Text>
            <Text> WILL BE BUNCH OF INPUT HERE </Text>
            <Button onPress={() => navigation.navigate("Map")}>Login</Button>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
});

export default NewAccountScreen
