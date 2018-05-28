import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchFacultyListThunk } from "../../../../../../utils/faculty.util";
import { FacultyChips as Component } from "./FacultyChips";


function mapStateToProps(state) {
    return {
        ...state.faculty,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            dispatch(getFetchFacultyListThunk());
        },
    };
}

export const FacultyChips = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Component);