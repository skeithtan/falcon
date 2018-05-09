import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import store from "./store";


const app = (
    <Provider store={store}>
        <Router>
            <Route path="/:currentPage*/" component={App} />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
