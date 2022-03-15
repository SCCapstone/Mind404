import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import styles from "./../../../../components/styles";
import Button from "./../../../../components/Button";
import useUser from "../../../../useUser";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { firebase } from "./../../../firebase/config";
import * as ImagePicker from "expo-image-picker";
import * as Progress from "react-native-progress";

export default function ProvProfileScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const { user, setUser } = useUser();
  const [description, setDecription] = useState(user.description);
  const onPostPress = () => {
    /** Checks to see if type of service is an empty string */
    if (description == "") {
      alert("Please enter services offered.");
      return;
    }
    const usersRef = firebase.firestore().collection("users");
    const data = { description };
    usersRef.doc(user.id).update(data);
    setUser({
      ...user,
      ...data,
    });
    navigation.navigate("Prov Home");
  };
  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };
  const uploadImage = async () => {
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(filename);
    const task = ref.put(blob);
    setUploading(true);
    setTransferred(0);
    // const task = firebase.storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
      const imageURL = await ref.getDownloadURL();
      const usersRef = firebase.firestore().collection("users");
      const data = { imageURL };
      await usersRef.doc(user.id).update(data);
      setUser({
        ...user,
        ...data,
      });
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert("Photo uploaded!", "Your photo has been uploaded!");
    setImage(null);
  };
  return (
    <ImageBackground
      source={require("../../../../images/grey_background.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.layout}>
        <View style={styles.profileDescriptionWrapper}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button onPress={selectImage}>Select Image</Button>
          </View>
          <View style={styles.imageContainer}>
            {image !== null ? (
              <Image source={{ uri: image.uri }} style={styles.imageBox} />
            ) : null}
            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : (
              <Button onPress={uploadImage}>Upload image</Button>
            )}
          </View>

          <View>
            <Text style={styles.titleText}>Services Provided</Text>
          </View>
          <TextInput
            style={styles.multilineInput}
            placeholder="Description of services"
            placeholderTextColor="#aaaaaa"
            onChangeText={setDecription}
            value={description}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            multiline
          ></TextInput>
        </View>
        <Button style={styles.servicesPostButton} onPress={onPostPress}>
          <Text style={styles.buttonTitle}>Post Service</Text>
        </Button>
      </View>
    </ImageBackground>
  );
}
