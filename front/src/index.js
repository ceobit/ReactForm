import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppContextProvider } from "./context";

ReactDOM.render(
  //  Убираю строгий режим, чтобы не сыпались ошибки во время разработки из-за устаревших методов material-ui
  // <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
