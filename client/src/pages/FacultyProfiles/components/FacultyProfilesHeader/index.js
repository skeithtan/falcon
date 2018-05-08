import { connect } from "react-redux";
import { compose } from "recompose";
import { setActiveTab } from "../../../../actions/faculty_profiles.actions";

import FacultyProfilesHeader from "./FacultyProfilesHeader";
import { setSearchKeyword } from "../../../../actions/faculty_profiles.actions";

function mapStateToProps(state) {
    return {
        searchKeyword: state.facultyProfiles.searchKeyword,
        activeFacultyId: state.facultyProfiles.activeFacultyId,
        activeTabIdentifier: state.facultyProfiles.activeTabIdentifier,
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
