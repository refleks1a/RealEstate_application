import { Provider } from "react-redux";
import React from "react";

import Routes from "./Routes";
import { store } from "./app/store";


function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
