import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";

import LessonScreen from "./navigation/components/LessonScreen";
import ProfileScreen from "./navigation/components/ProfileScreen";

const lessonName = "Lesson";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={lessonName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if ((rn = lessonName)) {
              iconName = focused ? "home" : "home-outline";
            } else if ((rn = profileName)) {
              iconName = focused ? "list" : "list-outline";
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
        <Tab.Screen name={lessonName} component={LessonScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
