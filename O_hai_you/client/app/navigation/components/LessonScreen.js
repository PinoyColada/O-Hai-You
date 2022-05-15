import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../context/auth";

export default function LessonScreen() {
  const [state, setState] = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is the Lesson screen.")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Lesson Screen
      </Text>
      <Text>{JSON.stringify(state, null, 4)}</Text>
    </View>
  );
}
