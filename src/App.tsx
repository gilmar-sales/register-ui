import * as React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import theme from "./theme";
import api from "./services/api";
import { AuthContextProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={api}>
      <AuthContextProvider>
        <AppRoutes />
        <CSSReset />
      </AuthContextProvider>
    </ApolloProvider>
  </ChakraProvider>
);
