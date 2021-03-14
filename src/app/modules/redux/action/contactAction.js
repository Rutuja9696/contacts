// import axios from "axios";
import { contactActionTypes } from "../constants/contactActionTypes";
// const url = "https://contact-mongo-backend.herokuapp.com/";
const contactActionObjectGenerator = (actionType, payload = {}) => {
  switch (actionType) {
    case contactActionTypes.GET:
      return {
        type: contactActionTypes.GET,
        payload: {
          contacts: {},
        },
      };
    default: {
      return {
        type: "Invalid Action",
      };
    }
  }
};
export default contactActionObjectGenerator;
