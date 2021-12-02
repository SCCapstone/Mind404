import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
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
          height: 0.2,
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
        <Text>Service: {item.serviceType}</Text>
        <Text>Location: {item.location}</Text>
        <Text>Description: {item.description}</Text>
        <Text>Contact: {item.contact}</Text>
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
      <View style={{ flex: 1 }}>
        <FlatList
          data={listData}
          ItemSeparatorComponent={itemSeperatorView}
          keyExtractor={(item, index) => index.toString()}
          renderItem={itemView}
        />
      </View>
      <Button style={styles.servicesPostButton} onPress={onPostPress}>
        Post a New Service
      </Button>
    </ImageBackground>
  );
}
