import React, { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../axios/";
import Inputs from "../components/Inputs";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  AuthContext,
  LoadingContext,
  NotificationContext,
} from "../contexts/MainContext";
import PasswordInput from "../components/PasswordInput";

const Register = () => {
  const mutation = useMutation(registerRequest);
  const navigate = useNavigate();
  const [logged, setLogged, getToken] = useContext(AuthContext);
  const setNotification = useContext(NotificationContext);
  const setLoading = useContext(LoadingContext);
  const validationSchema = yup.object({
    userName: yup
      .string("Enter your Name")
      .min(3, "Name should be of minimum 3 characters length")
      .max(20, "Name should be of maximum 20 characters length")
      .required("Enter your Name"),
    dob: yup
      .date()
      .required("Enter your date of birth")
      .min(new Date("01-01-1950"))
      .max(new Date()),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirm_password: yup
      .string("Enter the confirm password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      dob: "",
      userName: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      mutation.mutate(
        {
          email: values.email,
          password: values.password,
          dob: values.dob,
          confirm_password: values.confirm_password,
          userName: values.userName,
        },
        {
          onSuccess: (data, variables, context) => {
            console.log("success", data);
            if (
              data.data.message === "User created successfully" &&
              data.status === 201
            ) {
              setLoading(false);
              setNotification(data.data.message);
              navigate("/login", { replace: true });
            }
          },
          onError: (error, variables, context) => {
            setLoading(false);
            setNotification(error.response.data.message);
          },
        }
      );
    },
  });
  return (
    <div className="center-elm">
      <div className="form-container ">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Register</h1>
          <h3 className="text-gray-500">
            Join us! Enter the correct details to create your account
          </h3>
        </div>
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <Inputs
            onChange={formik.handleChange}
            value={formik.values.userName}
            name="userName"
            type="text"
            placeholder="Enter your Name"
            label="Name"
            onBlur={formik.handleBlur}
            istouched={formik.touched.userName}
            error={formik.errors.userName}
            maxLength={20}
            minLength={3}
          />
          <Inputs
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            placeholder="Enter your email"
            label="Email"
            onBlur={formik.handleBlur}
            istouched={formik.touched.email}
            error={formik.errors.email}
            minLength={8}
          />
          <Inputs
            onChange={formik.handleChange}
            value={formik.values.dob}
            name="dob"
            type="date"
            min="1922-01-01"
            max={new Date().toISOString().split("T")[0]}
            placeholder="Enter your DOB"
            label="Birth Date"
            onBlur={formik.handleBlur}
            istouched={formik.touched.dob}
            error={formik.errors.dob}
          />
          <PasswordInput
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
            placeholder="Enter your password"
            label="Password"
            onBlur={formik.handleBlur}
            istouched={formik.touched.password}
            error={formik.errors.password}
            minLength={8}
          />
          <PasswordInput
            onChange={formik.handleChange}
            name="confirm_password"
            value={formik.values.confirm_password}
            placeholder="ReEnter your password"
            label="Confirm password"
            onBlur={formik.handleBlur}
            istouched={formik.touched.confirm_password}
            error={formik.errors.confirm_password}
            minLength={8}
          />
          <button
            className="login-btn"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Register
          </button>
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
