import React, { useEffect, useState } from "react";
import { Box, FlatList, VStack, Text, Heading, Input, Icon, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getDecisions } from "../services/decision.service";
import { Decision } from "../types/decision.type";
import { useNavigation } from "@react-navigation/native";

export const DecisionHistoryScreen: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchDecisions();
  }, []);

  const fetchDecisions = async () => {
    try {
      const storedDecisions = await getDecisions();
      setDecisions(storedDecisions);
    } catch (error) {
      console.error("Error fetching decisions:", error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredDecisions = decisions.filter((decision) => {
    const { autoGeneratedAiTitle, tags } = decision;
    const lowerCaseSearchText = searchText.toLowerCase();
    return (
      autoGeneratedAiTitle.toLowerCase().includes(lowerCaseSearchText) ||
      tags.toLowerCase().includes(lowerCaseSearchText)
    );
  });

  const renderDecisionItem = ({ item }: { item: Decision }) => (
    <Box borderWidth={1} borderColor="gray.300" p={4} my={2}>
      <Text fontSize="lg">User Details: {item.userDetails}</Text>
      <Text fontSize="lg">User Needs: {item.userNeeds}</Text>
      <Text fontSize="lg">Decision A: {item.decisionA}</Text>
      <Text fontSize="lg">Decision B: {item.decisionB}</Text>
      <Text fontSize="lg">Final Decision: {item.finalDecision}</Text>
      <Text fontSize="lg">Tags: {item.tags}</Text>
      <Text fontSize="lg">Auto-generated Title: {item.autoGeneratedAiTitle}</Text>
    </Box>
  );

  return (
    <VStack p={4} space={4}>
      <Heading fontSize="2xl">Decision History</Heading>
      <Input
        placeholder="Search decisions..."
        value={searchText}
        onChangeText={handleSearch}
        InputLeftElement={
          <Icon
            as={<Ionicons name="search" />}
            size={5}
            ml={2}
            color="muted.400"
          />
        }
      />
      <FlatList
        data={filteredDecisions}
        renderItem={renderDecisionItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text textAlign="center" mt={10}>
            No decisions found.
          </Text>
        }
      />

      <Button onPress={() => navigation.navigate("DecisionDetails")}>Make a New Decision</Button>
    </VStack>
  );
};
