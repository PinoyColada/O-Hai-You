import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LessonScreen from "../app/components/LessonScreen";

const screens = {
  Lessons: {
    screen: LessonScreen,
  },
};

const HomeStack = createStackNavigator({});
