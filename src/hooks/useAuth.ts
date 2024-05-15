// react
import { useContext } from "react";

// context
import { AuthContext } from "../context";

export const useAuth = () => {
  return useContext(AuthContext);
};
