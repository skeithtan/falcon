import { withTheme } from "material-ui/styles";
import { withRouter } from "react-router-dom";

import PageMenu from "./PageMenu";

export default withRouter(withTheme()(PageMenu));