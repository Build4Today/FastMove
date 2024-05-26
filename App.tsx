import React from "react";
import { NativeBaseProvider, Icon, IconButton } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { DecisionDetailsScreen } from "./src/screens/DecisionDetailsScreen";
import { DecisionHistoryScreen } from "./src/screens/DecisionHistoryScreen";
import { PreferenceScreen } from "./src/screens/PreferenceScreen";

const Stack = createStackNavigator();

export const App: React.FC = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DecisionDetails"
            component={DecisionDetailsScreen}
            options={({ navigation }) => ({
              title: "Make a Decision",
              headerLeft: () => (
                <IconButton
                  icon={<Icon as={Ionicons} name="menu" size={7} color="black" />}
                  borderRadius="full"
                  onPress={() => navigation.navigate("Preference")}
                  ml={2}
                />
              ),
              headerRight: () => (
                <IconButton
                  icon={<Icon as={Ionicons} name="time-outline" size={7} color="black" />}
                  borderRadius="full"
                  onPress={() => navigation.navigate("DecisionHistory")}
                  mr={2}
                />
              ),
            })}
          />
          <Stack.Screen
            name="DecisionHistory"
            component={DecisionHistoryScreen}
            options={{ title: "Decision History" }}
          />
          <Stack.Screen
            name="Preference"
            component={PreferenceScreen}
            options={{ title: "Preference" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
