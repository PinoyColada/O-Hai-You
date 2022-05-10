import React from "react";
import { View, ImageBackground, StyleSheet, Image } from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("./assets/background_welcome_page.jpeg")}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default WelcomeScreen;
