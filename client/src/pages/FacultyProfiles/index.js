import { connect } from "react-redux";

import FacultyProfilesPage from "./FacultyProfiles";
import { setActivePage as makeSetActivePageAction } from "../../actions/pages.actions";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setActivePage(page) {
            dispatch(makeSetActivePageAction(page));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyProfilesPage);