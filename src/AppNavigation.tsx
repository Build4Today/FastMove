import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DecisionDetailsScreen } from "./screens/DecisionDetailsScreen";
import { DecisionHistoryScreen } from "./screens/DecisionHistoryScreen";
import { UserProfileScreen } from "./screens/UserProfileScreen";
import { ScreenName } from "./types/navigation.type";
import { TellAboutYourselfScreen } from "./screens/TellAboutYourselfScreen";

const Stack = createStackNavigator();

export const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenName.DECISION_DETAILS}
          component={DecisionDetailsScreen}
          options={{ title: "Make a Decision" }}
        />
        <Stack.Screen
          name={ScreenName.TELL_ABOUT_YOURSELF}
          component={TellAboutYourselfScreen}
          options={{ title: "Details about yourself Gives Better decisions" }}
        />

        <Stack.Screen
          name={ScreenName.DECISION_HISTORY}
          component={DecisionHistoryScreen}
          options={{ title: "Decision History" }}
        />
        <Stack.Screen name={ScreenName.USER_PROFILE} component={UserProfileScreen} options={{ title: "Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
