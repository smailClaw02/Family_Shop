import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import UseFetch from "../../../hooks/Usefetch";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function ProductItem({ product, removeProduct }) {

    const { list } = UseFetch();

    const [amount, setAmount] = useState('');
    const amountChange = (e) => {
        setAmount(e.target.value)
    }
    // ------- List of setProducts ----------
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => {
                return setProducts(data)
            })
        setAmount(product.quantity)
    }, [])
    // --------------------------------

    const DeleteProduct = (e) => {
        removeProduct(product.productId)
    }




    return (
        <div className="row p-3 my-1">
            {/* List Product */}
            <div className="col-3">
                {
                    products.map(p => (
                        p.id == product.productId ?
                            <TextField
                                label="Product"
                                type="text"
                                value={p.title}
                            />
                            : null
                    ))
                }

            </div>
            {/* Quantity */}
            <div className="col-3">
                <TextField
                    label="amount"
                    type="number"
                    placeholder='Enter amount'
                    value={amount}
                    onChange={amountChange}
                />
            </div>
            {/* Delete */}
            <div className="col-2">
                <Button color='error' onClick={DeleteProduct}>
                    <HighlightOffIcon /> Delete
                </Button>
            </div>

        </div>
    );
}

export default ProductItem;