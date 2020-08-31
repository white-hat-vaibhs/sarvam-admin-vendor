import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { updateProduct, getProduct } from "../helpers/api_calls";
import { isAuthenticated } from '../../../helpers/auth';
import message from "@davistran86/notification";


const UpdateProduct = ({ showEdit, handleClose, setRefresh, productInfo }) => {
    const { register, handleSubmit } = useForm();
    const { token } = isAuthenticated()

    const { id, title, thumbnail, description, unit_of_measurment, price } = productInfo

    const onSubmit = data => {
        message.info("Please wait updating product!");
        const formData = new FormData();
        for (var k in data) {
            if (k == "thumbnail" && data[k].length != 0) formData.append("thumbnail", data.thumbnail[0])
            if (k == "thumbnail" && data[k].length != 0) console.log(1)
            else formData.append(k, data[k])
        }
        updateProduct(id, formData, token).then(result => {
            if (result.error) {
                message.error(result.error)
            }
            else {
                message.success(result.message)
                setRefresh(true)
            }
        }).catch(error => { message.error(error) })
    }

    return (
        <>
            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" required className="form-control" name="title" ref={register} defaultValue={title} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" required className="form-control" name="description" ref={register} defaultValue={description} />
                        </div> <div className="form-group">
                            <label>Thumbnail</label>
                            <input type="file" required className="form-control" name="thumbnail" ref={register} />
                        </div> <div className="form-group">
                            <label>Unit of measurment</label>
                            <input type="text" required className="form-control" name="unit_of_measurment" ref={register} defaultValue={unit_of_measurment} />
                        </div> <div className="form-group">
                            <label>Price</label>
                            <input type="number" min={0} required className="form-control" name="price" ref={register} defaultValue={price} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Update Product</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateProduct
