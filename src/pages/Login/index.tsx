import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Logo } from "../../components/Logo";
import TokenPayload from "../../@types/TokenPayload";
import AuthContext from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

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
  const toast = useToast();

  const authCtx = useContext(AuthContext);

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      error.graphQLErrors.forEach((gqlError) => {
        const errors = gqlError.extensions.response as {
          error: string;
          statusCode: number;
          message: string[];
        };

        Array(errors.message)
          .flat()
          .forEach((errorMessage) => {
            toast({
              variant: "left-accent",
              status: "error",
              title: errors.error,
              description: errorMessage,
              duration: 1000,
              position: "bottom-right",
            });
          });
      });
    },
    onCompleted: (data) => {
      authCtx.handleLogin(data.login as TokenPayload);
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();

    login({ variables: { email, password } });
  };

  if (authCtx.isAuthenticated())
    return (
      <Navigate to={authCtx.isAdmin() ? "/dashboard" : "/registers"} replace />
    );

  return (
    <Flex
      height="100vh"
      direction={{ md: "column", lg: "row" }}
      bg="blackAlpha.900"
      alignItems="center"
      overflow="auto"
    >
      <Logo w="400px" marginBottom={{ md: "3rem", lg: "none" }} />
      <Flex width="100%" justifyContent="flex-end">
        <Box
          height="650px"
          width="650px"
          bgImage="url(shape.svg)"
          bgSize="cover"
          backgroundPosition="left"
          p="4rem"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <form onSubmit={handleSubmit}>
            <Flex
              direction="column"
              gap="1rem"
              bg="white"
              borderRadius="2rem"
              p="2rem"
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
                bgColor="green.400"
                color="white"
                _hover={{ bgColor: "green.300" }}
                _active={{ bgColor: "green.500" }}
              >
                Login
              </Button>
            </Flex>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
