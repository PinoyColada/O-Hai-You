import React from "react";
import { Text, View } from "react-native";

export default function MySetsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        onPress={() => alert("This is the My sets screen.")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Sets
      </Text>
    </View>
  );
}
