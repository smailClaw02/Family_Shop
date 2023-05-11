import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import UseFetch from "../../hooks/Usefetch";
import { useEffect, useState } from "react";
import DeleteConfirmation from "../../margins/DeleteConfirmation";


function CategoryDetails() {
    const { get, list, remove } = UseFetch();
    const { id } = useParams();
    const navigate = useNavigate();

    // category defails ------------------->
    const [category, setCategory] = useState(null);
    useEffect(() => {
        get("categories", id)
            .then(data => setCategory(data))
    }, [])

    // List of oruducts ------------------->
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products").then(data => setProducts(data))
    }, [])

    // ============ delete category ==================//
    const [selectionPopup, setSelectionPopup] = useState(false);
    const [message, setMessage] = useState(null);

    // function delete category //
    const showDeleteModal = () => {
        setSelectionPopup(true)
        setMessage(`Are you sure you want to delete the ${category.title} ?`)
    };
    // cancel page =============>
    const Cancel = () => {
        setSelectionPopup(false);
    }
    // delete category ===============>
    const submitDelete = () => {
        remove("categories", id)
        setSelectionPopup(false);
        navigate("/Admin/Categories")
    };

    // ================ delete product ==============//
    const [selectionPopu, setSelectionPopu] = useState(false);
    const [messag, setMessag] = useState(null);
    const [idP, setIdP] = useState(null);

    // function delete category //
    const showDeleteModa = (id, type) => {
        setIdP(id)
        setSelectionPopu(true)
        setMessag(`Are you sure you want to delete the ${type} ?`)
    };
    // cancel page =============>
    const Cance = () => {
        setSelectionPopu(false);
    }
    // delete category ===============>
    const submitDelet = () => {
        remove("products", idP)
        setSelectionPopu(false);
        window.location.reload(true);
    };

    return (
        category && (

            <div className="container">
                {/* header : color , title , buttons */}
                <div id="title" className="my-3 row justify-content-between">

                    <div className="col-1 my-1">
                        <input
                            type="color"
                            value={category.color}
                            onChange={(e) => e.target.value}
                            className="form-control p-0"
                            style={{ height: "2.5rem" }} />
                    </div>

                    <div className="col-7 h2 mt-1">
                        Categories: <span className="text-warning d-intline">{category.title}</span>
                    </div>
                    {/* button */}
                    <div className="col-4 row justify-content-end">
                        <Link to={`/Admin/Categories/Edit/${category.id}`} className="col-5 fs-5" style={{ textDecoration: "none" }}>
                            <Button
                                style={{ fontFamily: "cursive" }}
                                color="secondary"
                                size="large"
                            >
                                <CreateTwoToneIcon />
                                UPDATE
                            </Button>
                        </Link>

                        <div className="col-5 fs-5">
                            <Button
                                style={{ fontFamily: "cursive" }}
                                color="error"
                                size="large"
                                onClick={showDeleteModal}
                            >
                                <DeleteForeverOutlinedIcon />
                                DELETE
                            </Button>
                        </div>
                    </div>

                </div>

                {/* List of products */}
                <div className="mt-2 shadow">
                    {/* title : list of products */}
                    <div className="text-center h3 border-bottom border-dark p-1 w-25 m-auto mb-3">
                        List of products
                    </div>
                    {/* table : list of products */}
                    <table className="table table-hover text-center">

                        <thead className="h5 border-bottom border-3 border-secondary text-secondary">
                            <tr>
                                <th>#</th>
                                <th>IMG</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Stock</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map(p => (
                                    (p.categoryId == id) ?

                                        <tr key={p.id} >
                                            <td>
                                                <div className="p-2 fs-4">{p.id}</div>
                                            </td>
                                            {/* Img */}
                                            <td>
                                                <img
                                                    className="rounded-4"
                                                    src={`http://localhost:5000${p.thumbnail}`}
                                                    alt={`IMG ${p.id}`}
                                                    style={{ width: "100px" }}
                                                />
                                            </td>

                                            <td>
                                                <div className="h5 p-2">{p.title}</div>
                                            </td>

                                            <td >
                                                <div className="h5 p-2">{p.price}DH</div>
                                            </td>

                                            <td >
                                                <div className="h5 p-2">{p.stock}</div>
                                            </td>

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

                                            <td>
                                                <Button
                                                    style={{ fontFamily: "cursive" }}
                                                    color="error"
                                                    size="large"
                                                    onClick={() => {
                                                        showDeleteModa(p.id, p.title)
                                                    }}
                                                >
                                                    <DeleteForeverOutlinedIcon />
                                                    DELETE
                                                </Button>
                                            </td>

                                        </tr>
                                        : null
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
                <DeleteConfirmation
                    showModal={selectionPopu}
                    remove={submitDelet}
                    Cancel={Cance}
                    message={messag}
                    id={id}
                />
            </div >
        )
    )
}

export default CategoryDetails;
