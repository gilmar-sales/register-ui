import * as React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import Routing from "./Routing";
import api from "./services/api";
import { AuthContextProvider } from "./contexts/AuthContext";
import theme from "./theme";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={api}>
      <AuthContextProvider>
        <Routing />
        <CSSReset />
      </AuthContextProvider>
    </ApolloProvider>
  </ChakraProvider>
);
