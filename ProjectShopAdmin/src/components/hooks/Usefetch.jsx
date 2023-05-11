import { useState } from "react";

function UseFetch() {
    const server_url = "http://localhost:5000";
    const [loading, setLoading] = useState(false);

    

    // List : list of {categories / products / commands / users}
    const list = (resource) => {
        return new Promise((resolve, reject) => {
            fetch(`${server_url}/${resource}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }
    // get : details of {categories / products / commands / users}
    const get = (resource, id) => {
        return new Promise((resolve, reject) => {
            fetch(`${server_url}/${resource}/${id}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }
    // create : create of {categories / products / commands / users}
    const create = (resource, body) => {
        return new Promise((resolve, reject) => {
            fetch(`${server_url}/${resource}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }
    // Update : Update of {categories / products / commands / users}
    const edit = (resource, id, body) => {
        return new Promise((resolve, reject) => {
            fetch(`${server_url}/${resource}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }
    // Delete : Delete of {categories / products / commands / users}
    const remove = (resource, id) => {
        return new Promise((resolve, reject) => {
            fetch(`${server_url}/${resource}/${id}`,
                { method: "DELETE" }
            )
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }
    // Image : Uplodad and Remove //
    const server_url_img = "http://localhost:5000/files/upload";
    // Image : Uplodad //
    const upload = (thumbnail) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', thumbnail)
            fetch(`${server_url_img}`, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then(data => resolve(data.file))
                .catch(error => reject(error))
        })
    }

    return {
        loading, list, get, create, edit, remove, upload, 
    }
}

export default UseFetch;