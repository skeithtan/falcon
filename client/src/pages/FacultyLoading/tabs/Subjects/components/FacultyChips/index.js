import { connect } from "react-redux";
import compose from "recompose/compose";
import { fetchAllFaculties } from "../../../../../../utils/faculty.util";
import { FacultyChips as Component } from "./FacultyChips";


const mapStateToProps = state => ({
    ...state.faculty,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        fetchAllFaculties(dispatch);
    },
});

export const FacultyChips = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Component);