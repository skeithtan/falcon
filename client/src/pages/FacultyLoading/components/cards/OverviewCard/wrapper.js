import compose from "recompose/compose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const wrap = compose(
    connect(
        mapStateToProps,
        null
    ),
    withStyles(styles)
);
