import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchFacultyListThunk } from "../../../../../../../../utils/faculty.util";
import styles from "./styles";
import SubjectModal from "./SubjectModal";


function mapStateToProps(state) {
    return {
        ...state.faculty,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData() {
            return dispatch(getFetchFacultyListThunk());
        },
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(SubjectModal);