import { UserContext } from "../contexts/MainContext";
import { useContext } from "react";
const useAuth = () => useContext(UserContext);
export default useAuth;
