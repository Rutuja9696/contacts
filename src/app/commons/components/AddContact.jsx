import { useEffect } from "react";
import { connect } from "react-redux";
import store from "../../modules/redux/store/store";
import { contactActionTypes } from "../../modules/redux/constants/contactActionTypes";
import contactActionObjectGenerator from "../../modules/redux/action/contactAction";
import NewContact from "./Form";
import EditContact from "./EditForm";
import url from "../services/api/fetchData";
import styles from "../../styles/styles.module.css";

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
  //markup
  return (
    <div className={styles.continer}>
      <NewContact />
      <>
        {props.contactProps.status === "Successful" ? (
          <div className={styles.tableContainer}>
            <table>
              <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>PHONE NO</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
              {props.contactProps.data.map((contact) => {
                return (
                  <>
                    <tr key={contact.contactId} id={contact.contactId}>
                      <td id="firstname">{contact.firstName}</td>
                      <td id="lastname">{contact.lastName}</td>
                      <td id="email">{contact.email}</td>
                      <td id="phone">{contact.phone}</td>
                      <td id="status">{contact.status}</td>
                      <td>
                        <EditContact contact={contact} />
                        <input
                          type="button"
                          value="X"
                          onClick={deleteContact}
                          className={styles.redButton}
                        />
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
