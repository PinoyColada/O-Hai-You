import React from "react";
import { Text, View } from "react-native";

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Lesson")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Profile Screen
      </Text>
    </View>
  );
}

export default ProfileScreen;
