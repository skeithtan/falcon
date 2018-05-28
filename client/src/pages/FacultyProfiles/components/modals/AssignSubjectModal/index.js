import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchSubjectListThunk } from "../../../../../utils/subject.util";
import AssignSubjectModal from "./AssignSubjectModal";
import styles from "./styles";


function mapStateToProps(state) {
    return {
        subject: state.subject,
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
    withStyles(styles),
)(AssignSubjectModal);