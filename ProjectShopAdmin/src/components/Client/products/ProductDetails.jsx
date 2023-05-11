import { Link, useNavigate, useParams } from "react-router-dom";
import UseFetch from "../../hooks/Usefetch";
import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";

function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate();
    const { get, list } = UseFetch()
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
    // Quantity 
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const data_products = useSelector(dataState => dataState.products);
    const AddToCart = (e) => {
        e.preventDefault();
        const products = {
            productId: product.id,
            quantity: Number(quantity)
        };
        data_products.map(pro =>
            pro.productId === products.productId ?
                dispatch({ type: "REMOVE_PRODUCT", payload: product.id })
                : null
        )
        dispatch({ type: "ADD_PRODUCTS", payload: products })
        navigate('/MyOrders')
    }

    return (
        <div className="container mt-4">
            <div className="row mt-5 justify-content-between">
                {/* title */}
                <h2 className="col-7">{product.title}</h2>
                <Link to={'/'} className="col-1">
                    <CancelIcon fontSize="large" color="disabled" />
                </Link>
            </div>
            {/* Card */}
            <div id="content" className="card shadow p-1">
                <div className="row align-items-center">
                    {/* Image */}
                    <div className="col-4">
                        <img
                            key={product.id}
                            className="rounded"
                            src={`http://localhost:5000${product.thumbnail}`}
                            alt={`IMG ${product.id}`}
                            style={{ width: "100%" }}
                        />
                    </div>
                    {/* data of product */}
                    <div className="col text-start mt-2 px-4">
                        <p className="fs-4">{product.description}</p>
                        {/* price and stock and category */}
                        {/* details */}
                        <div className="row mx-2 border-top border-3 border-secondary rounded shadow  px-4 p-1 justify-content-between">
                            <h5 className="col-auto">
                                Price : <span className="text-primary">{product.price} DH </span>
                            </h5>
                            <h5 className="col-auto">
                                Quantity : <span className="text-info">{product.stock} Units </span>
                            </h5>

                            <h5 className="col-auto">
                                Category: {
                                    categories.map(c => (
                                        <span className="text-warning" key={c.id}>
                                            {
                                                (c.id == product.categoryId) ?
                                                    c.title : null
                                            }
                                        </span>

                                    ))
                                }
                            </h5>
                        </div>
                        {/* order */}
                        <form className="row m-auto w-50 mt-4 p-1 align-items-center" onSubmit={AddToCart}>
                            <div className="col-auto">
                                <div className="input-group col-auto">
                                    <div className="input-group-text text-white bg-success">Quantity</div>
                                    <input type="number" min="1" max="10" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-success text-white" type="submit">Add to cart</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetails;