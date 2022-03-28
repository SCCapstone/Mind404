import * as React from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./../../../../components/styles";
import useUser from "../../../../useUser";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ProvProfileScreen({ navigation }) {
  const { user } = useUser();

  const onPencilPress = () => {
    navigation.navigate("Prov Edit Profile");
  };

  return (
    <ImageBackground
    source={require("../../../../assets/GrubberBackground.png")}
    resizeMode="cover"
      style={styles.backgroundImage}
    >
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => onPencilPress()}
      >
        <FontAwesome name="pencil" color="#000" size={30} />
      </TouchableOpacity>
      <View style={styles.layout}>
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
            <Text style={styles.titleText}>Service Provided</Text>
          </View>
          <View style={styles.marginTop10}>
            <Text>{user.description}</Text>
          </View>
        </View>
        <View style={styles.profileDescriptionWrapper}>
          <View>
            <Text style={styles.titleText}>Reviews</Text>
          </View>
          <View style={styles.marginTop10}>
            <Text>This Service Provider has no reviews yet.</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
