import { connect } from "react-redux";
import { compose } from "recompose";
import { setActiveTab } from "../../../../actions/faculty_detail.actions";

import FacultyProfilesHeader from "./FacultyProfilesHeader";
import { setSearchKeyword } from "../../../../actions/faculty_list.actions";

function mapStateToProps(state) {
    return {
        searchKeyword: state.facultyList.searchKeyword,
        activeFaculty: state.facultyList.activeFaculty,
        activeTabIdentifier: state.facultyDetail.activeTabIdentifier,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSearchInputChange(searchKeyword) {
            dispatch(setSearchKeyword(searchKeyword));
        },

        onTabClick(tab) {
            dispatch(setActiveTab(tab));
        },
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FacultyProfilesHeader);
