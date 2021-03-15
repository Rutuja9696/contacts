import React from "react";
import Modal from "react-modal";
import url from "../services/api/fetchData";
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
    let id = event.target.parentNode.parentNode.id;
    fetch(url + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: event.target.parentNode.parentNode.querySelector(
          "#firstname"
        ).innerText,
        lastName: event.target.parentNode.parentNode.querySelector("#lastname")
          .innerText,
        email: event.target.parentNode.parentNode.querySelector("#email")
          .innerText,
        phone: event.target.parentNode.parentNode.querySelector("#phone")
          .innerText,
        status: event.target.parentNode.parentNode.querySelector("#status")
          .innerText,
      }),
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        alert("Edited contact successfully !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <form id="addContactForm" onSubmit={editContact}>
          <div>
            <input
              placeholder="First Name"
              name="firstName"
              required
              defaultValue={props.contact.firstName}
            />
            <input
              placeholder="Last Name"
              name="lastName"
              required
              defaultValue={props.contact.lastName}
            />
          </div>
          <div>
            <input
              placeholder="Email"
              name="email"
              required
              defaultValue={props.contact.email}
            />
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              required
              defaultValue={props.contact.phone}
            />
          </div>
          <div>
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
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </>
  );
}
export default EditContact;
