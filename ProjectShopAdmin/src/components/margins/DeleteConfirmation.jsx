import React from 'react'
import { Modal, Button } from "react-bootstrap";

function DeleteConfirmation({ showModal, remove, Cancel, message, id }) {
    return (
        <Modal show={showModal} onHide={Cancel}>

            <Modal.Header closeButton>
                <Modal.Title>Delete Category </Modal.Title>
            </Modal.Header>

            <Modal.Body className='bg-danger'>
                <div className='h5 text-white'>
                    {message}
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="default" onClick={Cancel}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={() => remove(id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteConfirmation;

{/* <DeleteConfirmation
    showModal={selectionPopup}
    remove={submitDelete}
    Cancel={Cancel}
    message={message}
    id={id}
/> */}

// // ========= Delete =====================//
// const [id, setId] = useState(null);
// const [selectionPopup, setSelectionPopup] = useState(false);
// const [message, setMessage] = useState(null);

// // function delete category //
// const showDeleteModal = (id) => {
//     setId(id)
//     setSelectionPopup(true)
//     setMessage(`Are you sure you want to delete the product ?`)
// };
// // cancel page =============>
// const Cancel = () => {
//     setSelectionPopup(false);
// }
// // delete category ===============>
// const submitDelete = (id) => {
//     remove("categories", id)
//     setSelectionPopup(false);
//     window.location.reload(true);
// };


// onClick={() => {
//     showDeleteModal(c.id)
// }}