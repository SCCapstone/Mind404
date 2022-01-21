import * as React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import styles from "./../../../../components/styles";
import useUser from "../../../../useUser";

export default function ProvProfileScreen() {
  const { user } = useUser();

  return (
    <ImageBackground
      source={require("../../../../assets/GrubberBackground.png")}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.layout}>
        <Text style={styles.welcome}>
          {user.firstName} {user.lastName}
        </Text>
        <Image
          style={styles.profilePhoto}
          source={require("../../../../assets/unknown-user-image.png")}
        />
        <View style={styles.profileDescriptionWrapper}>
          <View>
            <Text style={styles.titleText}>Service Provided</Text>
          </View>
          <View style={styles.marginTop10}>
            <Text>Description goes here.</Text>
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
