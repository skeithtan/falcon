import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { initiateFetchChangeRequests, initiateFetchMyChangeRequests } from "../../../../../utils/change_request.util";
import { initiatefetchAllFaculties } from "../../../../../utils/faculty.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    changeRequests: state.changeRequests,
    faculties: state.faculty,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchAllFaculties() {
        initiatefetchAllFaculties(dispatch);
    },

    fetchAllChangeRequests() {
        return initiateFetchChangeRequests(dispatch);
    },

    fetchMyChangeRequests() {
        return initiateFetchMyChangeRequests(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);