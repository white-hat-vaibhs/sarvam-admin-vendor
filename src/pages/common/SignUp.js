import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { vendor_signup } from "../../helpers/auth";
import message from "@davistran86/notification";
import { getCategories } from "../admin/helpers/admin_api_calls";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const [categories, setCategories] = useState([]);
    const [submitButtonDisableFlag, setSubmitButtonDisableFlag] = useState(false);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        setSubmitButtonDisableFlag(true);
        message.info("Please wait processing request for new account !");
        const formData = new FormData();
        for(var k in data){
            if(k=="shop_thumbnail") formData.append("shop_thumbnail",data.shop_thumbnail[0])
            else formData.append(k,data[k])
        }
        vendor_signup(formData).then(result => {
          if (result.error) {
            message.error(result.error)
          }
          else {
            message.success(result.message)
          }
        }).catch(error => { message.error(error) }).finally(()=>{
            setSubmitButtonDisableFlag(false);
        })
      }

    useEffect(() => {
        getCategories().then((data) => {
            setCategories(data);
        }).catch(error => {
            message.error(error)
        })
    }, []);

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div
                            className="col-lg-5 d-none d-lg-block bg-register-image"
                            style={{
                                backgroundImage: `url('https://storage.googleapis.com/sarvam_bucket_1/static/main.png')`,
                            }}
                        />
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Vendor Sign Up!</h1>
                                </div>
                                <form
                                    className="user"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                name="firstname"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                name="lastname"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                name="username"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            ref={register}
                                            required
                                        />
                                    </div>
                                    {categories.length > 0 && (
                                        <div className="form-group">
                                            <select
                                                className="form-control"
                                                defaultValue={categories[0]._id}
                                                required
                                                name="category_opted"
                                                ref={register}
                                            >
                                                {categories.map((c, i) => (
                                                    <option key={i} value={c._id}>
                                                        {`${c.title} (${c.is_service === true ? 'SERVICE CATEGORY' : 'PRODUCT CATEGORY'})`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Shop Name"
                                                name="shop_name"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <label>Shop Thumbnail</label>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="file"
                                                className="form-control"
                                                placeholder="Shop Thumbnail"
                                                name="shop_thumbnail"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="number"
                                                min={0}
                                                className="form-control"
                                                placeholder="Contact Number"
                                                name="contact_no"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <textarea
                                                type="text"
                                                className="form-control"
                                                placeholder="Street address"
                                                name="street_address"
                                                ref={register}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="number"
                                                min={0}
                                                className="form-control"
                                                placeholder="Pincode"
                                                name="pincode"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="City"
                                                name="city"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="State"
                                                name="state"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-12 mb-3 mb-sm-0">
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Bank Account Number"
                                                name="bank_account_no"
                                                ref={register}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {submitButtonDisableFlag === true ? "" : <button type="submit" className="btn btn-primary btn-block" >Register Account</button>}
                                </form>
                                <hr />
                                {/* <div className="text-center">
                                    <Link className="small" to="/forgot_password">
                                        Forgot Password?
                                    </Link>
                                </div> */}
                                <div className="text-center">
                                    <Link className="small" to="/signin">
                                        Sign In
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
    );
};

export default SignUp;
