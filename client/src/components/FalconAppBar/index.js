import { connect } from "react-redux";
import FalconAppBar from "./FalconAppBar";


function mapStateToProps(state) {
    return {
        activePageIdentifier: state.pages.activePageIdentifier,
    };
}

export default connect(mapStateToProps, null)(FalconAppBar);