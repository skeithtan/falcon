import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { styles } from "./styles";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const wrap = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
    withRouter,
);