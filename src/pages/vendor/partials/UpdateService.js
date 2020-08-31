import React from 'react'
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { updateService } from "../helpers/api_calls";
import { isAuthenticated } from '../../../helpers/auth';
import message from "@davistran86/notification";


const UpdateService = ({ showUpdate, handleClose, doRefresh, serviceInfo }) => {
    const { register, handleSubmit } = useForm();
    const { token } = isAuthenticated()
    
    const onSubmit = data => {
        message.info("Please wait updating service!");
        updateService(serviceInfo.id, data).then(result => {
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
            <Modal show={showUpdate} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update {serviceInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                       <div className="form-group">
                            <label>Price</label>
                            <input type="number" min={0} className="form-control" name="price" ref={register} defaultValue={serviceInfo.price} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>Update</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateService
