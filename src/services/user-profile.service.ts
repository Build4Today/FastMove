import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile } from "../types/user-profile.type";
import { LocalStorageKeys } from "../types/storage-keys.type";

export const updateUserProfile = async (userDetails: UserProfile) => {
  try {
    await AsyncStorage.setItem(LocalStorageKeys.USER_PROFILE, JSON.stringify(userDetails));
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const userDetailsString = await AsyncStorage.getItem(LocalStorageKeys.USER_PROFILE);
    return userDetailsString ? JSON.parse(userDetailsString) : { name: "", age: 0, occupation: "" };
  } catch (error) {
    console.error("Error retrieving user details:", error);
    throw error;
  }
};
