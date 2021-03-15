import { useEffect, useState } from "react";
import { connect } from "react-redux";
import store from "../../modules/redux/store/store";
import { contactActionTypes } from "../../modules/redux/constants/contactActionTypes";
import contactActionObjectGenerator from "../../modules/redux/action/contactAction";
import NewContact from "./Form";

function Contacts(props) {
  //using  hook
  useEffect(() => {
    store.dispatch(contactActionObjectGenerator(contactActionTypes.GET));
  }, []);

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
              </tr>
              {props.contactProps.data.map((contact) => {
                return (
                  <>
                    <tr>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.status}</td>
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
