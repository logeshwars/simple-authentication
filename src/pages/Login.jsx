import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import { useMutation } from "react-query";
import { loginRequest } from "../axios";
import Inputs from "../components/Inputs";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const mutation = useMutation(loginRequest);
  const [logged, getToken, setLogState] = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("logeshwar@gmail.com");
  const [password, setPassword] = useState("12345");
  const [keepLogged, setKeepLogged] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data, variables, context) => {
          if (
            data.data.message === "Logged in Successfully" &&
            data.status === 202
          ) {
            setLogState(true);
            navigate("/dashboard", { replace: true });
          }
        },
        onError: (error, variables, context) => {
          setErrMessage(error.response.data.message);
        },
      }
    );
  };
  return (
    <div className="center-elm">
      <div className="p-2  w-[400px] flex flex-col gap-3">
        <div className="text-center space-y-2">
          {/* <Lottie
            loop
            animationData="https://assets9.lottiefiles.com/private_files/lf30_iraugwwv.json"
            play
            style={{ width: 150, height: 150 }}
          /> */}
          <h1 className="text-3xl font-semibold">Sign in</h1>
          <h3 className="text-gray-500">
            Welcome back! Enter your email and password below to sign in
          </h3>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Inputs
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            className="form-input"
            type="email"
            placeholder="Enter your email"
            label="Email"
          />

          <Inputs
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="form-input"
            value={password}
            type="password"
            placeholder="Enter your password"
            label="Password"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label
                className={`custom-check-box ${
                  keepLogged ? "border-primary" : undefined
                }`}
              >
                <input
                  onChange={() => setKeepLogged((prev) => !prev)}
                  type="checkbox"
                  name=""
                  id=""
                />
                <span className={keepLogged && "after:border-primary"}> </span>
              </label>
              <label className="text-gray-500 text-sm">keep me logged in</label>
            </div>
            <Link to="*" className="text-primary">
              Forget password!
            </Link>
          </div>
          {mutation.isError && (
            <label className="text-red-600 text-center text-base">
              {errMessage}
            </label>
          )}
          <button className="login-btn">Sign in</button>
        </form>
        <div className="text-center text-base text-gray-400 ">
          Don't have an account?
          <Link to="/register" className="text-black underline">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
