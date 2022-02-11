import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";

export default function ProvServicesScreen({ navigation }) {
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("services")
      .where("providerId", "==", user.id)
      .get()
      .then((querySnapshot) => {
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let serviceDetails = {};
          serviceDetails = documentSnapshot.data();
          serviceDetails["id"] = documentSnapshot.id;
          temp.push(serviceDetails);
          setListData(temp);
        });
      });
  }, []);

  const itemSeperatorView = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#808080",
        }}
      />
    );
  };

  let itemView = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>{item.serviceType}</Text>
          </View>
          <View>
            <Text
              style={{ color: "blue", textDecorationLine: "underline" }}
              onPress={() => Linking.openURL(`tel:${item.contact}`)}
            >
              Contact #: {item.contact}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>{item.location}</Text>
        <Text style={{ fontSize: 12, color: "#808080" }}>Contact Email: {item.email}</Text>
        <View style={styles.marginTop10}>
          <Text>{item.description}</Text>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>
          Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} - {`${convertTo12Hour(item.toTime)}`}
        </Text>
      </View>
    );
  };

  const onPostPress = () => {
    navigation.navigate("Post Your Service");
  };

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={listData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemView}
        />
      </View>
      <View style={styles.postButton}>
       <Button style={styles.servicesPostButton} onPress={onPostPress}>
          Post a New Service
        </Button>
      </View>
    </ImageBackground>
  );
}

function convertTo12Hour (time){
  if (time < 13 && time > 0){
    return (time).toString() + " A.M.";
  } else if (time > 12) {
    return (time-12).toString() + " P.M."
  } else {
    return "1 A.M."
  }
}