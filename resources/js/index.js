import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import {store} from "./redux/root_store/Store";
import WriterApp from "./WriterApp";
// import { WriterSlice } from "./redux/isra_store/WriterSlice";

// store.dispatch(WriterSlice.endpoints.getWriters.initiate());
const container = document.getElementById("isra-app");
if (container) {
  ReactDOM.createRoot(container).render(
    //<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<WriterApp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    //</React.StrictMode>
  );
}
