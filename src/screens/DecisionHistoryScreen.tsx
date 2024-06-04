import React, { useEffect, useState } from "react";
import { FlatList, Input, Icon, Text, VStack, Heading, Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getDecisions } from "../services/decision.service";
import { Decision } from "../types/decision.type";
import { Box } from "native-base";

export const DecisionHistoryScreen: React.FC = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [filteredDecisions, setFilteredDecisions] = useState<Decision[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDecisions();
  }, []);

  useEffect(() => {
    filterDecisions();
  }, [searchText, decisions]);

  const fetchDecisions = async () => {
    try {
      const storedDecisions = await getDecisions();
      setDecisions(storedDecisions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching decisions:", error);
      setIsLoading(false);
    }
  };

  const filterDecisions = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filtered = decisions.filter((decision) => {
      const { autoGeneratedAiTitle, tags } = decision;
      return (
        autoGeneratedAiTitle.toLowerCase().includes(lowerCaseSearchText) ||
        tags.toLowerCase().includes(lowerCaseSearchText)
      );
    });
    setFilteredDecisions(filtered);
  };

  const renderDecisionItem = ({ item }: { item: Decision }) => (
    <Box borderWidth={1} borderColor="gray.300" p={4} my={2} rounded="md" backgroundColor="white">
      <Heading mb={4} color="blue.500">
        {item.autoGeneratedAiTitle}
      </Heading>

      <Text fontSize="lg" fontWeight="bold" mb={1}>
        User Details:
      </Text>
      <Text fontSize="md" mb={2}>
        {item.userDetails}
      </Text>

      <Text fontSize="lg" fontWeight="bold" mb={1}>
        User Needs:
      </Text>
      <Text fontSize="md" mb={2}>
        {item.userNeeds}
      </Text>

      <Text fontSize="lg" fontWeight="bold" mb={1}>
        Decision A:
      </Text>
      <Text fontSize="md" mb={2}>
        {item.decisionA}
      </Text>

      <Text fontSize="lg" fontWeight="bold" mb={1}>
        Decision B:
      </Text>
      <Text fontSize="md" mb={2}>
        {item.decisionB}
      </Text>

      <Text fontSize="lg" fontWeight="bold" mb={1}>
        Final Decision:
      </Text>
      <Text fontSize="md" mb={2}>
        {item.finalDecision === 1 ? "Decision A" : "Decision B"}
      </Text>

      <Text fontSize="lg" fontWeight="bold" mb={1}>
        Tags:
      </Text>
      <Text fontSize="md" mb={2}>
        {item.tags}
      </Text>
    </Box>
  );

  return (
    <VStack p={4} backgroundColor="white" flex={1}>
      <Heading fontSize="2xl" mb={4}>
        Decision History
      </Heading>
      <Input
        placeholder="Search decisions..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        backgroundColor="white"
        borderWidth={1}
        borderColor="gray.300"
        rounded="md"
        p={2}
        mb={4}
        InputLeftElement={<Icon as={<Ionicons name="search" />} size={5} ml={2} color="muted.400" />}
        accessibilityLabel="Search decisions"
      />
      {isLoading ? (
        <Spinner size="lg" color="blue.500" />
      ) : (
        <FlatList
          data={filteredDecisions}
          renderItem={renderDecisionItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <Text textAlign="center" mt={10} color="gray.500">
              No decisions found.
            </Text>
          }
        />
      )}
    </VStack>
  );
};
