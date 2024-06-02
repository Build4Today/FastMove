import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";
import { Box } from "native-base";

import { AppNavigation } from "./AppNavigation";

const queryClient: QueryClient = new QueryClient();

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        fontWeight: "bold",
        colorScheme: "rose",
        size: "lg",
        rounded: "3xl",
      },
    },
    Input: {
      defaultProps: {
        size: "lg",
        bg: "white",
        p: "3",
        rounded: "xl",
        fontSize: "lg",
        borderWidth: 0,
        _focus: { borderWidth: 1, borderColor: "rose.400", bg: "white" },
      },
    },
    Select: {
      defaultProps: {
        rounded: "lg",
        size: "xl",
        bg: "white",
      },
    },
    IconButton: {
      defaultProps: {
        rounded: "md",
        colorScheme: "rose.600",
      },
    },
    TextArea: {
      defaultProps: {
        size: "bg",
        bg: "white",
        p: "3",
        borderWidth: 0,
        _focus: { borderWidth: 1, borderColor: "rose.400", bg: "white" },
      },
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={theme}>
        <Box flex={1} bg="lightBlue.500">
          <AppNavigation />
        </Box>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};
