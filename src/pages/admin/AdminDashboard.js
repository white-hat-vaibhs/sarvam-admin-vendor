import React from 'react'
import Default from '../../base/Default'
import { isAuthenticated } from "../../helpers/auth"
const AdminDashboard = () => {
    return (
        <Default pageTitle="Admin Dashboard">
            <h1>Welcome {isAuthenticated() && isAuthenticated().user.username}</h1>
        </Default>
    )
}

export default AdminDashboard
