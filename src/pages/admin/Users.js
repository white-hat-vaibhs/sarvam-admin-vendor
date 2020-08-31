import React, { useEffect, useState } from "react";
import Default from "../../base/Default";
import message from "@davistran86/notification";
import { getUsers } from "./helpers/admin_api_calls";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    message.info("Hold on! Loading Users!");
    getUsers()
      .then((data) => {
        setUsers(data);
        console.log(data);
        message.success("Users Loaded!");
      })
      .catch((err) =>
        message.error(
          "Faild updating user's list. Error Message: " + err.message
        )
      );
  }, []);

  return (
    <>
      <Default pageTitle="Users">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing={0}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Shop Name</th>
                    <th>Street Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pincode</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>ID</th>
                    <th>Phone</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Status</th>
                    <th>Type</th>
                    <th>Shop Name</th>
                    <th>Street Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Pincode</th>                    
                    <th>Created At</th>
                    <th>Updated At</th>                    
                  </tr>
                </tfoot>
                <tbody>
                  {users.map((c, i) => (
                    <tr key={i}>
                      <td>{c._id}</td>
                      <td>{c.contact_no}</td>
                      <td>{c.username}</td>
                      <td>{c.firstname ? c.firstname + " " + c.lastname : "N/A"}</td>
                      <td>
                        {c.verified ? (
                          <strong style={{ color: "green" }}>VERIFIED</strong>
                        ) : (
                          <strong style={{ color: "red" }}>NOT VERIFIED</strong>
                        )}
                      </td>
                      <td>{c.role === 5 ? "VENDOR" : c.role === 9? "ADMIN" : "CUSTOMER" }</td>
                      <td>{c.shop_name ? c.shop_name : "N/A"}</td>
                      <td>{c.street_address ? c.street_address : "N/A"}</td>
                      <td>{c.city ? c.city : "N/A"}</td>
                      <td>{c.state ? c.state : "N/A"}</td>
                      <td>{c.pincode ? c.pincode : "N/A"}</td>
                      <td><pre>{c.createdAt}</pre></td>
                      <td><pre>{c.updatedAt}</pre></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Default>
    </>
  );
};

export default Users;
