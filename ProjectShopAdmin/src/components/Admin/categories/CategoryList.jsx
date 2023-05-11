import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import UseFetch from "../../hooks/Usefetch";
//======== Icon ===------------>
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import DeleteConfirmation from "../../margins/DeleteConfirmation";


function CategoryList() {
    const { list, remove } = UseFetch();

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        list("categories")
            .then(data => setCategories(data))
    }, [])

    // ================= Delete ==============================//
    const [id, setId] = useState(null);
    const [selectionPopup, setSelectionPopup] = useState(false);
    const [message, setMessage] = useState(null);

    // function delete category //
    const showDeleteModal = (id, type) => {
        setId(id)
        setSelectionPopup(true);
        setMessage(`Are you sure you want to delete the ${type} ?`)
    };
    // cancel page =============>
    const Cancel = () => {
        console.log(selectionPopup);
        setSelectionPopup(false);
    }
    // delete category ===============>
    const submitDelete = (id) => {
        remove("categories", id)
        setSelectionPopup(false);
        window.location.reload(true);
    };


    return (
        <div className="row">
            {/* header */}
            <div id="title" className="row justify-content-between mx-5">
                <div className="col-8 h1" style={{ color: "#0e4953" }}>Products Categories</div>
                <Link to={"/Admin/Categories/Create"} className="col-3 fs-5" style={{ textDecoration: "none" }}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="success"
                    >
                        <CreateNewFolderOutlinedIcon />&#160; new category
                    </Button>
                </Link>
            </div>
            {/* List of categories */}
            <div id="content" className="container mt-2 w-75 shadow">
                {
                    (
                        <table className="table table-hover">

                            <thead className="h5 border-bottom border-3 border-secondary">

                                <tr>
                                    <th>
                                        <ClassOutlinedIcon
                                            style={{ fontSize: "1.6rem" }}
                                        /> Name
                                    </th>
                                    <th className="">Color</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    categories.map(c => {
                                        return (
                                            <tr key={c.id}>
                                                {/* Title */}
                                                <td>
                                                    <Link to={`/Admin/Categories/${c.id}`} style={{ textDecoration: "none" }}>
                                                        <Button
                                                            style={{ fontFamily: "cursive" }}
                                                            color="inherit"
                                                            size="large"
                                                            startIcon={<RemoveRedEyeRoundedIcon />}
                                                        >
                                                            {c.title}
                                                        </Button>
                                                    </Link>
                                                </td>
                                                {/* Color */}
                                                <td>
                                                    <input
                                                        type="color"
                                                        value={c.color}
                                                        onChange={(e) => e.target.value}
                                                        className="w-50 my-1 p-0 border"
                                                        style={{ height: "2rem" }} />
                                                </td>
                                                {/* Update */}
                                                <td>
                                                    <Link to={`/Admin/Categories/Edit/${c.id}`} style={{ textDecoration: "none" }}>
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
                                                            showDeleteModal(c.id, c.title)
                                                        }}
                                                    >
                                                        <DeleteForeverOutlinedIcon />
                                                        DELETE
                                                    </Button>
                                                </td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </table>
                    )}

            </div>
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

export default CategoryList;