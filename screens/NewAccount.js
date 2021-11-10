import * as React from 'react';
import { Text, StyleSheet, ImageBackground } from 'react-native'

const NewAccountScreen = ({ navigation, route }) => { 
    return(
    <ImageBackground
        source={ require('../assets/GrubberBackground.png')}
        resizeMode='cover' style={styles.backgroundImage}>
            <Text> Name: </Text>
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
