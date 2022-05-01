import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Text fontSize="7xl">Error 404 - Not Found</Text>
      <Text fontSize="3xl">That page does not exists in our system</Text>

      <Link to="/">
        <Button>Return</Button>
      </Link>
    </Flex>
  );
};

export default NotFound;
