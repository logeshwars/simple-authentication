import { logDOM } from "@testing-library/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Protector = ({ Component }) => {
  const [logged, getToken] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(logged, getToken());
    if (!logged && !getToken()) navigate("/login");
  }, [logged]);
  console.log("logged status", logged);
  return <div>{logged || getToken() ? <Component /> : <>Loading...</>}</div>;
};

export default Protector;
