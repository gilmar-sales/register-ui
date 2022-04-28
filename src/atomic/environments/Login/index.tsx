import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Logo } from "../../atoms/Logo";

const Login: React.FC = () => {
  return (
    <Grid templateColumns="1fr 2fr" gap={6} bg="black">
      <GridItem
        display={"flex"}
        w="100%"
        h="100vh"
        justifyContent={"center"}
        justifyItems={"center"}
      >
        <Logo w={"400px"} />
      </GridItem>
      <GridItem
        w="100%"
        h="100vh"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
      >
        <Box
          minH={"600px"}
          marginLeft={"20rem"}
          bgImage={"url(shape.svg)"}
          bgSize={"cover"}
          backgroundPosition={"left"}
          p={"4rem"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Flex
            direction={"column"}
            gap="1rem"
            bg="white"
            borderRadius={"1rem"}
            p={"2rem"}
          >
            <FormControl isRequired>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input id="email" placeholder="E-mail" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input id="password" type="password" placeholder="First name" />
            </FormControl>
            <Button
              bgColor={"green.400"}
              color="white"
              _hover={{ bgColor: "green.300" }}
              _active={{ bgColor: "green.500" }}
            >
              Login
            </Button>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Login;
