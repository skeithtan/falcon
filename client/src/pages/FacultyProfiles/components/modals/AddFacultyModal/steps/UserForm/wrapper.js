import { connect } from "react-redux";
import compose from "recompose/compose";


const mapStateToProps = state => ({
    faculties: state.faculty.faculties,
});

export const wrap = compose(
    connect(mapStateToProps, null),
);

