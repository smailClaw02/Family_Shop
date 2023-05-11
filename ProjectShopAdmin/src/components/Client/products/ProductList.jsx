import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SellIcon from '@mui/icons-material/Sell';
import { FaSortAmountUpAlt } from 'react-icons/fa';
import { useEffect, useState } from "react";
import UseFetch from "../../hooks/Usefetch";

function ProductList() {
    const { list } = UseFetch();

    // data products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => setProducts(data))
    }, [])

    return (

        <div className="row">
            {/* header */}
            <div id="title" className="mt-3">
                <div className="h1 text-center">The Products</div>
            </div>
            {/* body */}
            <div id="content" className="row pt-2 justify-content-center">
                {
                    products.map(p => (
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
                    ))
                }
            </div>
        </div>

    );
}

export default ProductList;