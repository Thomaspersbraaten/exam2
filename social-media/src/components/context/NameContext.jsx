import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// Stores the name of the logged in user. Usefull when checking if the posts or profiles is the logged in users.
export const NameContext = createContext([null, () => {}]);
export const NameProvider = (props) => {
  const [authName, setAuthName] = useLocalStorage("authname", null);
  return <NameContext.Provider value={[authName, setAuthName]}>{props.children}</NameContext.Provider>;
};
