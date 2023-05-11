import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import UseFetch from "../../hooks/Usefetch";
import { useEffect, useState } from "react";
import SellIcon from '@mui/icons-material/Sell';
import { FaSortAmountUpAlt } from 'react-icons/fa';

function CategoryDetails() {
    const { get, list } = UseFetch();
    const { id } = useParams();
    // category defails ------------------->
    const [category, setCategory] = useState(null);
    useEffect(() => {
        get("categories", id)
            .then(data => setCategory(data))
    }, [])

    // List of pruducts ------------------->
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products").then(data => setProducts(data))
    }, [])

    return (
        category && (

            <div className="row">
                {/* header */}
                <div className="m-2 row p-4 text-center align-items-center  justify-content-between">
                    {/* Title */}
                    <div className="col row">
                        <div style={{ backgroundColor: category.color }} className="col-1 p-4 rounded"></div>
                        <div className="col-2 fs-4">{category.title}</div>
                    </div>
                    <div className="col-2 fs-5">Number of Products : {0}</div>
                </div>

                {/* List of products */}
                <div className="container shadow">
                    {/* title : list of products */}
                    <div className="alert alert-secondary text-center h4">
                        List of products
                    </div>
                    {/* List of products */}

                    <div id="content" className="row justify-content-center py-3">
                        {
                            products.map(p => (
                                (p.categoryId == id) ?
                                    <div className="col-2 m-2 p-1 rounded border shadow" key={p.id}>
                                        {/* Image */}
                                        <img
                                            className="rounded-1"
                                            src={`http://localhost:5000${p.thumbnail}`}
                                            alt={`IMG ${p.id}`}
                                            style={{ width: "100%", height: "10rem" }}
                                        />
                                        {/* title product */}
                                        <div className="mt-2">
                                            <Link to={`/Products/${p.id}`} className="text-decoration-none" >
                                                <Button
                                                    style={{ fontFamily: "cursive" }}
                                                    color="warning"
                                                    size="large"
                                                >
                                                    {p.title}
                                                </Button>
                                            </Link>
                                        </div>
                                        {/* price & Amount */}
                                        <hr />
                                        <div className="mx-1 row justify-content-between">
                                            {/* price */}
                                            <div className="col-7">
                                                <div className="h5 text-start">{p.price}DH <SellIcon className="text-success" /></div>
                                            </div>
                                            {/* stock */}
                                            <div className="col-4">
                                                <div className="h5 text-end">{p.stock} <FaSortAmountUpAlt className="text-danger" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            ))
                        }
                    </div>
                </div>
            </div >
        )
    )
}

export default CategoryDetails;
