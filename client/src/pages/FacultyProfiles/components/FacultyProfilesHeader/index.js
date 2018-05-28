import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { detailActiveTabChanged, searchKeywordChanged } from "../../../../actions/faculty_profiles.actions";
import { FacultyProfilesHeader as Component } from "./FacultyProfilesHeader";
import { styles } from "./styles";


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
            dispatch(detailActiveTabChanged(tab));
        },
    };
}

export const FacultyProfilesHeader = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(Component);
