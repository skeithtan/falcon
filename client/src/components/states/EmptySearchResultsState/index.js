import Typography from "@material-ui/core/Typography";
import Search from "@material-ui/icons/Search";
import React, {PureComponent} from "react";
import { wrap } from "../common_state_wrapper";

class BaseEmptySearchResultsState extends PureComponent {
    render() {
        const {classes, searchKeyword} = this.props;
        return (
            <div className={classes.blankState}>
                <div className={classes.messageWrapper}>
                    <Search className={`${classes.messageColor} ${classes.icon}`} />
                    <Typography variant="headline" className={classes.messageColor}>
                        No Results Found
                    </Typography>
                    <div className={classes.wordWrapContainer}>
                        <Typography variant="subheading" className={classes.messageColor}>
                            Your search <b className={classes.breakWord}>{searchKeyword}</b> did not match any documents.
                        </Typography>
                    </div>
        
                </div>
            </div>
        );
    }
}

export const EmptySearchResultsState = wrap(BaseEmptySearchResultsState);