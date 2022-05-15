import React from "react";

import RootNavigation from "./RootNavigation";

export default function App() {
  return (
    <RootNavigation />
    // <NavigationContainer independent={true}>
    //   <AuthProvider>
    //     <Stack.Navigator
    //       initialRouteName="Log In"
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //     >
    //       <Stack.Screen name="Log In" component={LoginScreen} />
    //       <Stack.Screen name="Register" component={RegisterScreen} />
    //       <Stack.Screen name="MainContainer" component={MainContainer} />
    //     </Stack.Navigator>
    //   </AuthProvider>
    // </NavigationContainer>
  );
}
