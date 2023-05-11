import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import { useEffect, useState } from 'react';
import UseFetch from '../../hooks/Usefetch';
import DeleteConfirmation from '../../margins/DeleteConfirmation';

function CommandList() {
    const { list, remove } = UseFetch();

    // list coommands
    const [command, setCommand] = useState([]);
    useEffect(() => {
        list("orders")
            .then(data => setCommand(data))
    }, [])

    // list products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        list("products")
            .then(data => setProducts(data))
    }, [])
    let priceProducts = []

    // ==============================//
    const [id, setId] = useState(null);
    const [selectionPopup, setSelectionPopup] = useState(false);
    const [message, setMessage] = useState(null);

    // function delete category //
    const showDeleteModal = (id, clientName) => {
        setId(id)
        setSelectionPopup(true)
        setMessage(`Are you sure you want to delete the order ${clientName} ?`)
    };
    // cancel page =============>
    const Cancel = () => {
        setSelectionPopup(false);
    }
    // delete category ===============>
    const submitDelete = (id) => {
        remove("orders", id)
        setSelectionPopup(false);
        window.location.reload(true);
    };


    return (
        <div className="row">

            <div id="title" className="row justify-content-between mx-5">
                <div className="col-8 h1" style={{ color: "#0e4953" }}>List of Commands</div>
                <Link to={"/Admin/Orders/Create"} className="col-3 fs-5" style={{ textDecoration: "none" }}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                    >
                        <CreateNewFolderOutlinedIcon />&#160; new Product
                    </Button>
                </Link>
            </div>

            <div id="content" className="container mt-2 w-75 shadow">

                <table className="table table-hover">

                    <thead className="h5 border-bottom border-3 border-secondary">
                        <tr>
                            <th>Number</th>
                            <th>Number Products</th>
                            <th>Total Price</th>
                            <th>status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            command.map((c, index) => (
                                c.is_shipped == true ?
                                    <tr key={c.id}>
                                        {/* id */}
                                        <td >
                                            <div className="h4 p-2 text-primary">{Number(index + 1)}</div>
                                        </td>
                                        {/* number of products */}
                                        <td id='name' className="h5 p-2 fs-4">
                                            <Link
                                                to={`/Admin/Orders/${c.id}`}
                                                style={{ textDecoration: "none" }}
                                                className="text-success"
                                            >
                                                {c.products.length} Products
                                            </Link>
                                        </td>
                                        {/* total price of products */}
                                        <td>
                                            <div className="h5 p-2">
                                                {
                                                    c.products.map(idP => {
                                                        products.map(p => (
                                                            p.id == idP.productId ?
                                                                priceProducts.push(p.price * idP.quantity)
                                                                : null
                                                        ))
                                                        if (priceProducts.length == c.products.length) {
                                                            let total = priceProducts.reduce((a, b) => a + b, 0);
                                                            priceProducts = []
                                                            return total;
                                                        }
                                                    })
                                                } MAD
                                            </div>
                                        </td>
                                        {/* statut of product */}
                                        <td>
                                            <div className="text-success h5 p-2">
                                                <CheckCircleIcon /> Processed
                                            </div>
                                        </td>
                                        {/* edit */}
                                        <td>
                                            <Button
                                                style={{ fontFamily: "cursive" }}
                                                color="secondary"
                                                size="large"
                                            >
                                                <del>update</del>
                                            </Button>
                                        </td>
                                        {/* Delete */}
                                        <td>
                                            <Button
                                                style={{ fontFamily: "cursive" }}
                                                color="error"
                                                size="large"
                                                onClick={() => {
                                                    showDeleteModal(c.id, c.client_name)
                                                }}
                                            >
                                                <DeleteForeverOutlinedIcon />
                                                DELETE
                                            </Button>
                                        </td>
                                    </tr>

                                    : c.is_shipped == false ?
                                        < tr key={c.id} >
                                            {/* id */}
                                            <td>
                                                <div className="h4 p-2 text-primary">{Number(index + 1)}</div>
                                            </td>
                                            {/* number of products */}
                                            <td id='name' className="h5 p-2 fs-4">
                                                <Link
                                                    to={`/Admin/Orders/${c.id}`}
                                                    style={{ textDecoration: "none" }}
                                                    className="text-warning"
                                                >
                                                    {c.products.length} Products
                                                </Link>
                                            </td>
                                            {/* total price of products */}
                                            <td>
                                                <div className="h5 p-2">
                                                    {
                                                        c.products.map(idP => {
                                                            products.map(p => (
                                                                p.id == idP.productId ?
                                                                    priceProducts.push(p.price * idP.quantity)
                                                                    : null
                                                            ))
                                                            if (priceProducts.length == c.products.length) {
                                                                let total = priceProducts.reduce((a, b) => a + b, 0);
                                                                priceProducts = []
                                                                return total;
                                                            }
                                                        })
                                                    } MAD
                                                </div>
                                            </td>
                                            {/* statut of product */}
                                            <td>
                                                <div className="text-warning h5 p-2">
                                                    <HourglassBottomTwoToneIcon
                                                        className='rounded-4 border border-3 border-warning' /> Pending
                                                </div>
                                            </td>
                                            {/* Edit */}
                                            <td>
                                                <Link to={`/Admin/Orders/ُEdit/${c.id}`} style={{ textDecoration: "none" }}>
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
                                            {/* Delete */}
                                            <td>
                                                <Button
                                                    style={{ fontFamily: "cursive" }}
                                                    color="error"
                                                    size="large"
                                                    onClick={() => {
                                                        showDeleteModal(c.id, c.client_name)
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

                </table >

            </div >
            <DeleteConfirmation
                showModal={selectionPopup}
                remove={submitDelete}
                Cancel={Cancel}
                message={message}
                id={id}
            />
        </div >
    );
}

export default CommandList;