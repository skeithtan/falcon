import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "../styles";
import { PresentationsTab as Component } from "./PresentationsTab";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const PresentationsTab = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);