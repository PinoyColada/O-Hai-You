import React, { useContext } from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";
import { AuthContext } from "../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignOutScreen = () => {
  const [state, setState] = useContext(AuthContext);

  const signOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("@auth");
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signOut}>
        <Text>Sign out </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignOutScreen;
