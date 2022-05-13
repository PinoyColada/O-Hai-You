import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SubmitButton = ({ title, handleSubmit, loading }) => (
  <TouchableOpacity
    onPress={handleSubmit}
    style={{
      width: "80%",
      marginTop: "5%",
      backgroundColor: "black",
      height: 40,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 5,
    }}
  >
    <Text style={{ color: "white", fontSize: 16, fontWeight: "400" }}>
      {loading ? "Please wait..." : title}
    </Text>
  </TouchableOpacity>
);

export default SubmitButton;
