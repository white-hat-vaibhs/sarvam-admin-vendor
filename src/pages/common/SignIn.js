import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated, signin, authenticate } from "../../helpers/auth";
import message from "@davistran86/notification";
import { useForm } from "react-hook-form";

const SignIn = () => {

  const { register, handleSubmit } = useForm();
  const { user } = isAuthenticated();
  const [redirect, setRedirect] = useState(false)

  const performRedirect = () => {
    if (redirect || user) {
      if (user && user.role === 9) {
        return <Redirect to="/admindash" />;
      }
      if (user && user.role === 5) {
        return <Redirect to="/vendordash" />;
      }
    }
  };


  const onSubmit = data => {
    signin(data).then(result => {
      if (result.error) {
        message.error(result.error)
      }
      else {
        message.success(result.message)
        result.message = undefined
        authenticate(result, () => {
          setRedirect(true)
        })
      }
    }).catch(error => { message.error(error) })
  }

  return (
    <div className="container">
      {/* Outer Row */}
      {performRedirect()}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div
                  className="col-lg-6 d-none d-lg-block bg-login-image"
                  style={{
                    backgroundImage: `url('https://sarvamsmiles.com/assets/images/sarvam-delivery.png')`,
                  }}
                />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user" onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group">
                        <input
                          type="number"
                          min={0}
                          className="form-control"
                          placeholder="Enter Contact Number"
                          name="contact_no"
                          ref={register}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          ref={register}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </form>
                    <hr />
                    {/* <div className="text-center">
                      <Link className="small" to="/forgot_password">
                        Forgot Password ?
                      </Link>
                    </div> */}
                    <div className="text-center">
                      <Link className="small" to="/signup">
                        Become a Vendor!
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/otp">
                        Verify OTP
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
