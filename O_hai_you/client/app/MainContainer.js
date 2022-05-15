import React, { useContext } from "react";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";

import LessonScreen from "./navigation/components/LessonScreen";
import ProfileScreen from "./navigation/components/ProfileScreen";
import TranslatorScreen from "./navigation/components/TranslatorScreen";
import PronunciationScreen from "./navigation/components/PronunciationScreen";
import LoginScreen from "./navigation/components/LogInScreen";
import RegisterScreen from "./navigation/components/RegisterScreen";
import { AuthContext } from "./navigation/context/auth";
import SignOutScreen from "./navigation/components/SignOutScreen";

const lessonName = "Lesson";
const profileName = "Profile";
const translatorName = "Translator";
const pronunciationName = "Pronunciation";
const signOutName = "Sign Out";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;

  return (
    <Tab.Navigator
      initialRouteName={lessonName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === lessonName) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === profileName) {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (rn === translatorName) {
            iconName = focused ? "language" : "language-outline";
          } else if (rn === pronunciationName) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (rn === signOutName) {
            iconName = focused ? "exit" : "exit-outline";
          }
          return <IonIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOption={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      {authenticated ? (
        <>
          <Tab.Screen
            name={pronunciationName}
            component={PronunciationScreen}
          />
          <Tab.Screen name={translatorName} component={TranslatorScreen} />
          <Tab.Screen name={lessonName} component={LessonScreen} />
          <Tab.Screen name={profileName} component={ProfileScreen} />
          <Tab.Screen name={signOutName} component={SignOutScreen} />
        </>
      ) : (
        <>
          <Tab.Screen
            options={{ tabBarVisible: false }}
            name="Log In"
            component={LoginScreen}
          />
          <Tab.Screen
            options={{ tabBarVisible: false }}
            name="Register"
            component={RegisterScreen}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
