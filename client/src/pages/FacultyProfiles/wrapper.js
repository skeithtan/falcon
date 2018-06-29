import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { fetchMyChangeRequests } from "../../services/faculty/change_requests";
import { fetchChangeRequests } from "../../utils/change_request.util";
import { fetchAllFaculties } from "../../utils/faculty.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    ...state.faculty,
    changeRequests: state.changeRequests,
});

const mapDispatchToProps = dispatch => ({
    fetchAllFaculties() {
        fetchAllFaculties(dispatch);
    },

    fetchChangeRequests() {
        return fetchChangeRequests(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);