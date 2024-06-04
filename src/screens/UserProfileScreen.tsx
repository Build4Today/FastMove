import React, { useState, useEffect } from "react";
import { Box, VStack, Text, Heading, Input, Button, useToast } from "native-base";
import { getUserProfile, updateUserProfile } from "../services/user-profile.service";
import { UserProfile } from "../types/user-profile.type";
import { useNavigation } from "@react-navigation/native";

export const UserProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    age: 0,
    occupation: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const storedUserProfile = await getUserProfile();
      setUserProfile(storedUserProfile);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.show({ title: "Error fetching user details" });
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      await updateUserProfile(userProfile);
      toast.show({ title: "Your details has been updated" });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user details:", error);

      toast.show({ title: "Error updating your details" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack p={4} space={4}>
      <Heading fontSize="2xl" mb={4}>
        Your Profile
      </Heading>

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        By giving a profile helps making the most accurate decision for you
      </Text>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Name
        </Text>
        <Input
          value={userProfile.name}
          onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
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
          value={userProfile.age.toString()}
          onChangeText={(text) => setUserProfile({ ...userProfile, age: parseInt(text, 10) })}
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
          value={userProfile.occupation}
          onChangeText={(text) => setUserProfile({ ...userProfile, occupation: text })}
          backgroundColor="white"
          borderWidth={1}
          borderColor="gray.300"
          rounded="md"
          p={2}
        />
      </Box>

      <Button onPress={handleSave} isLoading={isLoading} colorScheme="blue" mt={4}>
        Save
      </Button>
    </VStack>
  );
};
