import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import React, { Component } from "react";
import uploadcare from "uploadcare-widget";


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
    }
}

export default class Uploader extends Component {
    state = {
        fileName: null,
        isUploading: false,
        error: null,
        success: false,
    };

    onInputChanged = () => {
        const file = this.fileUpload.files[0];
        this.setState({fileName: file.name, error: null});

        uploadcare.fileFrom("object", file)
                  .progress(() => {
                      this.setState({isUploading: true});
                  })
                  .done(fileInfo => {
                      this.setState({success: true, isUploading: false});

                      if (this.props.onUploadComplete) {
                          this.props.onUploadComplete(fileInfo.cdnUrl);
                      }
                  })
                  .fail(error => {
                      this.setState({error: getErrorMessageFromCode(error), isUploading: false});
                  });
    };

    render() {
        // const attributes = this.getInputAttributes();
        const classes = this.props.classes;
        const {fileName, isUploading, error, success} = this.state;

        return (
            <Grid container alignItems="center" spacing={16}>
                <Grid item>
                    <div>
                        <input
                            accept="image/*"
                            id="uploadcare-input"
                            className={classes.input}
                            onChange={this.onInputChanged}
                            ref={ref => this.fileUpload = ref}
                            type="file"
                        />
                        <label htmlFor="uploadcare-input">
                            <Button component="span" color="primary" className={classes.button}>
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
            </Grid>
        );
    }
}
