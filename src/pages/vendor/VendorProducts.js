import React, { useEffect, useState } from "react";
import Default from "../../base/Default";
import message from "@davistran86/notification";
import { getProductsByVendorId, deleteProduct } from "./helpers/api_calls";
import { isAuthenticated } from "../../helpers/auth";
import { Button } from "react-bootstrap";
import CreateProduct from "./partials/CreateProduct"
import UpdateProduct from "./partials/UpdateProduct"


const VendorProducts = (props) => {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated()
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const handleClose = () => {
        setShow(false)
        setShowEdit(false)
    };
    const handleShow = () => setShow(true);

    const [productInfo, setProductInfo] = useState({
        id: "", title: "", thumbnail: "", description: "", unit_of_measurment: "", price: null
    })

    useEffect(() => {
        message.info("Hold on! Loading Products!");
        getData()
        setShow(false)
        setShowEdit(false)
    }, [refresh]);

    const getData = () => {
        getProductsByVendorId(user._id)
            .then((data) => {
                setProducts(data);
                message.success("Products Loaded!");
            })
            .catch((err) =>
                message.error(
                    "Faild updating product's list. Error Message: " + err.message
                )
            );
    }

    const handleDeleteProduct = (id, title) => {
        const ans = window.confirm(`Are you sure you want to delete ${title}?`);
        if (ans) {
            deleteProduct(id, token)
                .then((data) => {
                    if (data.error) {
                        message.error(data.error);
                    }
                    else {
                        message.success(data.message);
                        getData();
                    }
                })
                .catch((err) => {
                    message.error(`Deleting failed`);
                });
        }
    };

    return (
        <>
            <Default pageTitle="Products">
                <Button variant="warning" onClick={handleShow}>
                    Add Product
                </Button>
                <br />
                <br />
                {/* modal fro create */}
                <CreateProduct show={show} handleClose={handleClose} setShow={setShow} setRefresh={setRefresh} />
                <UpdateProduct showEdit={showEdit} handleClose={handleClose} setShowEdit={setShowEdit} setRefresh={setRefresh} productInfo={productInfo} />
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
                                        <th>Thumbnail</th>
                                        <th>Unit of measurement</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Title</th>
                                        <th>Thumbnail</th>
                                        <th>Unit of measurement</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {products.map((p, i) => (
                                        <tr key={i}>
                                            <td>{p.title}</td>
                                            <td><img src={"https://storage.googleapis.com/sarvam_bucket_1/" + p.thumbnail} alt="" width="25" /></td>
                                            <td>{p.unit_of_measurment}</td>
                                            <td>{p.price}</td>
                                            <td className="d-flex align-left">
                                                <button
                                                    className="btn btn-primary btn-sm btn-circle mr-3"
                                                    onClick={() => {
                                                        setProductInfo({ ...productInfo, id: p._id, title: p.title, description: p.description, price: p.price, thumbnail: p.thumbnail, unit_of_measurment: p.unit_of_measurment })
                                                        setShowEdit(true)
                                                    }}
                                                >
                                                    <i className="fas fa-pen"></i>
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-sm btn-circle mr-3"
                                                    onClick={() => {
                                                        handleDeleteProduct(p._id, p.title)
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

export default VendorProducts;