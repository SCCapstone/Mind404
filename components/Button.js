import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({ children, ...props }) => (
  <Pressable style={styles.loginButton} {...props}>
    <Text style={styles.buttonText}>{children}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  loginButton: {
    margin: 10,
    padding: 15,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Button;