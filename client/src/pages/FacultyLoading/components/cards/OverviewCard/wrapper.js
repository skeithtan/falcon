import compose from "recompose/compose";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const wrap = compose(
    connect(
        mapStateToProps,
        null
    )
);
