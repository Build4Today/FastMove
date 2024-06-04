import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LocalStorageKeys } from "../types/localStorageKeys";
import { Box, Heading, TextArea, useToast, Button } from "native-base";

const TellAboutYourselfScreen = () => {
  const [aboutYourself, setAboutYourself] = useState("");
  const toast = useToast();

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(LocalStorageKeys.ABOUT_YOURSELF, aboutYourself);

      toast.show({
        title: "Saved ✅"
      });
    } catch (error) {
      console.error(error);
      toast.show({
        title: "Error",
        description: "There was an error saving your data.",
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
        accessibilityHint="Enter details about yourself to make decisions easier"
      />

      <Button onPress={handleSave} colorScheme="blue" mt={4} mb={4} size="lg">
        Save
      </Button>
    </Box>
  );
};

export { TellAboutYourselfScreen };
