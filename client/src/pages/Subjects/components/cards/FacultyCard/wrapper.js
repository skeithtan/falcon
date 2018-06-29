import { connect } from "react-redux";
import compose from "recompose/compose";
import { initiateFetchAllFacultiesSummary } from "../../../../../utils/faculty.util";


const mapStateToProps = state => ({
    ...state.faculty,
    user: state.authentication.user,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        initiateFetchAllFacultiesSummary(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
);