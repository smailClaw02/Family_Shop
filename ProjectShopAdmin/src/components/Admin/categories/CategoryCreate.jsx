import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../hooks/Usefetch";

function CategoryCreate() {
    const navigate = useNavigate();
    const { create } = UseFetch();

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");

    const ontitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onColorChange = (e) => {
        setColor(e.target.value);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        title && color ?
            create("categories", { slug: title, title, color })
                .then(re => navigate("/Admin/Categories"))
            : alert("Enter Title and color")
    };

    

    return (
        <div className="row">
            <div id="title" className="row justify-content-between mx-2 mb-5">
                <div className="row h1 text-success">New Category</div>
            </div>

            <form onSubmit={onFormSubmit} className="container w-75 mt-5 border-top border-5 border-success p-5 px-4 shadow">

                <div className="input-group mb-3">
                    <label className="input-group-text btn btn-outline-success" htmlFor="name">title Category</label>
                    <input type="text" className="form-control" autoFocus value={title} id="name" onChange={ontitleChange} />
                </div>

                <div className="input-group mb-3">
                    <label className="input-group-text btn btn-outline-success" htmlFor="color">Color Category</label>
                    <input type="color" className="form-control form-control-color" id="color" value={color} onChange={onColorChange} />
                </div>

                <div className="row justify-content-end mx-1">
                    <Button
                        className="col-2"
                        style={{ fontFamily: "cursive" }}
                        color="success"
                        size="large"
                        variant="outlined"
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CategoryCreate;
