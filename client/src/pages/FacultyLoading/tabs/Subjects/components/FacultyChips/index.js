import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchFacultyListThunk } from "../../../../../../utils/faculty.util";
import FacultyChips from "./FacultyChips";


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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FacultyChips);