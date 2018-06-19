import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { HOME_PAGE } from "./pages";
import { App } from "./pages/App";
import { store } from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";

const app = (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/:currentPage/" component={App} />
                <Route path="/" render={() => <Redirect to={HOME_PAGE.path} />} />
            </Switch>
        </Router>
    </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
