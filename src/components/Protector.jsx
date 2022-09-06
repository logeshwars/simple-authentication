import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/MainContext";
import Loading from "./Loading";

const Protector = ({ Component }) => {
  const [logged] = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!logged) navigate("/login");
  }, [logged, navigate]);
  return <div>{logged ? <Component /> : <Loading />}</div>;
};

export default Protector;
