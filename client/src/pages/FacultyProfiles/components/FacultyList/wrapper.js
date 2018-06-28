import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { styles } from "./styles";


const mapStateToProps = state => ({
    activeFacultyId: state.facultyProfiles.activeFacultyId,
    searchKeyword: state.facultyProfiles.searchKeyword,
    user: state.authentication.user,
    ...state.faculty,
});

export const wrap = compose(
    connect(mapStateToProps, null),
    withStyles(styles),
);
