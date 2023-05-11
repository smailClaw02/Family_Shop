import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import UseFetch from "../../hooks/Usefetch";


function CategoryEdit() {

    const { id } = useParams()
    const navigate = useNavigate();
    const { edit, list } = UseFetch()

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        list("categories")
            .then(data =>
                data.map(c => {
                    if (c.id == id) {
                        setTitle(c.title)
                        setColor(c.color)
                    }
                })
            )
    }, [])

    const onsetTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onColorChange = (e) => {
        setColor(e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        edit("categories", id, { slug: title, title, color })
            .then(data => navigate("/Admin/Categories"))

    };

    return (
        <div className="row">
            <div id="title" className="row justify-content-between mx-2 mb-5">
                <div className="row h1 text-primary">UpDate Category</div>
            </div>

            <form onSubmit={onFormSubmit} className="container w-75 mt-5 border-top border-5 border-primary p-5 px-4 shadow">
                {/* Name Category */}
                <div className="input-group mb-3">
                    <label className="input-group-text btn btn-outline-primary" htmlFor="name">Name Category</label>
                    <input type="text" autoFocus className="form-control fs-5 px-4" id="name" value={title} onChange={onsetTitleChange} />
                </div>
                {/* Color Category */}
                <div className="input-group mb-3">
                    <label className="input-group-text btn btn-outline-primary" htmlFor="color">Color Category</label>
                    <input type="color" className="form-control form-control-color" id="color" value={color} onChange={onColorChange} />
                </div>
                {/* Button */}
                <div className="row justify-content-end mx-1">
                    <Button
                        className="col-2"
                        style={{ fontFamily: "cursive" }}
                        color="primary"
                        size="large"
                        variant="outlined"
                        type="submit"
                    >
                        UPDATE
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CategoryEdit;
