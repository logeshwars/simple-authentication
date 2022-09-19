import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import { useMutation } from "react-query";
import { loginRequest } from "../axios";
import Inputs from "../components/Inputs";
import {
  AuthContext,
  LoadingContext,
  NotificationContext,
} from "../contexts/MainContext";
import login from "../lottiefiles/login.json";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordInput from "../components/PasswordInput";
const Login = () => {
  const mutation = useMutation(loginRequest);
  const [logged, setLogged] = useContext(AuthContext);
  const navigate = useNavigate();
  const [keepLogged, setKeepLogged] = useState(false);
  useEffect(() => {
    if (logged) navigate("/", { replace: true });
  }, [logged, navigate]);
  const setNotification = useContext(NotificationContext);
  const setLoading = useContext(LoadingContext);
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      mutation.mutate(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: (data, variables, context) => {
            if (
              data.data.message === "Logged in Successfully" &&
              data.status === 202
            ) {
              setLogged(true);
            }
          },
          onError: (error, variables, context) => {
            setNotification(error.response.data.message);
          },
        }
      );
      setLoading(false);
    },
  });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="center-elm">
      <div className="form-container">
        <div className="text-center space-y-2">
          <Lottie options={defaultOptions} height={100} width={100} />
          <h1 className="text-3xl font-semibold">Sign in</h1>
          <h3 className="text-gray-500">
            Welcome back! Enter your email and password below to sign in
          </h3>
        </div>
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <Inputs
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            label="Email"
            istouched={formik.touched.email}
            error={formik.errors.email}
            onBlur={formik.handleBlur}
          />
          <PasswordInput
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
            placeholder="Enter your password"
            label="Password"
            istouched={formik.touched.password}
            error={formik.errors.password}
            onBlur={formik.handleBlur}
          />

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-2">
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
                <span
                  className={keepLogged ? "after:border-primary" : undefined}
                ></span>
              </label>
              <label className="text-gray-500 text-sm">keep me logged in</label>
            </div> */}
            <Link to="*" className="text-primary">
              Forget password!
            </Link>
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Sign in
          </button>
        </form>
        <div className="text-center text-base text-gray-400 ">
          Don't have an account?
          <Link to="/register" className="text-blue-700 underline">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
