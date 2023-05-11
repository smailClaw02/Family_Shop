import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";

// Header <===================================================================================)
import Header from "./header";
import HeaderAdmin from "./HeaderAdmin";
import "./style.css";

// ============= Client ======================================================================)
// ============= Products =============)
import ProductList from "../Client/products/ProductList";
import ProductDetails from "../Client/products/ProductDetails";

// ============= Categories =============)
import CategoryList from "../Client/categories/CategoryList";
import CategoryDetails from "../Client/categories/CategoryDefails";

// ============= Commands =============)
import CommandList from "../Client/commands/CommandList";
import Purchase from "../Client/commands/Purchase";

// ============= Admin ======================================================================)
// Products <=================================================================================)
import ProductListA from "../Admin/products/ProductList";
import ProductDetailsA from "../Admin/products/ProductDetails";
import ProductCreate from "../Admin/products/ProductCreate";
import ProductEdit from "../Admin/products/ProductEdit";

// Categories <===============================================================================)
import CategoryListA from "../Admin/categories/CategoryList";
import CategoryDetailsA from "../Admin/categories/CategoryDefails";
import CategoryEdit from "../Admin/categories/CategoryEdit";
import CategoryCreate from "../Admin/categories/CategoryCreate";

// Comands <==================================================================================)
import CommandListA from "../Admin/commands/CommandList";
import CommandCreate from "../Admin/commands/CommandCreate";
import CommandEdit from "../Admin/commands/CommandEdit";
import CommandDetails from "../Admin/commands/CommandDetails";

// Users <====================================================================================)
import Users from "../Admin/users/Users";


function CPC() {
    // Client
    const RouterClient = () => {
        const routes = [
            {
                path: "/",
                element: <Header />,
                children: [
                    { path: "/", element: <ProductList /> },
                    { path: "Products/:id", element: <ProductDetails /> },

                    { path: "Categories", element: <CategoryList /> },
                    { path: "Categories/:id", element: <CategoryDetails /> },

                    { path: "MyOrders", element: <CommandList /> },
                    { path: "purchase", element: <Purchase /> },
                ]
            }
        ];
        let element = useRoutes(routes);
        return element;
    };
    // Admin
    const RouterAdmin = () => {
        const routes = [
            {
                path: "/Admin",
                element: <HeaderAdmin />,
                children: [
                    { path: "/Admin/Products", element: <ProductListA /> },
                    { path: "/Admin/Products/:id", element: <ProductDetailsA /> },
                    { path: "/Admin/Products/Create", element: <ProductCreate /> },
                    { path: "/Admin/Products/Edit/:id", element: <ProductEdit /> },

                    { path: "/Admin/Categories", element: <CategoryListA /> },
                    { path: "/Admin/Categories/:id", element: <CategoryDetailsA /> },
                    { path: "/Admin/Categories/Create", element: <CategoryCreate /> },
                    { path: "/Admin/Categories/Edit/:id", element: <CategoryEdit /> },

                    { path: "/Admin/Orders", element: <CommandListA /> },
                    { path: "/Admin/Orders/:id", element: <CommandDetails /> },
                    { path: "/Admin/Orders/Create", element: <CommandCreate /> },
                    { path: "/Admin/Orders/ُEdit/:id", element: <CommandEdit /> },

                    { path: "/Admin/Users", element: <Users /> },
                ]
            }
        ];
        let element = useRoutes(routes);
        return element;
    };

    return (
        <div style={{maxWidth: "99.3%"}}>
            <BrowserRouter>
                <RouterClient />
                <RouterAdmin />
            </BrowserRouter>
        </div>
    );
}

export default CPC;
