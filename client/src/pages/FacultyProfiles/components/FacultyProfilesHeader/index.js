import { connect } from "react-redux";
import { compose } from "recompose";

import FacultyProfilesHeader from "./FacultyProfilesHeader";
import { setSearchKeyword } from "../../../../actions/faculty_list.actions";

function mapStateToProps(state) {
    return {
        searchKeyword: state.facultyList.searchKeyword,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSearchInputChange(searchKeyword) {
            dispatch(setSearchKeyword(searchKeyword));
        },
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FacultyProfilesHeader);
