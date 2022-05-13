import React from "react";
import { Text, View } from "react-native";

export default function LessonScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is the Lesson screen.")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Lesson Screen
      </Text>
    </View>
  );
}
