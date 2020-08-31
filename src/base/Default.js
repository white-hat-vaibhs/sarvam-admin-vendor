import React from 'react'
import Sidebar from "../components/Sidebar"
import Nav from "../components/Nav"


const Default = ({ children, pageTitle = "" }) => {
    return (
        <div>
            {/* Page Wrapper */}
            <div id="wrapper">
                <Sidebar />
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <Nav />
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            <h1 className="h3 mb-4 text-gray-800">{pageTitle}</h1>
                            {children}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © sarvam 2020 | All rights reserved</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
        </div>
    )
}

export default Default
