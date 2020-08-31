import React, { useEffect, useState } from "react";
import Default from "../../base/Default";
import message from "@davistran86/notification";
import { getServices, deleteService } from "./helpers/admin_api_calls";

const Services = (props) => {
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const doRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    message.info("Hold on! Loading Services!");
    getServices()
      .then((data) => {
        setServices(data);
        console.log(data);
        message.success("Services Loaded!");
      })
      .catch((err) =>
        message.error(
          "Faild updating service's list. Error Message: " + err.message
        )
      );
  }, [refresh]);

  const handleDeleteService = (id) => {
    const ans = window.confirm(`Are you sure you want to delete ${id}?`);
    if (ans) {
      deleteService(id)
        .then((data) => {
          message.success(`Service with id ${id} deleted successfully`);
          doRefresh();
        })
        .catch((err) => {
          message.info(
            `Deleting '${id}' failed with message: ${err.message}`
          );
        });
    }
  };

  return (
    <>
      <Default pageTitle="Services">
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
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Vendor Username</th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Vendor Username</th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  {services.map((s, i) => (
                    <tr key={i}>
                      <td>{s.parent_sub_category.title}</td>
                      <td>{s.price}</td>
                      <td>{s.vendor_id.username }</td>
                      <td>{s.vendor_id.username}</td>
                      <td>
                      <button
                          className="btn btn-danger btn-sm btn-circle ml-3"
                          onClick={() => {
                            handleDeleteService(s._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>                        
                      </td>
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

export default Services;
