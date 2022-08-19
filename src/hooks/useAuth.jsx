import { logDOM } from "@testing-library/react";
import { useEffect, useState } from "react";
import { generateToken } from "../axios";

const useAuth = () => {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = () => {
    let status = true;
    generateToken()
      .then((res) => {
        status = true;
        setLogged(true);
      })
      .catch((err) => {
        console.log(err.message);
        status = false;
        setLogged(false);
        console.log("finieshed", logged);
      });
    return status;
  };
  const setLogState = (value) => {
    setLogged(value);
  };
  return [logged, getToken, setLogState];
};
export default useAuth;
