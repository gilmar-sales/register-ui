import React, { createContext } from "react";
import jwt_decode from "jwt-decode";

import TokenPayload from "../@types/TokenPayload";
import User from "../@types/User";
import usePersistedState from "../hooks/usePersistedState";

export type AuthContextProps = {
  user: User;
  tokenPayload: TokenPayload;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  handleLogin: (tokenPayload: TokenPayload) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = (props) => {
  const [tokenPayload, setTokenPayload] = usePersistedState(
    "@token_payload",
    {} as TokenPayload
  );
  const [user, setUser] = usePersistedState("@user", {} as User);

  const handleLogin = (tokenPayload: TokenPayload) => {
    setTokenPayload(tokenPayload);

    const user = jwt_decode(tokenPayload.access_token!) as User;
    setUser(user);
  };

  const handleLogout = () => {
    setTokenPayload({} as TokenPayload);
    setUser({} as User);
  };

  const isAdmin = () => {
    return user.role === "administrator";
  };

  const isAuthenticated = () => {
    return Boolean(tokenPayload.access_token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokenPayload,
        isAuthenticated,
        isAdmin,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
