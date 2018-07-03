import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { App } from "./pages/App";
import { store } from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";


const app = (
    <Provider store={store}>
        <Router>
            <Route path="/:currentPage?" component={App} />
        </Router>
    </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
