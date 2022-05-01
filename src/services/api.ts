import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import TokenPayload from "../@types/TokenPayload";

const wsLink = new WebSocketLink({
  uri: "ws://127.0.0.1:3333/graphql", // use wss for a secure endpoint
  options: {
    reconnect: true,
    connectionParams: () => {
      const { access_token }: TokenPayload = JSON.parse(
        localStorage.getItem("@token_payload") || "{}"
      );

      return {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
    },
  },
});

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:3333/graphql",
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  const { access_token }: TokenPayload = JSON.parse(
    localStorage.getItem("@token_payload") || "{}"
  );

  return {
    headers: {
      ...headers,
      authorization: access_token ? `Bearer ${access_token}` : "",
    },
  };
});

const api = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
});

export default api;
