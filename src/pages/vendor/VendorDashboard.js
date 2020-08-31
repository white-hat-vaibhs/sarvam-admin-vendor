import React from 'react'
import Default from '../../base/Default'
import { isAuthenticated } from "../../helpers/auth"
// import { useForm } from "react-hook-form";

const VendorDashboard = () => {
    // const { register, handleSubmit } = useForm();

    // const onSubmit = data => console.log(data)

    return (
        <Default pageTitle="Vendor Dashboard">
            <h1>Welcome {isAuthenticated() && isAuthenticated().user.username}</h1>
        </Default>
    )
}

export default VendorDashboard;