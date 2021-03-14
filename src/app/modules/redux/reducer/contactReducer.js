import { contactActionTypes } from "../constants/contactActionTypes";
const initialState = {
  contacts: {},
};
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case contactActionTypes.GET:
      return {
        ...state,
        contacts: { ...state.contacts, ...action.payload.contacts },
      };
    default:
      return {
        ...state,
      };
  }
};
export default contactReducer;
