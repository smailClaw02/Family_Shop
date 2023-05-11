import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UseFetch from "../../hooks/Usefetch";
import { useEffect, useState } from "react";
import DeleteConfirmation from "../../margins/DeleteConfirmation";

function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate();
    const { get, list, remove } = UseFetch()
    // prducts ======> 
    const [product, setProduct] = useState([]);
    useEffect(() => {
        get("products", id)
            .then(data => setProduct(data))
    }, [])
    // categories ======>
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        list("categories")
            .then(data => setCategories(data))
    }, [])

    // ============= Delete =================//
    const [selectionPopup, setSelectionPopup] = useState(false);
    const [message, setMessage] = useState(null);

    // function delete category //
    const showDeleteModal = (type) => {
        setSelectionPopup(true)
        setMessage(`Are you sure you want to delete the ${type} ?`)
    };
    // cancel page =============>
    const Cancel = () => {
        setSelectionPopup(false);
    }
    // delete category ===============>
    const submitDelete = (id) => {
        setSelectionPopup(false);
        remove("products", id)
            .then(data => navigate("/Admin/Products"))

    };


    return (
        <div>
            <div id="content" className="row mx-1 mb-5 mt-2 w-100 py-3 justify-content-end">

                <div className="col-1 mx-3">
                    <Link to={`/Admin/Products/Edit/${product.id}`} style={{ textDecoration: "none" }}>
                        <Button
                            style={{ fontFamily: "cursive" }}
                            color="secondary"
                            size="large"
                            variant="outlined"
                        >
                            <CreateTwoToneIcon />
                            UPDATE
                        </Button>
                    </Link>
                </div>

                <div className="col-2">
                    <Button
                        style={{ fontFamily: "cursive" }}
                        color="error"
                        size="large"
                        variant="outlined"
                        onClick={() => {
                            showDeleteModal(product.title)
                        }}
                    >
                        <DeleteForeverOutlinedIcon />
                        DELETE
                    </Button>
                </div>

            </div>

            <div id="content" className="container mb-5 mt-2 card shadow p-2">
                <div className="row m-1">

                    <div className="col-4 m-1">
                        <img
                            key={product.id}
                            className="rounded-3 mt-2 shadow"
                            src={`http://localhost:5000${product.thumbnail}`}
                            alt={`IMG ${product.id}`}
                            style={{ width: "100%" }}
                        />
                    </div>
                    {/* data of product */}
                    <div id="left" className="col-7 text-start mt-2 px-4" style={{ borderLeft: ".2rem solid teal" }}>

                        <h2 style={{ color: "teal" }}>{product.title}</h2>

                        <p style={{ paddingLeft: "1rem", fontSize:"1.3rem" }}>{product.description}</p>
                        {/* price and stock and category */}
                        <div className="row justify-content-center my-2">

                            <div className="col-3 px-3 m-2 shadow rounded-4 text-center pt-2">
                                <h4 className="fs-4 pb-2 text-decoration-underline" style={{ color: "teal" }}>Price</h4>
                                <h5>{product.price} <span className="text-secondary">MAD</span></h5>
                            </div>

                            <div className="col-3 px-3 py-1 m-2 shadow rounded-4 text-center pt-2">
                                <h4 className="fs-4 pb-2 text-decoration-underline" style={{ color: "teal" }}>Stock</h4>
                                <h5>{product.stock} <span className="text-secondary">units</span></h5>
                            </div>

                            <div className="col-3 px-2 py-1 m-2 shadow rounded-4 text-center pt-2">
                                <h4 className="fs-4 pb-2 text-decoration-underline" style={{ color: "teal" }}>Category</h4>
                                {
                                    categories.map(c => {
                                        return (
                                            <Link to={`/Admin/Categories/${c.id}`} style={{ textDecoration: "none" }}>
                                                <h5 key={c.id}>
                                                    {(c.id == product.categoryId) ?
                                                        c.title : null}
                                                </h5>
                                            </Link>

                                        )
                                    })
                                }

                            </div>

                        </div>

                    </div>

                </div>
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

export default ProductDetails;