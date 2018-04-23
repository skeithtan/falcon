import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import App from "./App";

const app = (
    <App/>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
