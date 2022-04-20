import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./../../../../components/styles";
import useUser from "../../../../useUser";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { firebase } from "../../../firebase/config";

export default function ProvProfileScreen({ navigation }) {
  const { user } = useUser();
  const [providerData, setProviderData] = useState([]);

  const onPencilPress = () => {
    navigation.navigate("Prov Edit Profile");
  };

  const getReviews = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.id)
      .onSnapshot((querySnapshot) => {
        setProviderData(querySnapshot.data());
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => onPencilPress()}
        >
          <FontAwesome name="pencil" color="#788eec" size={30} />
        </TouchableOpacity>
        <View style={styles.profileLayout}>
          <Text style={styles.welcome}>
            {user.firstName} {user.lastName}
          </Text>
          <Image
            style={styles.profilePhoto}
            source={
              user.imageURL
                ? { uri: user.imageURL }
                : require("../../../../assets/unknown-user-image.png")
            }
          />
          <View style={styles.profileDescriptionWrapper}>
            <View>
              <Text style={styles.titleText}>About</Text>
            </View>
            <View style={styles.marginTop10}>
              <Text>{user.description}</Text>
            </View>
          </View>
          <View style={styles.profileDescriptionWrapper}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
                >
                  Your Rating:{" "}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "green",
                    fontStyle: "italic",
                  }}
                >
                  {providerData.avgRating}
                </Text>
              </View>
              <Text style={styles.titleText}>Reviews</Text>
            </View>
            <View style={styles.marginTop10}>
              {providerData.reviews && providerData.reviews.length == 0 && (
                <Text>This Service Provider has no reviews yet.</Text>
              )}
              {providerData.reviews &&
                providerData.reviews.length > 0 &&
                providerData.reviews.map((item, index) => {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#000",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 10,
                      }}
                      key={index}
                    >
                      <Text>{`${item.firstName} ${item.lastName}`}</Text>
                      <Text>{item.description}</Text>
                      <Text>{item.rating}/5.0</Text>
                    </View>
                  );
                })}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
