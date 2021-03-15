import store from "./app/modules/redux/store/store";
import { Provider } from "react-redux";
import Contacts from "../src/app/commons/components/AddContact";
import Header from "../src/app/commons/components/Header";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Contacts></Contacts>
      </div>
    </Provider>
  );
}

export default App;
