import "video-react/dist/video-react.css";

import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
