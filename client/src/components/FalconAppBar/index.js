import { withStyles, withTheme } from "material-ui/styles";
import { connect } from "react-redux";
import { compose } from "recompose";
import FalconAppBar from "./FalconAppBar";
import styles from "./styles";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export default compose(
    withTheme(),
    withStyles(styles),
    connect(mapStateToProps, null),
)(FalconAppBar);