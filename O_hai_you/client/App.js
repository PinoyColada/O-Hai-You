import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileScreen from "./app/navigation/components/ProfileScreen";
import MainContainer from "./app/MainContainer";
import LoginScreen from "./app/navigation/components/LogInScreen";
import RegisterScreen from "./app/navigation/components/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  const [authenticated, toggleAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
    toggleAuthenticated(true);
  };

  const handleLogOut = () => {
    setUser(null);
    toggleAuthenticated(false);
    AsyncStorage.clear();
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     checkToken();
  //   }
  // }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="MainContainer"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Log In" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
