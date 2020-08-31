import React, { useEffect, useState } from "react";
import Default from "../../base/Default";
import message from "@davistran86/notification";
import { getProducts,deleteProduct } from "./helpers/admin_api_calls";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const doRefresh = () => setRefresh(!refresh);

  useEffect(() => {
    message.info("Hold on! Loading Products!");
    getProducts()
      .then((data) => {
        setProducts(data);
        console.log(data);
        message.success("Products Loaded!");
      })
      .catch((err) =>
        message.error(
          "Faild updating product's list. Error Message: " + err.message
        )
      );
  }, [refresh]);

  const handleDeleteProduct = (id,title) => {
    const ans = window.confirm(`Are you sure you want to product: ${title}?`);
    if (ans) {
      deleteProduct(id)
        .then((data) => {
          message.success(`${title} deleted successfully`);
          doRefresh();
        })
        .catch((err) => {
          message.info(
            `Deleting '${title}' failed with message: ${err.message}`
          );
        });
    }
  };


  return (
    <>
      <Default pageTitle="Products">
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
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td>{p.title}</td>
                      <td>{p.price}</td>
                      <td>{p.category && p.category.title.length > 0 && p.category.title}</td>
                      <td>{p.vendor_id.username}</td>
                      <td>
                      <button
                          className="btn btn-danger btn-sm btn-circle ml-3"
                          onClick={() => {
                            handleDeleteProduct(p._id, p.title);
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

export default Products;
