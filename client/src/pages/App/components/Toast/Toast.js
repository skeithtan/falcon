import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";


export const Toast = ({
    message,
    dismissToast,
    isShowing,
    classes
}) => (
    <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
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