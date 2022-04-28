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
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Logo } from "../../components/Logo";

const LOGIN = gql`
mutation login(($email: String!, $password: String!)) {
  login(data: {email: $email password: $password}) {
    access_token
  }
}
`;

const Login: React.FC = () => {
  const [login] = useMutation(LOGIN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    login({ variables: { email, password } })
      .then((response) => {
        console.log(response.data);
        // authCtx.handleLogin(response.data.login as TokenPayload);
      })
      .catch((error) => {
        console.log(error);
        // setError(field, { message });
      });
  };

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
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input
                  id="email"
                  placeholder="E-mail"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                bgColor={"green.400"}
                color="white"
                _hover={{ bgColor: "green.300" }}
                _active={{ bgColor: "green.500" }}
              >
                Login
              </Button>
            </form>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Login;
