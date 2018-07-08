import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getTabFromIdentifier } from "../faculty_detail_tabs";
import { styles } from "./styles";


const mapStateToProps = state => ({
    activeTab: getTabFromIdentifier(state.facultyProfiles.activeTabIdentifier),
    faculty: state.faculty,
    ...state.facultyProfiles.facultyDetails,
});

export const wrap = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
);
