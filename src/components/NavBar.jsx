import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { logoutRequest } from "../axios";
import { AuthContext, UserContext } from "../contexts/MainContext";
import { RiLogoutCircleRLine } from "react-icons/ri";
const NavBar = () => {
  const [logged, setLogged] = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  const handleLogout = async () => {
    logoutRequest()
      .then((res) => {
        if (
          res.status === 200 &&
          res.data.data.message === "Logged out successfully"
        ) {
          setLogged(false);
          setUser(null);
          console.log(logged);
        }
      })
      .catch((err) => {
        console.log("logout error", err.message);
        setLogged(false);
        setUser(null);
      });
  };
  console.log("user", user);
  return (
    <>
      <div className="navbar bg-white">
        <div className="navbar-logo">
          <img src="images/friends.png" alt="" />
          <h3>Users</h3>
        </div>

        <div className="navbar-menu px-4 py-2 border  shadow rounded-full hover:bg-slate-200 hover:cursor-pointer flex gap-1 items-center">
          {user && <p>{user.userName}</p>}
          <button onClick={handleLogout}>
            <RiLogoutCircleRLine className="text-2xl text-red-500 " />
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
