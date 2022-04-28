import React, { createContext } from "react";
import TokenPayload from "../@types/TokenPayload";
import usePersistedState from "../hooks/usePersistedState";

type AuthContextProps = {
  tokenPayload: TokenPayload;
  isAuthenticated: () => boolean;
  handleLogin: (tokenPayload: TokenPayload) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthContextProvider: React.FC = (props) => {
  const [tokenPayload, setTokenPayload] = usePersistedState<TokenPayload>(
    "@token_payload",
    { access_token: undefined }
  );

  const handleLogin = (tokenPayload: TokenPayload) => {
    setTokenPayload(tokenPayload);
  };

  const handleLogout = () => {
    setTokenPayload({ access_token: undefined });
  };

  const isAuthenticated = () => {
    return Boolean(tokenPayload.access_token);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        tokenPayload,
        handleLogin,
        handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
