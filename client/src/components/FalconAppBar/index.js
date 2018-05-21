import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import FalconAppBar from "./FalconAppBar";
import styles from "./styles";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null),
)(FalconAppBar);