import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "../styles";
import { InstructionalMaterialsTab as Component } from "./InstructionalMaterialsTab";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const InstructionalMaterialsTab = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
)(Component);