import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { FalconAppBar as Component } from "./FalconAppBar";
import { styles } from "./styles";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export const FalconAppBar = compose(
    withStyles(styles),
    connect(mapStateToProps, null),
)(Component);