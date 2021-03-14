import store from "./app/modules/redux/store/store";
import { Provider } from "react-redux";
import Contacts from "../src/app/commons/components/AddContact";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Contacts></Contacts>
      </div>
    </Provider>
  );
}

export default App;
