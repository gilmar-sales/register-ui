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
import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";

import { Logo } from "../../components/Logo";
import TokenPayload from "../../@types/TokenPayload";
import AuthContext from "../../contexts/AuthContext";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      access_token
    }
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authCtx = useContext(AuthContext);

  const [login] = useMutation(LOGIN);
  const handleSubmit = (event: any) => {
    event.preventDefault();

    login({ variables: { email, password } })
      .then((response) => {
        authCtx.handleLogin(response.data.login as TokenPayload);
      })
      .catch((error) => {
        console.log(error);
        // setError(field, { message });
      });
  };

  if (authCtx.isAuthenticated()) return <Navigate to={"/dashboard"} />;

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
          <form onSubmit={handleSubmit}>
            <Flex
              direction={"column"}
              gap="1rem"
              bg="white"
              borderRadius={"1rem"}
              p={"2rem"}
            >
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
            </Flex>
          </form>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Login;
