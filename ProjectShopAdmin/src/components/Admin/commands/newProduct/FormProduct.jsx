import { Button, TextField } from "@mui/material";
import { useState } from "react";

function FormProduct({ formProduct, addProduct }) {

    const [productId, setProductId] = useState(1);
    const [quantity, setQuantity] = useState(1);

    // productId =-=-=-=-=--=-=-=--
    const productIdChenge = (e) => {
        setProductId(e.target.value)
    }
    // quantity =-=-=-=-=--=-=-=--
    const quantityChange = (e) => {
        setQuantity(e.target.value)
    }

    const Addproduct = (e) => {
        addProduct(productId, quantity)
        setProductId(Number(productId) + 1)
    }

    return (
        <div className="row">
            <div className="col-3 mx-4">
                <div className="">
                    <select
                        value={productId}
                        onChange={productIdChenge}
                        className="p-2"
                        style={{ width: '81%', height: "3rem" }}
                    >
                        {
                            formProduct.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                            ))
                        }

                    </select>
                </div>
            </div>

            <div className="col-3 mx-2 d-flex">
                <TextField
                    label="Amount"
                    type="number"
                    placeholder='Enter amount'
                    value={quantity}
                    onChange={quantityChange}
                />
            </div>

            <div className='col-2 pt-1'>
                <Button
                    variant='outlined'
                    size='large'
                    className='px-5'
                    onClick={Addproduct}
                >
                    Add
                </Button>
            </div>
        </div>
    );
}

export default FormProduct;