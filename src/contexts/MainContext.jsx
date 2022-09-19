import { useState, createContext, useEffect } from "react";
import { generateToken, getUserDetails } from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
export const AuthContext = createContext();
export const UserContext = createContext();
export const LoadingContext = createContext();
export const NotificationContext = createContext();
export const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const notify = () => toast(notification);
  const getToken = () => {
    let code = 402;
    generateToken()
      .then((res) => {
        if (
          res.status === 201 &&
          res.data.message === "Token Created Successfully"
        ) {
          code = 201;
          setLogged(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    return code;
  };
  useEffect(() => {
    const loadingTimeout = setTimeout(() => setLoading(false), 1000);
  }, []);
  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    getUserDetails().then((res) => setUser(res.data.data));
  }, [logged]);
  useEffect(() => {
    if (notification !== "") {
      notify();
      setNotification("");
    }
  }, [notification]);
  return (
    <UserContext.Provider value={[user, setUser]}>
      <NotificationContext.Provider value={setNotification}>
        <LoadingContext.Provider value={setLoading}>
          <AuthContext.Provider value={[logged, setLogged, getToken]}>
            {loading ? (
              <Loading />
            ) : (
              <>
                {children}
                <ToastContainer />
              </>
            )}
          </AuthContext.Provider>
        </LoadingContext.Provider>
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
};
