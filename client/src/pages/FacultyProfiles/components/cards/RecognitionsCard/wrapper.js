import { connect } from "react-redux";
import compose from "recompose/compose";


const mapStateToProps = state => ({
    user: state.authentication.user,
});

export const wrap = compose(
    connect(mapStateToProps, null),
);