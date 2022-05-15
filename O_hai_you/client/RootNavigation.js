import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./app/navigation/context/auth";
import MainContainer from "./app/MainContainer";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MainContainer />
      </AuthProvider>
    </NavigationContainer>
  );
}
