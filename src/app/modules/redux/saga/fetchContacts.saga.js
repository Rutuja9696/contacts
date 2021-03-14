import axios from "axios";
import { call, put } from "redux-saga/effects";
import { contactActionTypes } from "../constants/contactActionTypes";
const url = "https://contact-mongo-backend.herokuapp.com/";

const fetchContacts = async () => {
  const response = await axios.get(url);
  return response.data;
};
export function* fetchContactsSaga(payload) {
  try {
    const response = yield call(fetchContacts);
    // console.log(response);
    if (response) {
      yield put({
        type: contactActionTypes.GET,
        payload: { contacts: response },
      });
    }
  } catch (err) {
    console.log(err.message);
    yield put({
      type: contactActionTypes.GET,
      payload: { contacts: { status: "Unsuccessful", message: err.message } },
    });
  }
}
