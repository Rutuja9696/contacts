import React from "react";
import Modal from "react-modal";
import url from "../services/api/fetchData";
import styles from "../../styles/styles.module.css";

//style for modal
const customStyles = {
  content: {
    width: "45%",
    height: "auto",
    margin: "auto",
    top: "30%",
    bottom: "auto",
  },
};
//function to add new contact(modal)
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
      <div className={styles.buttonContainer}>
        <button onClick={openModal} className={styles.primaryButton}>
          + new contact
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Form Modal"
      >
        <form
          id="addContactForm"
          onSubmit={submitContact}
          className={styles.forms}
        >
          <h3>Add new contact</h3>

          <div className={styles.textFields}>
            <input
              className={styles.inputField}
              placeholder="First Name"
              name="firstName"
              required
            />
            <input
              className={styles.inputField}
              placeholder="Last Name"
              name="lastName"
              required
            />
          </div>
          <br />
          <div className={styles.textFields}>
            <input
              className={styles.inputField}
              placeholder="Email"
              name="email"
              required
            />
            <input
              className={styles.inputField}
              type="number"
              placeholder="Phone"
              name="phone"
              required
            />
          </div>
          <br />
          <div className={styles.selectStatus}>
            <label type="text" name="status">
              Status :
            </label>
            <input type="radio" name="status" value="Active" checked />
            <label for="Active">Active</label>
            <input type="radio" name="status" value="Inactive" />
            <label for="Inactive">In active</label>
          </div>
          <div className={styles.modalButtons}>
            <input
              type="submit"
              value="Submit"
              className={styles.primaryButton}
            />
            <button onClick={closeModal} className={styles.redButton}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
export default NewContact;
