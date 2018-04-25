import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./App";
import store from "./store";


const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
