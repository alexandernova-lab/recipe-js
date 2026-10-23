import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  // user state
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/user/me", { withCredentials: true })
        .then((res) => {
          const user = res.data;
          if (user) {
            dispatch({ type: "LOGIN", payload: user });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        });
    } catch (error) {
      dispatch({ type: "LOGOUT" });
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
