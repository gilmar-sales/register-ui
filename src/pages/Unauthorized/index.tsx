import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Text fontSize="7xl">Error 401 - Unauthorized</Text>
      <Text fontSize="3xl">You are not authorized to access that page</Text>

      <Link to="/">
        <Button>Return</Button>
      </Link>
    </Flex>
  );
};

export default Unauthorized;
