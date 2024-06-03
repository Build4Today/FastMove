import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LocalStorageKeys } from "../types/localStorageKeys";
import { Box, Heading, TextArea, useToast, Button } from "native-base";

const TellAboutYourselfButton = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("TellAboutYourselfScreen");
  };
  return <Button title="Tell About Yourself" onPress={handlePress} />;
};

const TellAboutYourselfScreen = () => {
  const [aboutYourself, setAboutYourself] = useState("");
  const toast = useToast();

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(LocalStorageKeys.ABOUT_YOURSELF, aboutYourself);
    } catch (error) {
      console.error(error);
      toast.show({
        title: "Error",
        description: "There was an error saving your data.",
        status: "error",
        duration: 5000,
      });
    }
  };

  return (
    <Box m={4}>
      <Heading mb={4} color="blue.500">
        About Yourself
      </Heading>
      <TextArea
        value={aboutYourself}
        onChangeText={setAboutYourself}
        placeholder="Tell us about yourself"
        backgroundColor="white"
        borderWidth={1}
        borderColor="gray.300"
        rounded="md"
        p={3}
        minHeight={100}
        autoCompleteType=""
        accessibilityLabel="User details input"
        accessibilityHint="Enter details about yourself"
      />

      <Button onPress={handleSave} colorScheme="blue" mt={4} mb={4} size="lg">
        Save
      </Button>
    </Box>
  );
};

export { TellAboutYourselfButton, TellAboutYourselfScreen };
