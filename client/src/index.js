import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { HOME_PAGE } from "./pages/pages";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import store from "./store";


const app = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/:currentPage/" component={App} />
                <Route path="/" component={() => <Redirect to={HOME_PAGE.path} />} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
