import React from "react";
import { View, Text, TextInput } from "react-native";

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      placeholder={name}
      autoCorrect={false}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      style={{
        width: "80%",
        borderBottomWidth: 1,
        borderBottomColor: "black",
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
      }}
      value={value}
      onChangeText={(text) => setValue(text)}
    />
  );
};

export default UserInput;
