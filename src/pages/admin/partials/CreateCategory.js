import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { createCategory } from "../helpers/admin_api_calls";
import message from "@davistran86/notification";


const CreateCategory = ({ showAdd, handleClose, doRefresh }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    message.info("Please wait adding Category!");
    const formData = new FormData();
    for(var k in data){
        if(k=="thumbnail") formData.append("thumbnail",data.thumbnail[0])
        else formData.append(k,data[k])
    }
    createCategory(formData).then(result => {
      if (result.error) {
        message.error(result.error)
      }
      else {
        message.success(result.message)
        doRefresh()
      }
    }).catch(error => { message.error(error) })
  }

  return (
    <>
      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault() }}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" required className="form-control" name="title" ref={register}/>
            </div>
            <div className="form-group">
              <label>Thumbnail</label>
              <input type="file" required className="form-control" name="thumbnail" ref={register} accept="image/jpeg,image/x-png,image/jpg"/>
            </div>
            <select className="form-control" defaultValue="false" name="is_service" ref={register}>
                <option value="false">PRODUCT CATEGORY</option>
                <option value="true">SERVICE CATEGORY</option>
            </select>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Add Category</button>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateCategory