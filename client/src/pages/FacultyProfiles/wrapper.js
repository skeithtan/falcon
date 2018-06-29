import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { initiateFetchChangeRequests } from "../../utils/change_request.util";
import { initiateFetchAllFacultiesSummary } from "../../utils/faculty.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    ...state.faculty,
    changeRequests: state.changeRequests,
});

const mapDispatchToProps = dispatch => ({
    fetchAllFaculties() {
        initiateFetchAllFacultiesSummary(dispatch);
    },

    fetchChangeRequests() {
        return initiateFetchChangeRequests(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);