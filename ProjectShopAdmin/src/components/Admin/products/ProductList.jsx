import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { useEffect, useState } from "react";
import UseFetch from "../../hooks/Usefetch";
import DeleteConfirmation from "../../margins/DeleteConfirmation";

function ProductList() {
    const { list, remove } = UseFetch();

    // data products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => setProducts(data))
    }, [])
    //  ---------------------------delete products ------------------------------
    const [id, setId] = useState(null);
    const [selectionPopup, setSelectionPopup] = useState(false);
    const [message, setMessage] = useState(null);

    // function delete category //
    const showDeleteModal = (id, type) => {
        setId(id)
        setSelectionPopup(true)
        setMessage(`Are you sure you want to delete the ${type} ?`)
    };
    // cancel page =============>
    const Cancel = () => {
        setSelectionPopup(false);
    }
    // delete category ===============>
    const submitDelete = (id) => {
        remove("products", id)
        setSelectionPopup(false);
        window.location.reload(true);
    };
    // -===================================================

    return (

        <div className="row">
            {/* header */}
            <div id="title" className="row justify-content-between mx-5">
                <div className="col-8 h1">List of products</div>
                <Link to={"/Admin/Products/Create"} className="col-3 fs-5" style={{ textDecoration: "none" }}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                    >
                        <CreateNewFolderOutlinedIcon />&#160; new Product
                    </Button>
                </Link>
            </div>
            {/* body */}
            <div id="content" className="container mt-2 w-75 shadow">

                <table className="table table-hover">

                    <thead className="h5 border-bottom border-3 border-secondary text-secondary">
                        <tr>
                            <th>#</th>
                            <th>IMG</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                        </tr>
                    </thead>

                    <tbody className="align-items-center">
                        {
                            products.map(p => (
                                <tr key={p.id}>
                                    {/* id */}
                                    <td className="h5 p-2">
                                        {p.id}
                                    </td>
                                    {/* Image */}
                                    <td>
                                        <img
                                            className="rounded-4"
                                            src={`http://localhost:5000${p.thumbnail}`}
                                            alt={`IMG ${p.id}`}
                                            style={{ width: "100px" }}
                                        />
                                    </td>
                                    {/* title product */}
                                    <td>
                                        <Link to={`/Admin/Products/${p.id}`} style={{ textDecoration: "none" }} >
                                            <Button
                                                style={{ fontFamily: "cursive" }}
                                                color="inherit"
                                                size="large"
                                                startIcon={<RemoveRedEyeRoundedIcon />}
                                            >
                                                {p.title}
                                            </Button>
                                        </Link>
                                    </td>
                                    {/* price */}
                                    <td >
                                        <div className="h5 p-2">{p.price}DH</div>
                                    </td>
                                    {/* stock */}
                                    <td >
                                        <div className="h5 p-2">{p.stock}</div>
                                    </td>
                                    {/* button update */}
                                    <td>
                                        <Link to={`/Admin/Products/Edit/${p.id}`} style={{ textDecoration: "none" }}>
                                            <Button
                                                style={{ fontFamily: "cursive" }}
                                                color="secondary"
                                                size="large"
                                            >
                                                <CreateTwoToneIcon />
                                                UPDATE
                                            </Button>
                                        </Link>
                                    </td>
                                    {/* button delete */}
                                    <td>
                                        <Button
                                            style={{ fontFamily: "cursive" }}
                                            color="error"
                                            size="large"
                                            onClick={() => {
                                                showDeleteModal(p.id, p.title)
                                            }}
                                        >
                                            <DeleteForeverOutlinedIcon />
                                            DELETE
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>
            <DeleteConfirmation
                showModal={selectionPopup}
                remove={submitDelete}
                Cancel={Cancel}
                message={message}
                id={id}
            />
        </div>

    );
}

export default ProductList;