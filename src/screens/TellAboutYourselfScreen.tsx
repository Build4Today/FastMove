import React, { useState } from "react";
import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LocalStorageKeys } from "../types/localStorageKeys";
import { Box, Heading, TextArea, useToast } from "native-base";

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
        multiline
        numberOfLines={4}
        onChangeText={setAboutYourself}
        value={aboutYourself}
        placeholder="Tell us about yourself"
        borderColor="gray.300"
        borderWidth={1}
        rounded="md"
        p={2}
        accessibilityLabel="User details input"
        accessibilityHint="Enter details about yourself"
      />
      <Button mt={4} onPress={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export { TellAboutYourselfButton, TellAboutYourselfScreen };
