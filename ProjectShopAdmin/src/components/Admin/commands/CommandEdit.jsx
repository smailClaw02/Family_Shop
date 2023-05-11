import { Button, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import UseFetch from '../../hooks/Usefetch';
import { useEffect, useState } from 'react';

import NewProduct from '../commands/newProduct/NewProduct';
import FormProduct from '../commands/newProduct/FormProduct';

function CommandEdit() {
    const navigate = useNavigate();
    const { edit, list, get } = UseFetch();
    const { id } = useParams();

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
    // ============= New product =========================
    const [product, setProduct] = useState([]);
    const [formProduct, setFormProduct] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => setFormProduct(data))
    }, [])
    // Add product " productId and quantity " ====>
    const addProduct = (productId, quantity) => {
        console.log(`productId :${productId} | quantity :${quantity}`);
        setProduct([...product, {
            productId: Number(productId),
            quantity: Number(quantity),
        },]);

        setFormProduct(formProduct.filter((p) => p.id != productId ? p : null))
    };
    //  remove product ====>
    const [idP, setIdP] = useState([]);
    const removeProduct = (id) => {
        console.log("remove product", id);
        setProduct(product.filter((p) => p.productId !== id ? p : null));
        setFormProduct([...formProduct, products.find((p) => p.id == id ? p : null)]);
    }
    // =====================================================
    // ===== read data command ===================================== //
    useEffect(() => {
        get("orders", id)
            .then(data => {
                setClient_name(data.client_name)
                setClient_phone(data.client_phone)
                setClient_address(data.client_address)
                setProduct(data.products)
            })
    }, [])
    // ============================================================= //
    // Edit command =========>
    const onEdite = (e) => {
        e.preventDefault();
        edit("orders", id, {
            client_name,
            client_phone,
            client_address,
            products: product,
        })
            .then(data => navigate("/Admin/Orders"))
    };

    return (
        <div>
            {/* title */}
            <div id="content" className="pt-4 text-success border-bottom border-5 border-success shadow-sm p-3 text-start h1 rounded-4">
                Edit Order
            </div>
            {/* body */}
            <div id="content" className="my-4 w-100 card shadow">
                <form className="row m-2" onSubmit={onEdite}>

                    {/* form 1 */}
                    <div className="row my-2 mx-0 p-4 shadow">
                        {/* Name client */}
                        <div className="col-4">
                            <TextField
                                autoFocus
                                label="Name Client"
                                placeholder='Enter name client'
                                value={client_name}
                                onChange={client_nameChange}
                            />
                        </div>
                        {/* Telephone */}
                        <div className="col-4">
                            <TextField
                                label="Telephone"
                                type="tel"
                                placeholder="Enter telephone"
                                value={client_phone}
                                onChange={client_phoneChange}
                            />
                        </div>
                        {/* delivery address  */}
                        <div className="col-4">
                            <TextField
                                label="Delivery Address"
                                placeholder='Enter delivery address'
                                value={client_address}
                                onChange={client_addressChange}
                            />
                        </div>

                    </div>

                    {/* Add new Product */}
                    <div className="row mt-4 m-0 py-3 align-items-center">
                        <div className='h2 text-start pb-2'>Products</div>
                        <NewProduct product={product} removeProduct={removeProduct} />
                    </div>

                    {/* form 2 */}
                    <FormProduct formProduct={formProduct} addProduct={addProduct} />

                    {/* button edit */}
                    <div className="row justify-content-end my-3 p-2">
                        <Button
                            className="col-2 shadow"
                            style={{ fontFamily: "cursive" }}
                            color="success"
                            size="large"
                            variant='contained'
                            type='submit'
                        >
                            Update
                        </Button>
                    </div>

                </form>
            </div >
        </div >
    );
}

export default CommandEdit;