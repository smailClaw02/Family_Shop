import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseFetch from '../../hooks/Usefetch';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CommandDetails() {
    const { get, list, edit } = UseFetch();
    const { id } = useParams();
    const navigate = useNavigate();

    // Commands defails ------------------->
    const [orders, setOrders] = useState([]);
    const [length, setLength] = useState(0);
    useEffect(() => {
        get("orders", id)
            .then(data => {
                setOrders(data)
                setLength(data.products.length)
            })

    }, [])

    // List of pruducts ------------------->
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products").then(data => setProducts(data))
    }, [])

    // List of categories ------------------->
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        list("categories").then(data => setCategories(data))
    }, [])

    // calcule total price //
    const total = () => {
        let priceProducts = []
        products.map(p => (
            orders.products.map(o => (
                p.id == o.productId ?
                    priceProducts.push(p.price * o.quantity)
                    : null
            ))
        ))
        let total = priceProducts.reduce((a, b) => a + b, 0);
        priceProducts = [];
        return total;
    }
    // ============== treaty ==============
    const treaty = () => {
        edit("orders", id, { is_shipped: true })
            .then(data => navigate("/Admin/Orders"))
    }

    return (
        <div>
            {/* title */}
            {
                orders.is_shipped == true ?
                    <div id="content" className="border-bottom border-5 shadow-sm p-3 text-start h2 rounded-4">
                        Command : <span className='text-success'> #{orders.id}</span>
                    </div>
                    :
                    orders.is_shipped == false ?
                        <div id="content" className="border-bottom border-5 shadow-sm p-3 text-start h2 rounded-4">
                            Command : <span className='text-warning'> #{orders.id}</span>
                        </div>
                        :
                        <div id="content" className="border-bottom border-5 shadow-sm p-3 text-start h2 rounded-4">
                            Command : <span className='text-danger'> #{orders.id}</span>
                        </div>
            }
            {/* Body */}
            <div className="row mx-4">
                {/* aside */}
                <div className="col-3 m-2 shadow">
                    {/* Status */}
                    <div className="h4 px-1" style={{ borderLeft: ".2rem solid", color: "teal" }}>Status</div>
                    <div className="text-warning px-4 mb-4">
                        {
                            orders.is_shipped == true ?
                                <div className="text-success h5 p-2">
                                    <CheckCircleIcon /> Processed
                                </div>
                                :
                                orders.is_shipped == false ?
                                    <div className="text-warning h5 p-2">
                                        <HourglassBottomTwoToneIcon
                                            className='rounded-4 border border-3 border-warning' /> Pending
                                    </div>
                                    :
                                    <div className="text-danger h5 p-2">
                                        <HighlightOffIcon /> Canceled
                                    </div>
                        }
                    </div>
                    {/* Price Total */}
                    <div className="h4 px-1" style={{ borderLeft: ".2rem solid", color: "teal" }}>Price Total</div>
                    <div className="h5 px-4 mb-4">
                        {total()} MAD
                    </div>
                    {/* Number Products */}
                    <div className="h4 px-1" style={{ borderLeft: ".2rem solid", color: "teal" }}>Number Products </div>
                    <div className="h5 px-4 mb-4">
                        {length} Products
                    </div>
                    {/* Client */}
                    <div className="h4 px-1" style={{ borderLeft: ".2rem solid", color: "teal" }}>
                        Client
                    </div>
                    <div className="h5 px-4 mb-4">
                        <div>{orders.client_name}</div>
                        <h5 className="text-primary">{orders.client_phone}</h5>
                    </div>
                    {/* Delivery Address */}
                    <div className="h4 px-1" style={{ borderLeft: ".2rem solid", color: "teal" }}>
                        Delivery Address
                    </div>
                    <div className="h5 px-4 mb-4">
                        {orders.client_address}
                    </div>
                </div>
                {/* body : prodacts of command*/}
                <div className="col-8 m-2 mx-4 row">
                    {
                        products.map(p => (
                            orders.products.map(idp => (
                                p.id == idp.productId ?
                                    p.stock == 0 ?
                                        <div key={p.id} className="border shadow mt-3 row" style={{ backgroundColor: "#eacdba" }}>
                                            {/* number */}
                                            <div className="col-2">
                                                <h5 className='mx-1 text-success'>Amount</h5>
                                                <div className="card text-center p-3 fs-2 text-white" style={{ backgroundColor: "teal" }}>
                                                    {idp.quantity}
                                                </div>
                                            </div>
                                            {/* image product */}
                                            <div className="col-3 my-1" >
                                                <img
                                                    src={`http://localhost:5000${p.thumbnail}`}
                                                    alt={`img ${p.id}`}
                                                    className="image card my-2"
                                                    style={{ width: "10rem", height: "8rem" }}
                                                />
                                            </div>
                                            {/* details */}
                                            <div className="col-7 my-2 row p-1">
                                                <div className="col-12 h4 mx-3" style={{ color: "#00f" }}>{p.title}</div>

                                                <div className="col-12 row m-1">
                                                    <div className="col-4 fs-4">Price</div>
                                                    <div className="col-4 fs-4">Stock</div>
                                                    <div className="col-4 fs-4">Category</div>
                                                </div>

                                                <div className="col-12 row m-1">
                                                    <div className="col-4 text-secondary h5">{p.price} <span className='text-primary'>MAD</span></div>
                                                    <div className="col-4 text-danger h5">{p.stock} Unit</div>
                                                    <div className="col-4 text-secondary h5">
                                                        {
                                                            categories.map(c => (
                                                                c.id == p.categoryId ?
                                                                    c.title : null
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        :
                                        <div className="border shadow mt-3 row align-items-center">
                                            {/* number */}
                                            <div className="col-2">
                                                <h5 className='mx-1 text-success'>Amount</h5>
                                                <div className="card text-center p-3 fs-2 text-white" style={{ backgroundColor: "teal" }}>
                                                    {idp.quantity}
                                                </div>
                                            </div>
                                            {/* image product */}
                                            <div className="col-3 my-1">
                                                <img
                                                    src={`http://localhost:5000${p.thumbnail}`}
                                                    alt={`img ${p.id}`}
                                                    className="image card my-2"
                                                    style={{ width: "10rem", height: "8rem" }}
                                                />
                                            </div>
                                            {/* details */}
                                            <div className="col-7 my-2 row p-1">
                                                <div className="col-12 h4 mx-3" style={{ color: "#00f" }}>{p.title}</div>

                                                <div className="col-12 row m-1">
                                                    <div className="col-4 fs-4">Price</div>
                                                    <div className="col-4 fs-4">Stock</div>
                                                    <div className="col-4 fs-4">Category</div>
                                                </div>

                                                <div className="col-12 row m-1">
                                                    <div className="col-4 text-secondary h5">{p.price} <span className='text-primary'>MAD</span></div>
                                                    <div className="col-4 text-secondary h5">{p.stock} <span className='text-primary'>Unit</span></div>
                                                    <div className="col-4 text-secondary h5">
                                                        {
                                                            categories.map(c => (
                                                                c.id == p.categoryId ?
                                                                    c.title : null
                                                            ))
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    : null
                            ))

                        ))
                    }
                </div>

                {/* fouter */}
                {
                    products.map(p => (
                        orders.products.map(idp => (
                            p.id == idp.productId ?
                                p.stock == 0 ?
                                    <div className="col-2">
                                        <Link to={'/Admin/Orders'} style={{ textDecoration: "none" }}>
                                            <Button
                                                className='p-2 px-4'
                                                variant='outlined'
                                                color='info'
                                            >
                                                cancel
                                            </Button>
                                        </Link>
                                    </div>
                                    : null
                                : null
                        ))
                    ))
                }

                <>
                    {
                        orders.is_shipped == true ?
                            <div></div>
                            :
                            orders.is_shipped == false ?
                                <div className="row p-4 mt-3 justify-content-end mx-0">
                                    {/* Treaty */}
                                    <div className="col-1 mx-5">
                                        <Button
                                            className='p-2 px-4'
                                            variant='contained'
                                            color='success'
                                            onClick={treaty}
                                        >
                                            treaty
                                        </Button>
                                    </div>
                                    <div className="col-2">
                                        <Link to={'/Admin/Orders'} style={{ textDecoration: "none" }}>
                                            <Button
                                                className='p-2 px-4'
                                                variant='outlined'
                                                color='info'
                                            >
                                                cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div></div>
                    }
                </>

            </div >
        </div >
    );
}

export default CommandDetails;