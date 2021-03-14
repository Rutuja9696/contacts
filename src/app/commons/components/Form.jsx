import { Component } from "react";
import url from "../services/api/fetchData";
class NewContact extends Component {
  //function to submit new contact
  submitContact = (event) => {
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
  render() {
    return (
      <>
        <form id="addContactForm" onSubmit={this.submitContact}>
          <div>
            <input placeholder="First Name" name="firstName" />
            <input placeholder="Last Name" name="lastName" />
          </div>
          <div>
            <input placeholder="Email" name="email" />
            <input type="number" placeholder="Phone" name="phone" />
          </div>
          <div>
            <label type="text" name="status">
              Status :
            </label>
            <input type="radio" name="status" value="Active" />
            <label for="Active">Active</label>
            <input type="radio" name="status" value="Inactive" />
            <label for="Inactive">In active</label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}
export default NewContact;
