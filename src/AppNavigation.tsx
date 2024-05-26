import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DecisionDetailsScreen } from "./screens/DecisionDetailsScreen";
import { DecisionHistoryScreen } from "./screens/DecisionHistoryScreen";
import { PreferenceScreen } from "./screens/PreferenceScreen";
import { ScreenName } from "./types/navigation.type";

const Stack = createNativeStackNavigator();

export const AppNavigation = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={ScreenName.DECISION_DETAILS}
          component={DecisionDetailsScreen}
          options={{ headerTitle: "Make a Decision" }}
        />
        <Stack.Screen
          name={ScreenName.DECISION_HISTORY}
          component={DecisionHistoryScreen}
          options={{ headerTitle: "Decision History" }}
        />
        <Stack.Screen
          name={ScreenName.PREFERENCE}
          component={PreferenceScreen}
          options={{ headerTitle: "Preference" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
