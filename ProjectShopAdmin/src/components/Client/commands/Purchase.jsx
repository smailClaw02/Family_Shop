import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UseFetch from '../../hooks/Usefetch';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Purchase() {
    const data_products = useSelector(dataState => dataState.products);
    const dispatch = useDispatch();
    let priceProducts = []
    const navigate = useNavigate();
    const { create, list } = UseFetch()

    // ------- List of setProducts ----------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => {
                return setProducts(data)
            })
    }, [])
    // --------------------------------
    // ========== State of value and ONCHANGE VALURES ============== //
    const [client_name, setClient_name] = useState("");
    const [client_phone, setClient_phone] = useState("");
    const [client_address, setClient_address] = useState("");

    // client_name =-=-=-=-=--=-=-=--
    const client_nameChange = (e) => {
        setClient_name(e.target.value)
    }
    // client_phone =-=-=-=-=--=-=-=--
    const client_phoneChange = (e) => {
        setClient_phone(e.target.value)
    }
    // client_address =-=-=-=-=--=-=-=--
    const client_addressChange = (e) => {
        setClient_address(e.target.value)
    }
    // -----------------

    // create command =========>
    const [class1, setClass1] = useState("mt-3");
    const [class2, setClass2] = useState("container border border-top-0 border-4 border-warning shadow rounded");
    const [class3, setClass3] = useState("d-none");
    const onPurchase = (e) => {
        e.preventDefault();
        create("orders", {
            client_name,
            client_phone,
            client_address,
            products: data_products,
            is_shipped: false
        })
        setClass1("d-none")
        setClass2("d-none")
        setClass3("container w-50 mt-5 fs-4 p-3 rounded shadow bg-success text-white")
        dispatch({ type: "REMOVE_CART" })
        setTimeout(() => { navigate('/') }, 4000);
    };

    return (
        <div>
            {/* header */}
            <div id="title" className={class1}>
                <div className="h1 text-center text-warning">Purchase</div>
            </div>
            {/* body */}
            <div className={class2}>
                <form className="row m-2" onSubmit={onPurchase}>

                    {/* form 1 */}
                    <div className="row my-2 mx-0 p-4 justify-content-center">
                        <div className='fs-4 pb-3 text-decoration-underline text-primary'>Information on the Buyer :</div>
                        {/* Name Buyer */}
                        <div className="col-auto mx-5">
                            <TextField
                                autoFocus
                                label="Name Buyer"
                                placeholder='Enter your name'
                                value={client_name}
                                onChange={client_nameChange}
                            />
                        </div>
                        {/* Telephone */}
                        <div className="col-auto mx-5">
                            <TextField
                                label="Telephone"
                                type="tel"
                                placeholder="Enter your phone +212..."
                                value={client_phone}
                                onChange={client_phoneChange}
                            />
                        </div>
                        {/* delivery address  */}
                        <div className="col-auto mx-5">
                            <TextField
                                label="Delivery Address"
                                placeholder='Enter your delivery address'
                                value={client_address}
                                onChange={client_addressChange}
                            />
                        </div>
                    </div>
                    <hr className='border border-primary border-2 w-75 m-auto' />
                    {/* list products */}
                    <table className="w-75 m-auto table table-hover text-center">
                        <thead className="h4 text-secondary">
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='h5'>
                            {
                                data_products.map((product, index) =>
                                    products.map(p =>
                                        p.id == product.productId ?
                                            <tr key={p.id}>
                                                <td>{Number(index)}</td>
                                                <td>{p.title}</td>
                                                <td>{p.price}</td>
                                                <td>{product.quantity}</td>
                                            </tr>
                                            : null
                                    )
                                )
                            }
                        </tbody>
                    </table>

                    {/* button Create */}
                    <div className="row justify-content-center my-3 p-2">
                        <div className="col-auto mx-3 border border-3 border-warning rounded p-2">Total To Pay : <b>{
                            data_products.map(idP => {
                                products.map(p => (
                                    p.id == idP.productId ?
                                        priceProducts.push(Number(p.price * idP.quantity))
                                        : null
                                ))
                                if (priceProducts.length == data_products.length) {
                                    var total = priceProducts.reduce((a, b) => a + b, 0);
                                    priceProducts = []
                                    return total;
                                }
                            })
                        } Dh</b></div>
                        <Button
                            className="col-2 shadow"
                            style={{ fontFamily: "cursive" }}
                            color="warning"
                            size="large"
                            variant='contained'
                            type='submit'
                        >
                            Purchase
                        </Button>
                    </div>

                </form>
            </div>

            <div className={class3}>
                Your request has been sent,
                you will receive a notification on your phone
                number when your request is accepted !
            </div>
        </div >
    );
}


export default Purchase;