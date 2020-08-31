import React from 'react'
import { verify_otp } from "../../helpers/auth";
import { useForm } from "react-hook-form";
import message from "@davistran86/notification";
import { Link } from 'react-router-dom';

const SignIn = ({ pageTitle = "Verify OTP", contactNo = null }) => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        verify_otp(data).then(result => {
            if (result.error) {
                message.error(result.error)
            }
            else {
                message.success(result.message)
            }
        }).catch(error => { message.error(error) })
    }

    return (
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ backgroundImage: `url('https://sarvamsmiles.com/assets/images/sarvam-delivery.png')` }} />
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">{pageTitle}</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <input type="number" value={contactNo} min={0} className="form-control" placeholder="Contact Number" name="contact_no" ref={register} />
                                            </div>
                                            <div className="form-group">
                                                <input type="number" min={0} className="form-control" placeholder="Enter OTP" name="otp" ref={register} />
                                            </div>
                                            <button className="btn btn-primary btn-block">
                                                Verify
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                        <Link className="small" to="/signin">
                                            Sign In
                                        </Link>
                                        </div>
                                        <div className="text-center">
                                        <Link className="small" to="/forgot_password">
                                            Create New Account 
                                        </Link>
                                        </div>
                                        {/* <div className="text-center">
                                        <Link className="small" to="/forgot_password">
                                            Forgot Password ?
                                        </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
