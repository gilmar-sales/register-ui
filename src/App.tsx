import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Routing from "./Routing";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Routing />
  </ChakraProvider>
);
