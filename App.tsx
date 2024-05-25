import React from "react";
import { NativeBaseProvider, Button, Icon } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { DecisionDetailsScreen } from "./src/screens/DecisionDetailsScreen";
import { DecisionHistoryScreen } from "./src/screens/DecisionHistoryScreen";
import { UserDetailsScreen } from "./src/screens/UserDetailsScreen";

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
                <Button
                  ml={4}
                  leftIcon={<Icon as={MaterialIcons} name="person" size={6} />}
                  onPress={() => navigation.navigate("UserDetails")}
                >
                  User Details
                </Button>
              ),
              headerRight: () => (
                <Button
                  mr={4}
                  leftIcon={<Icon as={MaterialIcons} name="history" size={6} />}
                  onPress={() => navigation.navigate("DecisionHistory")}
                >
                  History
                </Button>
              ),
            })}
          />
          <Stack.Screen
            name="DecisionHistory"
            component={DecisionHistoryScreen}
            options={{ title: "Decision History" }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{ title: "User Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
