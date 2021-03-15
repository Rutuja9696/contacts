import { useEffect } from "react";
import { connect } from "react-redux";
import store from "../../modules/redux/store/store";
import { contactActionTypes } from "../../modules/redux/constants/contactActionTypes";
import contactActionObjectGenerator from "../../modules/redux/action/contactAction";
import NewContact from "./Form";
import url from "../services/api/fetchData";

function Contacts(props) {
  //using  hook
  useEffect(() => {
    store.dispatch(contactActionObjectGenerator(contactActionTypes.GET));
  }, []);
  //delete contact
  const deleteContact = (event) => {
    let id = event.target.parentNode.parentNode.id;
    fetch(url + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        alert("Deleted contact successfully !");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(props);
  //markup
  return (
    <div>
      <h1>this is a component</h1>
      <NewContact />
      <>
        {props.contactProps.status === "Successful" ? (
          <div>
            <table>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Id</th>
                <th>Phone no</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {props.contactProps.data.map((contact) => {
                return (
                  <>
                    <tr key={contact.contactId} id={contact.contactId}>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.status}</td>
                      <td>
                        <input
                          type="button"
                          value="X"
                          onClick={deleteContact}
                        />
                        <button>Edit</button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
        ) : (
          <div></div>
        )}
      </>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    contactProps: state.contactReducer.contacts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getContact: (payload = {}) => {
      return dispatch(
        contactActionObjectGenerator(contactActionTypes.GET, payload)
      );
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
