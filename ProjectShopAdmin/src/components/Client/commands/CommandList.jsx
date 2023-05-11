import { RiDeleteBin5Line } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import UseFetch from '../../hooks/Usefetch';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CommandList() {
    const data_products = useSelector(dataState => dataState.products);
    // console.log(data_products);
    const navigate = useNavigate();
    const { list } = UseFetch();
    // list products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => setProducts(data))
    }, [])

    let priceProducts = []
    // ============ Remove Cart ========== //
    const dispatch = useDispatch();
    const removeCart = () => {
        dispatch({ type: "REMOVE_CART" })
        navigate('/')
    }
    // ============ Remove order ========== //
    const showDeleteModal = (id) => dispatch({ type: "REMOVE_PRODUCT", payload: id })

    return (
        <div className="row">
            {/* header */}
            <div id="title" className="mt-3">
                <div className="h1 text-center">Products in Cart</div>
            </div>
            {/* Body */}
            <div id="content" className="row mb-5 m-auto w-75">
                <table className="table table-hover">
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
                                            <td>{Number(index + 1)}</td>
                                            <td>{p.title}</td>
                                            <td>{Number(p.price * product.quantity)}</td>
                                            <td>{product.quantity}</td>
                                            {/* Delete */}
                                            <td className='border-top'>
                                                <RiDeleteBin5Line
                                                    size={40}
                                                    className="text-danger border rounded-circle p-2 border-danger shadow"
                                                    onClick={() => {
                                                        showDeleteModal(product.productId)
                                                    }} />
                                            </td>
                                        </tr>
                                        : null
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="col-11 row justify-content-end">
                <div className="col-auto mx-1 border border-3 border-warning rounded p-2">Total To Pay : <b>{
                    data_products.map(idP => {
                        products.map(p => (
                            p.id == idP.productId ?
                                priceProducts.push(p.price * idP.quantity)
                                : null
                        ))
                        if (priceProducts.length == data_products.length) {
                            const total = priceProducts.reduce((a, b) => a + b, 0);
                            priceProducts = []
                            return total;
                        }
                    })
                }Dh</b></div>
                <button className='col-auto mx-1 btn btn-success' onClick={() => navigate('/purchase')}>Purchase</button>
                <button className='col-auto mx-1 btn btn-outline-danger' onClick={removeCart}>Remove all products from Cart</button>
            </div>
        </div >
    );
}

export default CommandList;