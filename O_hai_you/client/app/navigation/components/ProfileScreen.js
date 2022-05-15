import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../context/auth";

function ProfileScreen({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const { username, email } = state.user;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => navigation.navigate("Lesson")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Profile Screen
      </Text>
      <Text>{username}</Text>
      <Text>{email}</Text>
    </View>
  );
}

export default ProfileScreen;
