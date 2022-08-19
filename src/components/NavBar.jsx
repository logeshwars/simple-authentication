import { logDOM } from "@testing-library/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { logoutRequest } from "../axios";
import useAuth from "../hooks/useAuth";
const NavBar = () => {
  const [logged, getToken, setLogState] = useAuth();
  console.log(useAuth());
  const handleLogout = async () => {
    logoutRequest()
      .then((res) => {
        if (
          res.data.status === 200 &&
          res.data.data.message === "Logged out successfully"
        ) {
          setLogState(false);
          console.log(logged);
        }
      })
      .catch((err) => {
        getToken();
      });
  };
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src="images/friends.png" alt="" />
          <h3>Users</h3>
        </div>
        <div className="navbar-menu">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
