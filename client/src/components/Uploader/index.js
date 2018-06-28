import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import React, { Component } from "react";
import uploadcare from "uploadcare-widget";
import { wrap } from "./wrapper";


function getErrorMessageFromCode(code) {
    switch (code) {
        case "baddata":
            return "Invalid file";
        case "size":
            return "File is too large";
        case "upload":
            return "An error occurred during upload";
        case "user":
            return "Upload was cancelled";
        case "info":
            return "Error when fetching file information";
        case "deleted":
            return "File was deleted";
        default:
            return `An error occurred: ${code}`;
    }
}

class BaseUploader extends Component {
    state = {
        fileName: null,
        isUploading: false,
        error: null,
        success: false,
    };

    setError = error => {
        this.setState({error: error, isUploading: false});
    };

    setSuccess = () => {
        this.setState({success: true, isUploading: false});
    };

    onUrlChanged(url) {
        if (this.props.onUploadComplete) {
            this.props.onUploadComplete(url);
        }
    }

    onInputChanged = event => {
        // Required for clearInput()
        event.persist();

        const file = this.fileUpload.files[0];
        this.setState({fileName: file.name, error: null});

        // When cleared and the user selects the same photo, it uploads again
        function clearInput() {
            event.target.value = "";
        }

        uploadcare.fileFrom("object", file)
                  .progress(() => {
                      this.setState({isUploading: true});
                  })
                  .done(fileInfo => {
                      clearInput();

                      if (!fileInfo.isImage) {
                          this.setError("File must be an image");
                          return;
                      }

                      this.setSuccess();
                      this.onUrlChanged(fileInfo.cdnUrl);
                  })
                  .fail(error => {
                      clearInput();
                      this.setError(getErrorMessageFromCode(error));
                  });
    };

    onClearButtonPress = () => {
        this.onUrlChanged(null);
        this.setState({
            fileName: null,
            error: null,
            isUploading: false,
            success: false,
        });
    };

    render() {
        // const attributes = this.getInputAttributes();
        const {classes, disabled} = this.props;
        const {fileName, isUploading, error, success} = this.state;

        return (
            <Grid container alignItems="center" spacing={16}>
                <Grid item>
                    <div>
                        <input
                            accept="image/*"
                            id="uploadcare-input"
                            disabled={isUploading || disabled}
                            className={classes.input}
                            onChange={this.onInputChanged}
                            ref={ref => this.fileUpload = ref}
                            type="file"
                        />
                        <label htmlFor="uploadcare-input">
                            <Button component="span" variant="outlined" color="primary" className={classes.button}
                                    disabled={isUploading || disabled}>
                                Upload a photo
                            </Button>
                        </label>
                    </div>
                </Grid>

                {fileName &&
                <Grid item>
                    <Typography color="primary">{fileName}</Typography>
                </Grid>
                }


                {isUploading &&
                <Grid item>
                    <CircularProgress color="primary" />
                </Grid>
                }

                {error &&
                <Grid item>
                    <Typography color="error">{error}</Typography>
                </Grid>
                }

                {success &&
                <Grid item>
                    <Icon color="primary">
                        <CheckIcon />
                    </Icon>
                </Grid>
                }

                {success &&
                <Grid item>
                    <Button component="span" variant="outlined" color="primary" onClick={this.onClearButtonPress}>
                        Clear photo
                    </Button>
                </Grid>
                }
            </Grid>
        );
    }
}

export const Uploader = wrap(BaseUploader);
