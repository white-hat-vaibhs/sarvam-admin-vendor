import React from 'react'
import { Link } from "react-router-dom"

const ForgotPassword = () => {
    return (
        <div className="container">
            {/* Outer Row */}
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{backgroundImage: `url('https://sarvamsmiles.com/assets/images/sarvam-delivery.png')`}}/>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Forgot Password</h1>
                                        </div>
                                        <form className="user">
                                            <div className="form-group">
                                                <input type="number" min={0} className="form-control form-control-user" aria-describedby="contactNumberHelp" placeholder="Enter Contact Number" />
                                            </div>
                                            <button href="index.html" className="btn btn-primary btn-user btn-block">
                                                Get OTP
                                            </button>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/signin">Signin</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to="/signup">Create an Account!</Link>
                                        </div>
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

export default ForgotPassword
