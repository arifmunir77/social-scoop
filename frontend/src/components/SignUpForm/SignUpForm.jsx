import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserAuthHook from "../../hooks/useAuth";
import registraionImg from "../../assets/images/signup-image.jpg";
import Loading from "../loaders/loading";
import ToastMessage from "../toastMessage";
import { Link } from "react-router-dom";

function SignUpPage() {
  const { signUp } = UserAuthHook();
  const [isLoading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      setLoading(true);
      const user = await signUp(values);
      console.log("usss", user);

      if (user) {
        resetForm();
        ToastMessage("User has been Created Successfully", "", "success");
        setLoading(false);
      }
    } catch (err) {
      console.log("errr", err?.response?.data?.message);
      let res = err?.response?.data?.message;
      ToastMessage(res, "", "error");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {isLoading && <Loading content="Loading" />}
      <div className="formWrapper">
        <div className="row align-items-center  ">
          <div className="col-lg-6">
            <h3>Sign Up</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group me-5">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control my-3 inputFields"
                      placeholder="  Enter Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-group me-5">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control  my-3"
                      placeholder="  Enter Your Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message "
                    />
                  </div>

                  <div className="form-group me-5">
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="form-control  my-3"
                      placeholder="  Enter Your Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-group me-5">
                    <Field
                      type="password"
                      id="confirm"
                      name="confirm"
                      className="form-control"
                      placeholder="  Enter Confirm Password"
                    />
                    <ErrorMessage
                      name="confirm"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <br />

                  <button
                    type="submit"
                    className="btn  registerBtn"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-lg-6">
            <div className="d-flex justify-content-center ">
              <img src={registraionImg} alt="" />
            </div>
            <p className="text-center signText">
              Already Member <Link to="/">Sign In</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
