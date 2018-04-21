import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import theme from "./theme";
import "./index.css";
import App from "./App";

const app = (
    <MuiThemeProvider muiTheme={theme}>
        <App />
    </MuiThemeProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
