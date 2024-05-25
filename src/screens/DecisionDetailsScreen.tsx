import React, { useState } from "react";
import { AutosizeTextarea } from "native-textarea";
import { Box, Flex, Text, VStack, HStack, Heading, Divider, Button, Icon, useToast, Input } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { makeDecision } from "../services/ai-api.service";
import { performOCR } from "../services/ocr.service";
import { saveDecision } from "../services/decision.service";
import { Decision } from "../types/decision.type";

export const DecisionDetailsScreen = () => {
  const [decisionA, setDecisionA] = useState("");
  const [decisionB, setDecisionB] = useState("");
  const [finalDecision, setFinalDecision] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [autoGeneratedAiTitle, setAutoGeneratedAiTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [userNeeds, setUserNeeds] = useState("");
  const toast = useToast();

  const handleOCR = async () => {
    try {
      const scannedText = await performOCR();
      setDecisionA(scannedText);
    } catch (error) {
      console.error("OCR Error:", error);
      toast.show({ title: "OCR Error", status: "error" });
    }
  };

  const handleSubmit = async () => {
    if (!decisionA || !decisionB || !userDetails || !userNeeds) {
      toast.show({ title: "Please fill in all fields", status: "warning" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await makeDecision(decisionA, decisionB, userDetails, userNeeds);
      setFinalDecision(response.finalDecision);
      setTags(response.tags);
      setAutoGeneratedAiTitle(response.autoGeneratedTitle);

      const decisionData: Decision = {
        decisionA,
        decisionB,
        finalDecision: response.finalDecision,
        tags: response.tags.join(", "),
        autoGeneratedAiTitle: response.autoGeneratedTitle,
        userDetails,
        userNeeds,
      };

      await saveDecision(decisionData);

      toast.show({ title: "Decision submitted successfully", status: "success" });
    } catch (error) {
      console.error("Error:", error);
      toast.show({ title: "Error submitting decision", status: "error" });
    }

    setIsLoading(false);
  };

  return (
    <Flex height="100%">
      <VStack px={5} py={8} space={2}>
        <Heading fontSize="2xl">Make a Decision</Heading>

        <Input
          value={userDetails}
          onChangeText={setUserDetails}
          placeholder="Tell us about yourself"
          style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
        />
        <Input
          value={userNeeds}
          onChangeText={setUserNeeds}
          placeholder="What are your needs?"
          style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
        />

        <AutosizeTextarea
          value={decisionA}
          onChangeText={setDecisionA}
          placeholder="Decision A"
          style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
        />
        <AutosizeTextarea
          value={decisionB}
          onChangeText={setDecisionB}
          placeholder="Decision B"
          style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
        />

        <Button onPress={handleOCR}>Scan Text (OCR)</Button>

        <Button onPress={handleSubmit} isLoading={isLoading}>
          Submit
        </Button>

        <Divider my={4} />

        <VStack space={2}>
          <Text fontSize="lg">Final Decision: {finalDecision}</Text>
          <Text fontSize="lg">Tags: {tags.join(", ")}</Text>
          <Text fontSize="lg">Auto-generated Title: {autoGeneratedAiTitle}</Text>
        </VStack>
      </VStack>
    </Flex>
  );
};
