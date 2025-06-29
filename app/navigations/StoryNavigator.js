import { createStackNavigator } from "@react-navigation/stack";

import ChapterScreen from "../screens/ChapterScreen";
import HomeScreen from "../screens/HomeScreen";
import ShowImageScreen from "../screens/ShowImageScreen";
import StoryScreen from "../screens/StoryScreen";

import colors from "../config/colors";
import routes from "./routes";

const Stack = createStackNavigator();

const StoryNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.dark,
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name={routes.MAIN} component={HomeScreen} />
      <Stack.Screen name={routes.CHAPTER} component={ChapterScreen} />
      <Stack.Screen name={routes.STORY} component={StoryScreen} />
      <Stack.Screen name={routes.IMAGE} component={ShowImageScreen} />
    </Stack.Navigator>
  );
};

export default StoryNavigator;
