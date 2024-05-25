import AsyncStorage from "@react-native-async-storage/async-storage";
import { Decision } from "../types/decision.type";
import { LocalStorageKeys } from "../types/localStorageKeys";

export const saveDecision = async (decision: Decision) => {
  try {
    const existingDecisions = await getDecisions();
    const updatedDecisions = [...existingDecisions, decision];
    await AsyncStorage.setItem(LocalStorageKeys.DECISION, JSON.stringify(updatedDecisions));
  } catch (error) {
    console.error("Error saving decision:", error);
    throw error;
  }
};

export const getDecisions = async (): Promise<Decision[]> => {
  try {
    const decisionsString = await AsyncStorage.getItem(LocalStorageKeys.DECISION);
    return decisionsString ? JSON.parse(decisionsString) : [];
  } catch (error) {
    console.error("Error retrieving decisions:", error);
    throw error;
  }
};
