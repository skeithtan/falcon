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
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
import React, { Component, PureComponent, Fragment } from "react";
import ReactToPrint from "react-to-print";
import { FullPageLoadingIndicator } from "../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../components/states/ErrorState";
import pnuLogo from "../../../../images/pnu-logo.png";
import { getFullName } from "../../../../utils/user.util";
import { DegreesPrintComponent } from "../print_components/DegreesPrintComponent";
import { ExtensionWorksPrintComponent } from "../print_components/ExtensionWorksPrintComponent";
import { InstructionalMaterialsPrintComponent } from "../print_components/InstructionalMaterialsPrintComponent";
import { OverviewPrintComponent } from "../print_components/OverviewPrintComponent";
import { PresentationsPrintComponent } from "../print_components/PresentationsPrintComponent";
import { RecognitionsPrintComponent } from "../print_components/RecognitionsPrintComponent";
import { TeachingSubjectsPrintComponent } from "../print_components/TeachingSubjectsPrintComponent";
import { wrap } from "./wrapper";

class PrintContent extends PureComponent {
    renderReportHeader = () => {
        const { classes } = this.props;
        return (
            <Grid container spacing={8} direction="row" alignItems="center">
                <Grid item>
                    <img
                        src={pnuLogo}
                        className={classes.pnuLogo}
                        alt="PNU Logo"
                    />
                </Grid>
                <Grid item>
                    <Grid container spacing={0} direction="column">
                        <Grid item>
                            <Typography variant="title" component="h1">
                                Philippine Normal University
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="subheading"
                                color="textSecondary"
                            >
                                Faculty of Arts and Languages
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    };

    renderReportTitle = () => {
        const { faculty } = this.props;
        const dateNow = moment().format("LLL");

        return (
            <Fragment>
                <Typography variant="title" component="h1" align="center">
                    {getFullName(faculty.user)}'s Profile
                </Typography>
                <Typography
                    variant="subheading"
                    align="center"
                    color="textSecondary"
                >
                    Generated {dateNow}
                </Typography>
            </Fragment>
        );
    };

    render() {
        const {
            classes,
            faculty,
            subjects,
            includeTeachingSubjects,
            includeDegrees,
            includeRecognitions,
            includePresentations,
            includeInstructionalMaterials,
            includeExtensionWorks,
        } = this.props;

        return (
            <Grid
                container
                spacing={32}
                direction="column"
                className={classes.printPageContainer}
                wrap="nowrap"
            >
                <Grid item>{this.renderReportHeader()}</Grid>

                <Grid item>{this.renderReportTitle()}</Grid>

                <Grid item>
                    <OverviewPrintComponent faculty={faculty} />
                </Grid>

                {includeTeachingSubjects && (
                    <Grid item>
                        <TeachingSubjectsPrintComponent
                            faculty={faculty}
                            subjects={subjects}
                        />
                    </Grid>
                )}

                {includeDegrees && (
                    <Grid item>
                        <DegreesPrintComponent faculty={faculty} />
                    </Grid>
                )}

                {includeRecognitions && (
                    <Grid item>
                        <RecognitionsPrintComponent faculty={faculty} />
                    </Grid>
                )}

                {includePresentations && (
                    <Grid item>
                        <PresentationsPrintComponent faculty={faculty} />
                    </Grid>
                )}

                {includeInstructionalMaterials && (
                    <Grid item>
                        <InstructionalMaterialsPrintComponent
                            faculty={faculty}
                        />
                    </Grid>
                )}

                {includeExtensionWorks && (
                    <Grid item>
                        <ExtensionWorksPrintComponent faculty={faculty} />
                    </Grid>
                )}
            </Grid>
        );
    }
}

const Transition = props => <Slide direction="up" {...props} />;

class BaseProfilePrintPreview extends Component {
    state = {
        includeTeachingSubjects: true,
        includeDegrees: true,
        includeRecognitions: true,
        includePresentations: true,
        includeInstructionalMaterials: true,
        includeExtensionWorks: true,
    };

    componentDidMount() {
        const {
            fetchSubjectList,
            subjects: { isLoading, subjects },
        } = this.props;

        if (!subjects && !isLoading) {
            fetchSubjectList();
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    renderLoading = () => <FullPageLoadingIndicator size={100} />;

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchSubjectList}
            message="An error occurred while trying to fetch list of subjects"
            debug={errors[0]}
        />
    );

    renderPrintSettings = () => (
        <FormControl component="fieldset">
            <FormLabel component="legend">Print Settings</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.includeTeachingSubjects}
                            onChange={this.handleChange(
                                "includeTeachingSubjects"
                            )}
                        />
                    }
                    label="Include Subjects of Expertise"
                />

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
                            onChange={this.handleChange(
                                "includeInstructionalMaterials"
                            )}
                        />
                    }
                    label="Include Instructional Materials"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.includeExtensionWorks}
                            onChange={this.handleChange(
                                "includeExtensionWorks"
                            )}
                        />
                    }
                    label="Include Extension Works"
                />
            </FormGroup>
        </FormControl>
    );

    renderPrintPreview = () => {
        const { faculty, subjects, classes } = this.props;

        return (
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="stretch"
                wrap="nowrap"
            >
                <Grid item xs>
                    <div className={classes.printPreviewPagesContainer}>
                        <div className={classes.printPreviewBackdrop}>
                            <div className={classes.printPage}>
                                <PrintContent
                                    ref={el => (this.componentRef = el)}
                                    classes={classes}
                                    faculty={faculty}
                                    subjects={subjects.subjects}
                                    {...this.state}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.settingsContainer}>
                        {this.renderPrintSettings()}
                        <ReactToPrint
                            trigger={() => (
                                <Button
                                    variant="extendedFab"
                                    color="primary"
                                    className={classes.printButton}
                                >
                                    <PrintIcon className={classes.printIcon} />
                                    Print Profile
                                </Button>
                            )}
                            content={() => this.componentRef}
                        />
                    </div>
                </Grid>
            </Grid>
        );
    };

    render() {
        const { faculty, onClose, classes, open, subjects } = this.props;

        return (
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                transitionDuration={300}
                TransitionComponent={Transition}
            >
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="title"
                            color="inherit"
                            className={classes.printPreviewTitle}
                        >
                            Faculty Profile Print Preview
                        </Typography>
                    </Toolbar>
                </AppBar>
                {subjects.isLoading && this.renderLoading()}
                {subjects.errors && this.renderErrors(subjects.errors)}
                {subjects.subjects !== null && this.renderPrintPreview(faculty)}
            </Dialog>
        );
    }
}

export const ProfilePrintPreview = wrap(BaseProfilePrintPreview);
