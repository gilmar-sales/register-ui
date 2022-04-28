import { gql, useQuery } from "@apollo/client";
import React, { createContext, useEffect } from "react";

import User from "../@types/User";
import usePersistedState from "../hooks/usePersistedState";

type UserContextProps = {
  user: User;
  isAdmin: () => boolean;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      email
      role
    }
  }
`;

export const UserContextProvider: React.FC = (props) => {
  const [user, setUser] = usePersistedState<User>("@user", {} as User);
  const { data, loading } = useQuery(GET_USER);

  useEffect(() => {
    if (data?.getUser) setUser(data?.getUser as User);
  }, [loading, data, setUser]);

  const isAdmin = () => {
    return user.role === "administrator";
  };

  return (
    <UserContext.Provider value={{ user: user, isAdmin: isAdmin }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
