import * as React from "react";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import Routing from "./Routing";
import { ApolloProvider } from "@apollo/client";
import api from "./services/api";
import { AuthContextProvider } from "./contexts/AuthContext";

const theme = extendTheme({
  fonts: {
    body: "Nunito",
    heading: "Nunito",
    mono: "Nunito",
  },
});

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
