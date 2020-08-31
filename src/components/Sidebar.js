import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";

const Sidebar = () => {
    const { user } = isAuthenticated();

    return (
        <ul
            className="navbar-nav bg-gradient-warning sidebar sidebar-dark accordion"
            id="accordionSidebar"
        >
            {/* Sidebar - Brand */}
            <a
                className="sidebar-brand d-flex align-items-center justify-content-center"
                href="index.html"
            >
                {/* <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div> */}
                <div className="sidebar-brand-text mx-3">Sarvam</div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            {/* <div className="sidebar-heading">
                Interface
            </div> */}
            {user && user.role === 9 && <>
                <li className="nav-item">
                    <Link className="nav-link" to="/admindash/categories">
                        <i className="fas fa-fw fa-folder" />
                        <span>Categories</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admindash/products">
                        <i className="fas fa-fw fa-folder" />
                        <span>Products</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admindash/services">
                        <i className="fas fa-fw fa-folder" />
                        <span>Services</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/admindash/users">
                        <i className="fas fa-fw fa-user" />
                        <span>Users</span>
                    </Link>
                </li>
            </>
            }
            {
                user && user.role === 5 && <>
                    {user.vflag === false &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/vendordash/vendor_products">
                            <i className="fas fa-fw fa-folder" />
                            <span>Products</span>
                        </Link>
                    </li>
                    }
                    {user.vflag === true &&
                    <>                
                    <li className="nav-item">
                        <Link className="nav-link" to="/vendordash/vendor_services">
                            <i className="fas fa-fw fa-folder" />
                            <span>My Services</span>
                        </Link>
                    </li>
                    </>
                    }             
                    <li className="nav-item">
                        <Link className="nav-link" to="/vendordash/vendor_invoices">
                            <i className="fas fa-fw fa-folder" />
                            <span>Invoices</span>
                        </Link>
                    </li>
                </>
            }
            {/* <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div> */}
        </ul>
    );
};

export default Sidebar;
