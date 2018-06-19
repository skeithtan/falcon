import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "../styles";
import { ExtensionWorksTab as Component } from "./ExtensionWorksTab";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const ExtensionWorksTab = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);