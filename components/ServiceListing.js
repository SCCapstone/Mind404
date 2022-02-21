import {
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const ServiceListing = ({ item }) => {
  const navigation = useNavigation();
  const detailsPage = () => {
    navigation.navigate("Service Details", { item });
  };
  return (
    <TouchableOpacity onPress={() => detailsPage()}>
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              {item.serviceType}
            </Text>
          </View>
          <View>
            <Text
              style={styles.phoneNumber}
              onPress={() => Linking.openURL(`tel:${item.contact}`)}
            >
              {`${checkAvailable(item.fromTime, item.toTime, item.contact)}`}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>{item.location}</Text>
        <Text style={{ fontSize: 12, color: "#808080" }}>{item.email}</Text>
        <View style={{ marginTop: 10 }}>
          <Text>{item.description}</Text>
        </View>
        <Text style={{ fontSize: 12, color: "#808080" }}>
          Telephone Availability: {`${convertTo12Hour(item.fromTime)}`} -{" "}
          {`${convertTo12Hour(item.toTime)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceListing;

function convertTo12Hour(time) {
  if (time < 13 && time > 0) {
    return time.toString() + " A.M.";
  } else if (time > 12) {
    return (time - 12).toString() + " P.M.";
  } else {
    return "1 A.M.";
  }
}

function checkAvailable(fromTime, toTime, tel) {
  let currentHour = new Date().getHours();

  if (toTime < fromTime) {
    toTime = toTime + 24;
  }
  if (currentHour < fromTime) {
    currentHour = currentHour + 24;
  }
  if (toTime == fromTime) {
    return tel;
  } else if (currentHour > fromTime && currentHour < toTime) {
    return tel;
  } else {
    return "";
  }
}
