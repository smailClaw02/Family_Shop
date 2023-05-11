import { Link, Outlet } from "react-router-dom";
import logo from "../images/logo_pro.png";

function HeaderAdmin() {
    return (
        <div id="head" className="shadow">
            <div className="row align-items-center mb-4">
                {/* Logo */}
                <div className="col-1">
                    <img
                        src={logo}
                        alt="Logo"
                        className="rounded-circle shadow-sm mx-3 border"
                        style={{ width: "6rem", height: "5rem" }}
                    />
                </div>
                {/* All nav */}
                <div className="h4 col-11 row ">
                    {/* Name Site */}
                    <Link to={'/Admin/Products'} className="h4 col-7 text-secondary">Family Shop</Link>
                    <Link to={'/Admin/Categories'} className="col-1 mx-2 btn btn-primary text-white" >Categories</Link>
                    <Link to={'/Admin/Products'} className="col-1 mx-2 btn btn-primary text-white" >Products</Link>
                    <Link to={'/Admin/Orders'} className="col-1 mx-2 btn btn-primary text-white" >Orders</Link>
                    <Link to={'/Admin/Users'} className="col-1 mx-2 btn btn-primary text-white" >Users</Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default HeaderAdmin;