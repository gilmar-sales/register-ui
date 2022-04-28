import * as React from "react";
import { ChakraProvider, CSSReset, theme } from "@chakra-ui/react";
import Routing from "./Routing";
import { ApolloProvider } from "@apollo/client";
import api from "./services/api";
import { AuthContextProvider } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ApolloProvider client={api}>
      <AuthContextProvider>
        <UserContextProvider>
          <Routing />
          <CSSReset />
        </UserContextProvider>
      </AuthContextProvider>
    </ApolloProvider>
  </ChakraProvider>
);
