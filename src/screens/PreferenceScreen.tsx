import React, { useState, useEffect } from "react";
import { Box, VStack, Text, Heading, Input, Button, useToast } from "native-base";
import { getUserDetails, updateUserDetails } from "../services/user-details.service";
import { UserDetails } from "../types/user-details.type";
import { useNavigation } from "@react-navigation/native";

export const PreferenceScreen: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "",
    age: 0,
    occupation: "",
    // Add more fields as needed
  });
  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const storedUserDetails = await getUserDetails();
      setUserDetails(storedUserDetails);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.show({ title: "Error fetching user details", status: "error" });
    }
  };

  const handleSave = async () => {
    try {
      await updateUserDetails(userDetails);
      toast.show({ title: "User details updated successfully", status: "success" });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.show({ title: "Error updating user details", status: "error" });
    }
  };

  return (
    <VStack p={4} space={4}>
      <Heading fontSize="2xl" mb={4}>
        Preference
      </Heading>
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Name
        </Text>
        <Input
          value={userDetails.name}
          onChangeText={(text) => setUserDetails({ ...userDetails, name: text })}
          backgroundColor="white"
          borderWidth={1}
          borderColor="gray.300"
          rounded="md"
          p={2}
        />
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Age
        </Text>
        <Input
          value={userDetails.age.toString()}
          onChangeText={(text) => setUserDetails({ ...userDetails, age: parseInt(text, 10) })}
          backgroundColor="white"
          borderWidth={1}
          borderColor="gray.300"
          rounded="md"
          p={2}
          keyboardType="numeric"
        />
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Occupation
        </Text>
        <Input
          value={userDetails.occupation}
          onChangeText={(text) => setUserDetails({ ...userDetails, occupation: text })}
          backgroundColor="white"
          borderWidth={1}
          borderColor="gray.300"
          rounded="md"
          p={2}
        />
      </Box>
      {/* Add more input fields for additional user details */}
      <Button onPress={handleSave} colorScheme="blue" mt={4}>
        Save
      </Button>
    </VStack>
  );
};
