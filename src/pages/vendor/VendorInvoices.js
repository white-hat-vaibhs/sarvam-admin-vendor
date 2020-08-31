import React, { useState, useEffect } from 'react'
import Default from "../../base/Default";
import message from "@davistran86/notification";


const Invoices = () => {
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        message.info("No Invoices found")
    }, [])
    
    return (
        <Default pageTitle="Invoices">
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
                                    <th>INVOICE ID</th>
                                    <th>USER ID</th>
                                    <th>TOTAL</th>
                                    <th>TIMESTAMP</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>INVOICE ID</th>
                                    <th>USER ID</th>
                                    <th>TOTAL</th>
                                    <th>TIMESTAMP</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {invoices.map((i, index) => (
                                    <tr key={index}>
                                        <td>{i._id}</td>
                                        <td>{i.user_id}</td>
                                        <td>{i.total}</td>
                                        <td>{i.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Default>
    )
}

export default Invoices