import React from "react";
import { Box, FlatList, Fab, VStack, Icon, Text } from "native-base";
import { useQueryClient } from "react-query";
import { AntDesign } from "@expo/vector-icons";

import { useFetchOwnDecisions, FETCH_OWN_HOUSES_QUERY_KEY } from "../services/decision.service";
import { DecisionCard } from "../components/DecisionCard"
import { Decision } from "../types/decision.type";
import { ScreenName } from "../types/navigation.type";

export const DecisionHistoryScreen = ({ navigation }: any) => {
  const queryClient = useQueryClient();
  const { house, isLoading, isFetching } = useFetchOwnDecisions();

  return (
    <Box h="100%">
      <FlatList
        data={house}
        keyExtractor={(item: Decision): any => item.id}
        p={5}
        flexGrow={1}
        renderItem={({ item }) => (
          <DecisionCard item={item} onPress={() => navigation.navigate(ScreenName.LISTING_FORM, { details: item })} />
        )}
        refreshing={isLoading || isFetching}
        onRefresh={() => queryClient.refetchQueries([FETCH_OWN_HOUSES_QUERY_KEY])}
        ListEmptyComponent={
          <VStack alignItems="center" mt={50} space={2}>
            <Icon as={AntDesign} name="inbox" size={24} color="gray.400" />
            <Text color="gray.400">No entries yet. Fancy to create your first listing?</Text>
          </VStack>
        }
      />

      <Fab
        colorScheme="rose.600:alpha.80"
        renderInPortal={false}
        shadow={2}
        icon={
          <Icon
            as={AntDesign}
            color="white"
            name="plus"
            size={8}
            onPress={() => navigation.navigate(ScreenName.LISTING_FORM)}
          />
        }
      />
    </Box>
  );
};
