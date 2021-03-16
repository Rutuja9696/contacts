import React from "react";
import Modal from "react-modal";
import url from "../services/api/fetchData";
import styles from "../../styles/styles.module.css";

//style for modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
//function to edit contact(modal)
function EditContact(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const editContact = (event) => {
    event.preventDefault();
    let id = props.contact.contactId;
    fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        status: event.target.status.value,
      }),
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        alert("Contact Updated successfully !");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button onClick={openModal} className={styles.primaryButton}>
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // onSubmit={closeModal}
        style={customStyles}
        contentLabel="Edit Form Modal"
      >
        <form
          id="addContactForm"
          onSubmit={editContact}
          className={styles.forms}
        >
          <h3>Edit contact</h3>
          <div className={styles.textFields}>
            <input
              className={styles.inputField}
              placeholder="First Name"
              name="firstName"
              required
              defaultValue={props.contact.firstName}
            />
            <input
              className={styles.inputField}
              placeholder="Last Name"
              name="lastName"
              required
              defaultValue={props.contact.lastName}
            />
          </div>
          <br />
          <div className={styles.textFields}>
            <input
              className={styles.inputField}
              placeholder="Email"
              name="email"
              required
              defaultValue={props.contact.email}
            />
            <input
              className={styles.inputField}
              type="number"
              placeholder="Phone"
              name="phone"
              required
              defaultValue={props.contact.phone}
            />
          </div>
          <br />
          <div className={styles.selectStatus}>
            <label type="text" name="status">
              Status :
            </label>
            <input
              type="radio"
              name="status"
              value="Active"
              defaultChecked={props.contact.status === "Active" ? true : false}
            />
            <label for="Active">Active</label>
            <input
              type="radio"
              name="status"
              value="Inactive"
              defaultChecked={
                props.contact.status === "Inactive" ? true : false
              }
            />
            <label for="Inactive">In active</label>
          </div>
          <div className={styles.modalButtons}>
            <input
              type="submit"
              value="Update"
              className={styles.primaryButton}
            />
            <button onClick={closeModal} className={styles.redButton}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
export default EditContact;
