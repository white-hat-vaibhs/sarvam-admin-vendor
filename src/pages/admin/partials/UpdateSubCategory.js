import React from 'react'
import {Modal} from 'react-bootstrap'
import {useForm} from "react-hook-form";
import {updateSubCategory} from "../helpers/admin_api_calls";
import {isAuthenticated} from '../../../helpers/auth';
import message from "@davistran86/notification";


const UpdateSubCategory = (props) => {
    const {showUpdate, handleClose, doRefresh, subCategoryInfo, match} = props
    const {register, handleSubmit} = useForm();
    const {id, title, thumbnail, unit_of_measurment} = subCategoryInfo

    const onSubmit = data => {
        message.info("Please wait updating sub-category!");
        const formData = new FormData();
        for (var k in data) {
            if (data.thumbnail.length !== 0 && k === "thumbnail") {
                formData.append("thumbnail", data.thumbnail[0])
            } else {
                formData.append(k, data[k])
            }
        }
        if (data.thumbnail.length === 0) formData.delete("thumbnail")
        updateSubCategory(id, formData).then(result => {
            if (result.error) {
                message.error(result.error)
            } else {
                message.success(result.message)
                doRefresh();
                handleClose();
            }
        }).catch(error => {
            message.error(error)
        })
    }

    return (
            <Modal show={showUpdate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update SubCategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ (e) => { e.preventDefault() } }>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" defaultValue={title} ref={register}/>
                        </div>
                        <div className="form-group">
                            <label>Thumbnail</label>
                            <input type="file" className="form-control" name="thumbnail" ref={register} accept="image/jpeg,image/x-png,image/jpg"/>
                        </div>
                        <div className="form-group">
                            <label>Unit of measurment</label>
                            <input type="text" className="form-control" name="unit_of_measurment" defaultValue={unit_of_measurment} ref={register}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={ handleSubmit(onSubmit) }>
                        Update SubCategory
                    </button>
                </Modal.Footer>
            </Modal>
    )
}

export default UpdateSubCategory
