import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./app/navigation/context/auth";
import { SetProvider } from "./app/navigation/context/set";
import { FlashCardProvider } from "./app/navigation/context/flashCard";
import MainContainer from "./app/MainContainer";

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SetProvider>
          <FlashCardProvider>
            <MainContainer />
          </FlashCardProvider>
        </SetProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
