import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { createService } from "../helpers/api_calls";
import { isAuthenticated } from '../../../helpers/auth';
import message from "@davistran86/notification";


const CreateService = ({ show, handleClose, doRefresh, subCategories }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    message.info("Please wait enrolling in service!"); 
    createService(data).then(result => {
      if (result.error) {
        message.error(result.error)
      }
      else {
        message.success(result.message)
        doRefresh()
        handleClose()
      }
    }).catch(error => { message.error(error) })
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className="form-group">
              <label>Category</label>
              <select className="form-control" defaultValue="false" name="parent_sub_category" ref={register}>
                { subCategories && subCategories.length> 0 && subCategories.map((s,i)=>(
                  <option key={s._id} value={s._id}>{s.title}</option>
                ))
                }
              </select>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" min={0} required className="form-control" name="price" ref={register} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Add</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateService
