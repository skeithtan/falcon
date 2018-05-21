import { withStyles, withTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchSubjectListThunk } from "../../../../../utils/subject.util";
import styles from "./styles";
import SubjectsTab from "./Subjects";


function mapStateToProps(state) {
    return {
        ...state.subject,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            dispatch(getFetchSubjectListThunk());
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTheme(),
    withStyles(styles),
)(SubjectsTab);