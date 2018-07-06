import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import React, { PureComponent } from "react";
import { wrap } from "./wrapper";


class BaseToast extends PureComponent {
    render() {
        const {
            message,
            dismissToast,
            isShowing,
            classes,
        } = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                open={isShowing}
                onClose={dismissToast}
                autoHideDuration={3000}
                message={message}
                action={
                    <Button
                        className={classes.button}
                        size="small"
                        onClick={dismissToast}
                    >
                        Dismiss
                    </Button>
                }
            />
        );
    }
}


export const Toast = wrap(BaseToast);