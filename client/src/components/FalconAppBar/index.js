import { connect } from "react-redux";
import { withTheme, withStyles } from "material-ui/styles";
import { compose } from "recompose";

import styles from "./styles";
import FalconAppBar from "./FalconAppBar";

function mapStateToProps(state) {
    console.log(state);
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export default compose(
    withTheme(),
    withStyles(styles),
    connect(mapStateToProps, null),
)(FalconAppBar);