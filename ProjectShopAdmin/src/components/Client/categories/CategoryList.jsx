import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UseFetch from "../../hooks/Usefetch";

function CategoryList() {
    const style = "col-auto m-2 row shadow p-4 text-center text-decoration-none rounded border-bottom border-5 border-success align-items-center";
    const { list } = UseFetch();

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        list("categories")
            .then(data => setCategories(data))
    }, [])

    return (
        <div className="row">
            {/* header */}
            <div id="title" className="mt-3">
                <div className="h1 text-center">The Categories</div>
            </div>
            {/* List of categories */}
            <div className="row m-auto w-75">
                {
                    categories.map(c => (
                        <Link key={c.id} to={`/Categories/${c.id}`} className={style}>
                            {/* Title */}
                            <div style={{ backgroundColor: c.color }} className="col-2 p-4 rounded-circle"></div>

                            <div className="col fs-5">{c.title}</div>
                        </Link>
                    ))
                }
            </div>
        </div >
    );
}

export default CategoryList;