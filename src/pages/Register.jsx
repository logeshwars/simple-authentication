import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../axios/";
import Inputs from "../components/Inputs";
import { Link } from "react-router-dom";

const Register = () => {
  const mutation = useMutation(registerRequest);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    dob: "",
    userName: "",
    confirm_password: "",
  });
  console.log(userData);
  const [errMessage, setErrMessage] = useState("");
  const handleChange = (e, key) => {
    setUserData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate(
      {
        email: userData.email,
        password: userData.password,
        dob: userData.dob,
        confirm_password: userData.confirm_password,
        userName: userData.userName,
      },
      {
        onSuccess: (data, variables, context) => {
          console.log("success", data);
          if (
            data.data.message === "User created successfully" &&
            data.status === 201
          ) {
            navigate("/login", { replace: true });
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
          <h1 className="text-3xl font-semibold">Register</h1>
          <h3 className="text-gray-500">
            Join us! Enter the correct details to create your account
          </h3>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Inputs
            onChange={(e) => handleChange(e, "userName")}
            value={userData.userName}
            className="form-input"
            type="text"
            placeholder="Enter your Name"
            label="Name"
          />
          <Inputs
            onChange={(e) => handleChange(e, "email")}
            value={userData.email}
            className="form-input"
            type="email"
            placeholder="Enter your email"
            label="Email"
          />
          <Inputs
            onChange={(e) => handleChange(e, "dob")}
            className="form-input"
            value={userData.dob}
            type="date"
            placeholder="Enter your DOB"
            label="Birth Date"
          />
          <Inputs
            onChange={(e) => handleChange(e, "password")}
            className="form-input"
            value={userData.password}
            type="password"
            placeholder="Enter your password"
            label="Password"
          />
          <Inputs
            onChange={(e) => handleChange(e, "confirm_password")}
            className="form-input"
            value={userData.confirm_password}
            type="password"
            placeholder="ReEnter your password"
            label="Confirm password"
          />
          {mutation.isError && (
            <label className="text-red-600 text-center text-base">
              {errMessage}
            </label>
          )}
          <button className="login-btn">Register</button>
        </form>
        <div className="text-center text-base text-gray-400 ">
          Already have an account
          <Link to="/login" className="text-black underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
