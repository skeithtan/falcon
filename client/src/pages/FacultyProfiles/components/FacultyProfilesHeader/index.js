import { connect } from "react-redux";
import { compose } from "recompose";
import { activeTabChanged } from "../../../../actions/faculty_profiles.actions";

import FacultyProfilesHeader from "./FacultyProfilesHeader";
import { searchKeywordChanged } from "../../../../actions/faculty_profiles.actions";

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
            dispatch(searchKeywordChanged(searchKeyword));
        },

        onTabClick(tab) {
            dispatch(activeTabChanged(tab));
        },
    };
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(FacultyProfilesHeader);
