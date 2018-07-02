import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { initiateFetchChangeRequests } from "../../../../utils/change_request.util";
import { initiateFetchAllFacultiesSummary } from "../../../../utils/faculty.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    changeRequests: state.changeRequests,
    faculties: state.faculty,
    user: state.authentication.user,
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
);