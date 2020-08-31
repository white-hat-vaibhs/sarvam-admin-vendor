import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { createProduct } from "../helpers/api_calls";
import { isAuthenticated } from '../../../helpers/auth';
import message from "@davistran86/notification";


const CreateProduct = ({ show, handleClose, setRefresh }) => {
  const { register, handleSubmit } = useForm();

  const { token } = isAuthenticated()

  const onSubmit = data => {
    message.info("Please wait adding product!");
    const formData = new FormData();
    for(var k in data){
        if(k=="thumbnail") formData.append("thumbnail",data.thumbnail[0])
        else formData.append(k,data[k])
    }
    createProduct(formData, token).then(result => {
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" required className="form-control" name="title" ref={register} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" required className="form-control" name="description" ref={register} />
            </div> <div className="form-group">
              <label>Thumbnail</label>
              <input type="file" required className="form-control" name="thumbnail" ref={register} />
            </div> <div className="form-group">
              <label>Unit of measurment</label>
              <input type="text" required className="form-control" name="unit_of_measurment" ref={register} />
            </div> <div className="form-group">
              <label>Price</label>
              <input type="number" min={0} required className="form-control" name="price" ref={register} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Add Product</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateProduct
