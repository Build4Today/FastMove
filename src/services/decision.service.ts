import AsyncStorage from "@react-native-async-storage/async-storage";
import { Decision } from "../types/decision.type";

const DECISION_STORAGE_KEY = "decisions";

export const saveDecision = async (decision: Decision) => {
  try {
    const existingDecisions = await getDecisions();
    const updatedDecisions = [...existingDecisions, decision];
    await AsyncStorage.setItem(DECISION_STORAGE_KEY, JSON.stringify(updatedDecisions));
  } catch (error) {
    console.error("Error saving decision:", error);
    throw error;
  }
};

export const getDecisions = async (): Promise<Decision[]> => {
  try {
    const decisionsString = await AsyncStorage.getItem(DECISION_STORAGE_KEY);
    return decisionsString ? JSON.parse(decisionsString) : [];
  } catch (error) {
    console.error("Error retrieving decisions:", error);
    throw error;
  }
};
