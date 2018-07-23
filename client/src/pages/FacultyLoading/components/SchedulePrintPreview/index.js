import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import PrintIcon from "@material-ui/icons/Print";
import moment from "moment";
import React, { PureComponent, Fragment } from "react";
import ReactToPrint from "react-to-print";
import pnuLogo from "../../../../images/pnu-logo.png";
import { wrap } from "./wrapper";
import { termScheduleToString } from "../../../../utils/faculty_loading.util";
import { FullPageLoadingIndicator } from "../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../components/states/ErrorState";
import { ScheduleTable } from "../ScheduleTable";

class PrintContent extends PureComponent {
    renderTable = () => {
        const { termSchedule, faculties, subjects } = this.props;
        return (
            <ScheduleTable
                termSchedule={termSchedule}
                faculties={faculties}
                subjects={subjects}
            />
        );
    };

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
        const { termSchedule } = this.props;
        const dateNow = moment().format("LLL");
        return (
            <Fragment>
                <Typography variant="title" component="h1" align="center">
                    Schedule of Classes for {termScheduleToString(termSchedule)}
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
        const { classes } = this.props;
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
                <Grid item>{this.renderTable()}</Grid>
            </Grid>
        );
    }
}

const Transition = props => <Slide direction="up" {...props} />;

class BaseSchedulePrintPreview extends PureComponent {
    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchData();
    }

    fetchData = () => {
        const {
            faculties,
            subjects,
            fetchAllFaculties,
            fetchAllSubjects,
        } = this.props;

        if (!faculties.faculties && !faculties.isLoading && !faculties.errors) {
            fetchAllFaculties();
        }

        if (!subjects.subjects && !subjects.isLoading && !subjects.errors) {
            fetchAllSubjects();
        }
    };

    renderLoading = () => <FullPageLoadingIndicator size={100} />;

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchSubjectList}
            message="An error occurred while trying to fetch list of subjects"
            debug={errors[0]}
        />
    );

    renderPrintPreview = () => {
        const { classes, termSchedule, faculties, subjects } = this.props;

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
                                    termSchedule={termSchedule}
                                    faculties={faculties.faculties}
                                    subjects={subjects.subjects}
                                />
                            </div>
                        </div>
                    </div>
                </Grid>
                <ReactToPrint
                    trigger={() => (
                        <Button
                            variant="extendedFab"
                            color="primary"
                            className={classes.printButton}
                        >
                            <PrintIcon className={classes.printIcon} />
                            Print Schedule
                        </Button>
                    )}
                    content={() => this.componentRef}
                />
            </Grid>
        );
    };

    render() {
        const {
            onClose,
            classes,
            open,
            faculties,
            subjects,
            fetchAllFaculties,
            fetchAllSubjects,
        } = this.props;

        const isLoading = faculties.isLoading || subjects.isLoading;
        const errors = faculties.errors || subjects.errors;
        const onErrorRetryButtonClick = faculties.errors
            ? fetchAllFaculties
            : fetchAllSubjects;

        const dataIsFetched =
            faculties.faculties !== null && subjects.subjects !== null;

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
                            Schedule Print Preview
                        </Typography>
                    </Toolbar>
                </AppBar>

                {isLoading && this.renderLoading()}
                {errors && this.renderErrors(errors, onErrorRetryButtonClick)}
                {dataIsFetched && this.renderPrintPreview()}
            </Dialog>
        );
    }
}

export const SchedulePrintPreview = wrap(BaseSchedulePrintPreview);
