import React, {useEffect, useState} from 'react'
import Default from "../../base/Default";
import {getVendorServices, getOptableSubCategoriesByVendor, deleteService} from "./helpers/api_calls"
import {useForm} from 'react-hook-form'
import message from "@davistran86/notification";
import CreateService from './partials/CreateService';
import { isAuthenticated } from '../../helpers/auth';
import UpdateService from './partials/UpdateService';

const VendorServices = () => {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [serviceInfo, setServiceInfo] = useState({})
    const [services, setServices] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const doRefresh = () => setRefresh(!refresh)
    const handleClose = () => { setShow(false); setShowUpdate(false) };

    const { user } = isAuthenticated();

    const getData = () => {

        getVendorServices(user._id).then((res) => {
            if (res.error) {
                message.info(res.error);
            } else {
                message.success("Services Loaded!");
                setServices(res);
            }
        }).catch((err) => message.error("Loading services failed"));

        getOptableSubCategoriesByVendor().then((res) => {
            if (res.error) {
                message.info(res.error);
            } else {
                message.success("Service categories Loaded!");
                setSubCategories(res);
            }
        }).catch((err) => message.error("Loading service categories failed"));

    }

    const handleDeleteService  = (id, title) => {
        const ans = window.confirm(`Are you sure you want to delete ${title}?`);
        if (ans) {
            deleteService(id).then(res => {
                if(res.error){
                    message.error(res.error)
                } else {
                    message.success(`${res.message} ${title}`)
                }
            })
            doRefresh()
        }        
    }

    useEffect(() => {
        message.info("Hold on! Loading information!");
        getData()
    }, [refresh]);
    return (
        <Default pageTitle="Service Sub-Categories">
            <button className="btn btn-warning" onClick={()=>{setShow(true)}}>
                Add Service
            </button>
            <br/>
            <br/>            
            <CreateService show={show} handleClose={handleClose} doRefresh={doRefresh} subCategories={subCategories}/>
            <UpdateService showUpdate={showUpdate} handleClose={handleClose} doRefresh={doRefresh} serviceInfo={serviceInfo} />
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%"
                            cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>Service</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                            <tbody> 
                                { services.length> 0 && services.map((i, index) => (
                                    <tr key={i._id}>
                                        <td>{i.parent_sub_category.title}</td>
                                        <td>{i.price}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary btn-sm btn-circle mr-3"
                                                onClick={() => {
                                                setServiceInfo({ ...serviceInfo, id: i._id, title: i.parent_sub_category.title, price: i.price })
                                                setShowUpdate(true)
                                                }}
                                                >
                                            <i className="fas fa-pen"></i>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm btn-circle mr-3"
                                                onClick={() => {
                                                    handleDeleteService(i._id, i.parent_sub_category.title)
                                                }}
                                            >
                                            <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            } </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Default>
    )
}

export default VendorServices
