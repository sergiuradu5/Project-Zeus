import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </Provider>
  </React.StrictMode>
);
