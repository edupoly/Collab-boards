import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../services/userApi";

const Signup = () => {
  const [register] = useSignUpMutation()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      username: Yup.string()
        .min(2, "Username too short!")
        .max(50, "Username too long!")
        .required("Username is required"),
      password: Yup.string()
        // .min(6, "At least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      console.log("values",values);
      let signup = await register(values)
      console.log("signup",signup);

      if (signup?.data?.user) {
        navigate('/login')
      }
    },
  });

  return (
    <div className="loginPage">
      <div className="card p-4 border-0  rounded-4">
        <h2 className="mb-3 text-center fw-bold text-primary fs-4">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-2">
            <input
              type="text"
              className={`form-control form-control-sm ${formik.touched.username && formik.errors.username ? "is-invalid" : ""
                }`}
              id="username"
              placeholder="Username"
              {...formik.getFieldProps("username")}
            />
            <label htmlFor="username" className="small">Username</label>
            {formik.touched.username && formik.errors.username && (
              <div className="invalid-feedback">{formik.errors.username}</div>
            )}
          </div>

          <div className="form-floating mb-2">
            <input
              type="email"
              className={`form-control form-control-sm ${formik.touched.email && formik.errors.email ? "is-invalid" : ""
                }`}
              id="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            <label htmlFor="email" className="small">Email</label>
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className={`form-control form-control-sm ${formik.touched.password && formik.errors.password ? "is-invalid" : ""
                }`}
              id="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <label htmlFor="password" className="small">Password</label>
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className={`form-control form-control-sm ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""
                }`}
              id="confirmPassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
            />
            <label htmlFor="confirmPassword" className="small">Confirm Password</label>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="signup-btn btn btn-primary btn-sm w-100 mb-2 p-2">
            Signup
          </button>
          <div className="text-center mt-2">
            <span className="text-muted small">
              Already a user?{" "}
              <Link to="/login" className="text-primary fw-bold text-decoration-none">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
