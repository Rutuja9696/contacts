import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/root.reducer";
import { fetchContactsSaga } from "../saga/fetchContacts.saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(fetchContactsSaga);
export default store;
