import { createContext } from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
