import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
} from "react-native";
import Button from "./../../../../components/Button";
import styles from "./../../../../components/styles";
import { firebase } from "./../../../firebase/config";
import useUser from "../../../../useUser";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProvServicesScreen({ navigation }) {
  const [listData, setListData] = React.useState([]);
  const { user } = useUser();

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("services")
      .where("providerId", "==", user.id)
      .onSnapshot((querySnapshot) => {
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
          height: 0,
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
          backgroundColor: "#e9e9e9",
          padding: 20,
          borderRadius: 12,
          marginBottom: 3,
          marginTop: 3,
          marginStart: 6,
          marginEnd: 6,
          elevation: 10,
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
        <Text style={{ fontSize: 12, color: "#808080" }}>Company Name: {item.companyName}</Text>
        <Text style={{ fontSize: 12, color: "#808080" }}>{item.location}</Text>
        <Text style={{ fontSize: 12, color: "#808080" }}>Contact Email: {item.email}</Text>
        <View style={styles.marginTop10}>
          <Text>{item.description}</Text>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>
          Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} - {`${convertTo12Hour(item.toTime)}`}
        </Text>
        <TouchableOpacity style={{width:139}} onPress={() => serviceDeleteAlert(item.id)}>
          <Text style={{padding: 7, fontSize: 15, color: 'red',marginEnd: 0}}>Delete this Service</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const serviceDeleteAlert = (id) => {
    Alert.alert(
      'Are you sure you want to delete this service?',
      'Once the service has been deleted, it cannot be undone',
      [
        {text: 'Delete', onPress: () => deleteService(id)},
        {text: 'Cancel', onPress: () => console.log('Delete cancelled.'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  const deleteService = (id) => {
    firebase.firestore().collection("services").doc(id).delete();
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((users) =>
        users.forEach((user) =>
          user.ref.collection("ClientFavorites")
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              if (documentSnapshot.id == id){
                documentSnapshot.ref.delete()
              }
            });
          })
        )
      )
    setListData( listData => {
      return listData.filter(item => item.id != id);
    });
  }

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
        <View style={{marginTop: 3, height: 2, backgroundColor: "grey"}}/>
      </View>
      <View style={{marginBottom: 20}}>
       <Button style={styles.servicesPostButton} onPress={onPostPress}>
          Post a New Service
        </Button>
      </View>
    </ImageBackground>
  );
}

function convertTo12Hour(time) {
  if (time < 12 && time > 0) {
    return time.toString() + " A.M.";
  } else if (time > 12) {
    return (time - 12).toString() + " P.M.";
  } else if (time == 12){
    return "12 P.M.";
  } else {
    return "12 A.M.";
  }
}