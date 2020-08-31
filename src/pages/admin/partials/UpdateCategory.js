import React from 'react'
import {Modal} from 'react-bootstrap'
import {useForm} from "react-hook-form";
import {updateCategory} from "../helpers/admin_api_calls";
import {isAuthenticated} from '../../../helpers/auth';
import message from "@davistran86/notification";


const UpdateCategory = ({showUpdate, handleClose, doRefresh, categoryInfo}) => {
    const {register, handleSubmit} = useForm();
    const {id, title, thumbnail, is_service} = categoryInfo

    const onSubmit = data => {
        message.info("Please wait updating category!");
        const formData = new FormData();
        for (var k in data) {
            if (data.thumbnail.length !== 0 && k === "thumbnail") {
                formData.append("thumbnail", data.thumbnail[0])
            } else {
                formData.append(k, data[k])
            }
        }
        if (data.thumbnail.length === 0) formData.delete("thumbnail")
        updateCategory(id, formData).then(result => {
            if (result.error) {
                message.error(result.error)
            } else {
                message.success(result.message)
                doRefresh();
            }
        }).catch(error => {
            message.error(error)
        })
    }

    return (
            <Modal show={showUpdate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={ (e) => { e.preventDefault() } }>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" required className="form-control" name="title" defaultValue={title} ref={register}/>
                        </div>
                        <div className="form-group">
                            <label>Thumbnail</label>
                            <input type="file" required className="form-control" name="thumbnail" ref={register} accept="image/jpeg,image/x-png,image/jpg"/>
                        </div>
                        {!is_service &&
                        <select defaultValue={is_service} className="form-control" name="is_service" ref={register}>
                            <option value="false">PRODUCT CATEGORY</option>
                            <option value="true">SERVICE CATEGORY</option>
                        </select>
                        }
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={ handleSubmit(onSubmit) }>
                        Update Category
                    </button>
                </Modal.Footer>
            </Modal>
    )
}

export default UpdateCategory
