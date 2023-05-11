import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import { Button, TextareaAutosize, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UseFetch from '../../hooks/Usefetch';



function ProductEdit() {
    const { id } = useParams()
    const navigate = useNavigate();
    const { edit, list, get, upload } = UseFetch();

    // ------- List of categories ----------
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        list("categories")
            .then(data => {
                return setCategories(data)
            })
    }, [])
    // --------------------------------
    // ======= charge les varaibles =========== //
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [option, setOption] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        get("products", id)
            .then(data => {
                setTitle(data.title)
                setPrice(data.price)
                setStock(data.stock)
                setOption(data.categoryId)
                setDescription(data.description)
                setThumbnail(data.thumbnail)
            })
    }, [])
    // -============================================
    // ========== ONCHANGE VALURES ==============
    // Thumbnail =-=-=-=-=--=-=-=--
    const fileChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setThumbnail(e.target.files[0])
    }
    // Title =-=-=-=-=--=-=-=--
    const titleChange = (e) => {
        setTitle(e.target.value)
    }
    // Price =-=-=-=-=--=-=-=--
    const priceChange = (e) => {
        setPrice(e.target.value)
    }
    // Stock =-=-=-=-=--=-=-=--
    const stockChange = (e) => {
        setStock(e.target.value)
    }
    // Categories =-=-=-=-=--=-=-=--
    const optionChange = (e) => {
        setOption(e.target.value)
    }
    // Description =-=-=-=-=--=-=-=--
    const onDescriptionChenge = (e) => {
        setDescription(e.target.value)
    }
    // -----------------
    // edit product =========>
    useEffect(() => {
        upload(thumbnail).then(data => setThumbnail("/files/download/"+data+""))
    }, [thumbnail])
    
    const onUpdate = (e) => {
        e.preventDefault();
        edit("products", id, {
            title,
            description,
            price: Number(price),
            stock: Number(stock),
            categoryId: Number(option),
            thumbnail: thumbnail,
        })
            .then(data => navigate("/Admin/Products"))
    };


    return (
        <div>
            {/* title */}
            <div id="content" className="p-1 text-primary border-bottom border-5 shadow-sm p-3 text-start h2 rounded-4">
                <BorderColorTwoToneIcon fontSize='large' /> Update Product
            </div>
            {/* body */}
            <form onSubmit={onUpdate} encType="multipart/form-data" className="row border  p-3 shadow mt-3 rounded">
                {/* Image |&&| [Title , Price , Stock and List of Categories ] */}
                <div className="col-12 row p-1">
                    {/* Image */}
                    <div className="col-3 border border-dark p-2 rounded mx-4">
                        <img
                            className="rounded-4"
                            src={
                                !file ?
                                    `http://localhost:5000${thumbnail}`
                                    : file
                            }
                            alt={`IMG ${id}`}
                            style={{ width: "100%", height: "15rem" }}
                        />
                        <TextField
                            className='mt-2'
                            type="file"
                            onChange={fileChange}
                        />
                    </div>
                    {/* Title , Price , Stock and List of Categories */}
                    <div className="col-7 p-2 mx-4 row px-4 py-3">
                        {/* Title */}
                        <div className="col-6 py-2">
                            <TextField
                                autoFocus
                                label="Title"
                                placeholder='Enter name product'
                                value={title}
                                onChange={titleChange}
                            />
                        </div>
                        {/* Price */}
                        <div className="col-6 py-2">
                            <TextField
                                label="Price"
                                type="number"
                                placeholder='Enter price product'
                                value={price}
                                onChange={priceChange}
                            />
                        </div>
                        {/* Stock */}
                        <div className="col-6 py-2">
                            <TextField
                                label="Stock"
                                type="number"
                                placeholder='Enter stock product'
                                value={stock}
                                onChange={stockChange}
                            />
                        </div>
                        {/* list of Category */}
                        <div className="col-6 py-2">
                            <select
                                onChange={optionChange}
                                className="px-3"
                                style={{ width: '81%', height: "2.9rem" }}
                                value={option}
                            >
                                {
                                    categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))
                                }

                            </select>
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div>
                    <label
                        className='p-1 fs-4 text-primary'
                        htmlFor="description"
                    >Description</label>
                    <TextareaAutosize
                        className='px-3 py-2'
                        id='description'
                        cols={105}
                        maxRows={5}
                        minRows={3}
                        value={description}
                        onChange={onDescriptionChenge}
                    />
                </div>
                {/* button */}
                <div className="row justify-content-end pt-5 px-0">
                    <Button
                        className='col-1'
                        variant='outlined'
                        type='submit'
                    >
                        update
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ProductEdit;