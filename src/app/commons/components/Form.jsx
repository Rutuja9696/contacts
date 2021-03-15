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
//function to add new contact
function NewContact() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  //function to submit new contact
  const submitContact = (event) => {
    event.preventDefault();
    fetch(url, {
      method: "POST",
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
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "Successful")
          alert("You have added new contact successfully !");
        else alert(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    //clear input field after submit
    document.getElementById("addContactForm").reset();
  };

  return (
    <>
      <button onClick={openModal}>+ new contact</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <form id="addContactForm" onSubmit={submitContact}>
          <div>
            <input placeholder="First Name" name="firstName" required />
            <input placeholder="Last Name" name="lastName" required />
          </div>
          <div>
            <input placeholder="Email" name="email" required />
            <input type="number" placeholder="Phone" name="phone" required />
          </div>
          <div>
            <label type="text" name="status">
              Status :
            </label>
            <input type="radio" name="status" value="Active" checked />
            <label for="Active">Active</label>
            <input type="radio" name="status" value="Inactive" />
            <label for="Inactive">In active</label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </Modal>
    </>
  );
}
export default NewContact;
