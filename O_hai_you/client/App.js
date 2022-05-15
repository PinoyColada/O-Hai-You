import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainContainer from "./app/MainContainer";
import LoginScreen from "./app/navigation/components/LogInScreen";
import RegisterScreen from "./app/navigation/components/RegisterScreen";
import { AuthProvider } from "./app/navigation/context/auth";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Log In"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Log In" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainContainer" component={MainContainer} />
        </Stack.Navigator>
      </AuthProvider>
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
