import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDetails } from "../types/user-details.type";

const USER_DETAILS_STORAGE_KEY = "userDetails";

export const updateUserDetails = async (userDetails: UserDetails) => {
  try {
    await AsyncStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(userDetails));
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

export const getUserDetails = async (): Promise<UserDetails> => {
  try {
    const userDetailsString = await AsyncStorage.getItem(USER_DETAILS_STORAGE_KEY);
    return userDetailsString ? JSON.parse(userDetailsString) : { name: "", age: 0, occupation: "" };
  } catch (error) {
    console.error("Error retrieving user details:", error);
    throw error;
  }
};
