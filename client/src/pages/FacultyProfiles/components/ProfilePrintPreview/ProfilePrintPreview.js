import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React, { Component } from "react";
import ReactToPrint from "react-to-print";
import pnuLogo from "../../../../images/pnu-logo.png";
import { getFullName } from "../../../../utils/user.util";
import { DegreesPrintComponent } from "../print_components/DegreesPrintComponent";
import { OverviewPrintComponent } from "../print_components/OverviewPrintComponent";


class PrintContent extends Component {
    render() {
        const {
            classes,
            faculty,
            includeDegrees,
            includeRecognitions,
            includePresentations,
            includeInstructionalMaterials,
            includeExtensionWorks,
        } = this.props;

        return (
            <Grid container spacing={32} direction="column" className={classes.printPageContainer}>
                <Grid item>
                    <Grid container spacing={8} direction="row" alignItems="center">
                        <Grid item>
                            <img src={pnuLogo} className={classes.pnuLogo} alt="PNU Logo" />
                        </Grid>
                        <Grid item>
                            <Grid container spacing={0} direction="column">
                                <Grid item>
                                    <Typography variant="title" component="h1">
                                        Philippine Normal University
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="subheading" color="textSecondary">
                                        Faculty of Arts and Languages
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography variant="title" component="h1" align="center">
                        {getFullName(faculty.user)}'s Profile
                    </Typography>
                </Grid>

                <Grid item>
                    <OverviewPrintComponent faculty={faculty} />
                </Grid>

                {includeDegrees &&
                <Grid item>
                    <DegreesPrintComponent faculty={faculty} />
                </Grid>
                }

            </Grid>
        );
    }
}

const Transition = props => (
    <Slide direction="up" {...props} />
);

export class ProfilePrintPreview extends Component {
    state = {
        includeDegrees: false,
        includeRecognitions: false,
        includePresentations: false,
        includeInstructionalMaterials: false,
        includeExtensionWorks: false,
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    componentWillUnmount() {
        this.props.onClose();
    }

    render() {
        const {faculty, onClose, classes, open} = this.props;

        return (
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <div className={classes.printPreviewContainer}>
                    <AppBar position="static" color="primary">
                        <Toolbar>
                            <IconButton color="inherit" onClick={onClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.printPreviewTitle}>
                                Faculty Profile Print Preview
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div className={classes.printContentContainerBackdrop}>
                        <div className={classes.settingsContainer}>
                            <Grid container spacing={24} direction="column">
                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Print Settings</FormLabel>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.includeDegrees}
                                                        onChange={this.handleChange("includeDegrees")}
                                                    />
                                                }
                                                label="Include Degrees"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.includeRecognitions}
                                                        onChange={this.handleChange("includeRecognitions")}
                                                    />
                                                }
                                                label="Include Recognitions"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.includePresentations}
                                                        onChange={this.handleChange("includePresentations")}
                                                    />
                                                }
                                                label="Include Presentations"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.includeInstructionalMaterials}
                                                        onChange={this.handleChange("includeInstructionalMaterials")}
                                                    />
                                                }
                                                label="Include Instructional Materials"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.includeExtensionWorks}
                                                        onChange={this.handleChange("includeExtensionWorks")}
                                                    />
                                                }
                                                label="Include Extension Works"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <ReactToPrint
                                        trigger={() => <Button variant="raised" color="primary">Print</Button>}
                                        content={() => this.componentRef}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                        <div className={classes.printContentContainer}>
                            <PrintContent
                                ref={el => this.componentRef = el}
                                classes={classes}
                                faculty={faculty}
                                {...this.state}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}