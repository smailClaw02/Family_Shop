import { Link, Outlet } from "react-router-dom";
import logo from "../images/logo_pro.png";

function Header() {
    return (
        <div id="head" className="shadow">
            <div className="row align-items-center">
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
                <div className="h4 col-11 row justify-content-between">
                    {/* Name Site */}
                    <Link to={'/'} className="h4 col-8 text-secondary">Family Shop</Link>
                    <Link to={'/Categories'} className="col-auto mx-2 btn btn-info text-white" >Categories</Link>
                    <Link to={'/MyOrders'} className="col-auto mx-2 btn btn-warning text-white" >My Orders</Link>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Header;