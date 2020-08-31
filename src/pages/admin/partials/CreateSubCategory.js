import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { createSubCategory } from "../helpers/admin_api_calls";
import message from "@davistran86/notification";


const CreateSubCategory = (props) => {
  const { parentCatId , showAdd, handleClose, doRefresh, match } = props;
  const { register, handleSubmit } = useForm();
  const [categoryId, setCategoryId] = useState("")

  const onSubmit = data => {
    message.info("Please wait adding Sub Category!");
    const formData = new FormData();
    for(var k in data){
        if(k=="thumbnail") formData.append("thumbnail",data.thumbnail[0])
        else formData.append(k,data[k])
    }
    console.log(data)
    createSubCategory(formData).then(result => {
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
      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <input hidden readOnly value={parentCatId} name="parent_category_id" ref={register}/>
            <div className="form-group">
              <label>Title</label>
              <input type="text" required className="form-control" name="title" ref={register}/>
            </div>
            <div className="form-group">
              <label>Thumbnail</label>
              <input type="file" required className="form-control" name="thumbnail" ref={register} accept="image/jpeg,image/x-png,image/jpg"/>
            </div>
            <div className="form-group">
              <label>Unit of measurment</label>
              <input type="text" required className="form-control" name="unit_of_measurment" ref={register}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Add SubCategory</button>
          <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
        </Modal.Footer>        
      </Modal>
    </>
  )
}

export default CreateSubCategory