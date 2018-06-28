import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { myProfileFetchError, myProfileIsFetched, myProfileIsLoading } from "../../redux/actions/my_profile.actions";
import { fetchMyProfile } from "../../services/faculty/faculty";
import { styles } from "./styles";


const mapStateToProps = state => state.myProfile;

const mapDispatchToProps = dispatch => ({
    fetchData() {
        dispatch(myProfileIsLoading());
        return fetchMyProfile()
            .then(result => {
                if (result.data) {
                    dispatch(myProfileIsFetched(result.data.myProfile));
                }

                if (result.errors) {
                    dispatch(myProfileFetchError(result.errors));
                }
            })
            .catch(error => {
                dispatch(myProfileFetchError([error.message]));
            });
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);