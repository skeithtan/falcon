import { connect } from "react-redux";
import { withTheme } from "material-ui/styles";

import FalconAppBar from "./FalconAppBar";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export default connect(mapStateToProps, null)(withTheme()(FalconAppBar));