import axios from "axios";
import { getUserProfile } from "./user-profile.service";
import { OPEN_AI_API_URL, OPEN_AI_MODEL, API_KEY } from "@env";

interface ChatGPTResponse {
  finalDecision: number;
  tags: string[];
  autoGeneratedTitle: string;
}

export const makeDecision = async (
  decisionA: string,
  decisionB: string,
  userDetails: string,
  userNeeds: string
): Promise<ChatGPTResponse> => {
  const userProfile = await getUserProfile();

  const prompt = `Given the following user details and needs:
User Details: ${userDetails}
User Profile: User name ${userProfile.name} | User age ${userProfile.age} | User occupation ${userProfile.occupation}
User Needs: ${userNeeds}

And the following two decisions:
Decision A: ${decisionA}
Decision B: ${decisionB}

Please help me make a decision by choosing either Decision A (represented by 1) or Decision B (represented by 2) based on the user's details and needs. Also, provide three relevant tags for the final decision and an auto-generated title.

Final decision (1 or 2):
Tags (comma-separated):
Auto-generated title:`;

  try {
    const response = await axios.post(
      OPEN_AI_API_URL,
      {
        model: OPEN_AI_MODEL,
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const chatGPTResponse = response.data.choices[0].message.content;
    const [finalDecision, tags, autoGeneratedTitle] = chatGPTResponse.split("\n");

    return {
      finalDecision: parseInt(finalDecision.trim()),
      tags: tags
        .trim()
        .split(",")
        .map((tag: string) => tag.trim()),
      autoGeneratedTitle: autoGeneratedTitle.trim(),
    };
  } catch (error) {
    console.error("Error making decision:", error);
    throw new Error("Failed to make decision");
  }
};
