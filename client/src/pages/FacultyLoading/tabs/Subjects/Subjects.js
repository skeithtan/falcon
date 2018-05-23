import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React, { Component } from "react";
import DetailCard from "../../../../components/DetailCard";
import FullPageLoadingIndicator from "../../../../components/FullPageLoadingIndicator";
import EmptyState from "../../../../components/states/EmptyState";
import ErrorState from "../../../../components/states/ErrorState";
import SubjectModal from "../../components/modals/SubjectModal";
import SubjectRow from "./components/SubjectRow";


export default class SubjectsTab extends Component {
    state = {
        activeSubject: null,
        subjectModalIsShowing: false,
    };

    constructor(props) {
        super(props);
        const {subjects, isLoading, fetchData} = props;
        if (!subjects && !isLoading) {
            fetchData();
        }
    }

    toggleSubjectModal = shouldShow => this.setState({
        subjectModalIsShowing: shouldShow,
    });

    onAddButtonClick = () => this.setState({
        activeSubject: null,
        subjectModalIsShowing: true,
    });

    renderEmptyState = () => (
        <DetailCard>
            <EmptyState bigMessage="There are no subjects found"
                        smallMessage="Subjects added will be shown here"
                        onAddButtonClick={this.onAddButtonClick}
                        addButtonText="Add a subject" />
        </DetailCard>
    );

    renderLoadingIndicator = () => (
        <FullPageLoadingIndicator size={100} />
    );

    renderSubjectsHead = () => (
        <Toolbar>
            <Typography variant="title">
                Subjects
            </Typography>
        </Toolbar>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchData}
            message="An error occurred while trying to fetch list of subjects"
            debug={errors[0]}
        />
    );

    renderSubjects = subjects => {
        if (subjects.length === 0) {
            return this.renderEmptyState();
        }

        return subjects.map(subject =>
            <SubjectRow
                key={subject._id}
                subject={subject}
                onUpdateButtonClick={() => this.setState({
                    activeSubject: subject,
                    subjectModalIsShowing: true,
                })} />,
        );
    };

    renderAddSubjectButton = () => (
        <Tooltip title="Add a subject">
            <Button
                variant="fab"
                color="primary"
                onClick={this.onAddButtonClick}
                className={this.props.classes.addButton}
            >
                <AddIcon />
            </Button>
        </Tooltip>
    );

    render() {
        const {classes, subjects, isLoading, errors} = this.props;
        const {subjectModalIsShowing, activeSubject} = this.state;

        return (
            <div className={classes.subjects}>
                <div className={classes.pageContainer}>
                    <Grid
                        container
                        direction="column"
                        spacing={16}
                    >
                        <DetailCard>
                            {this.renderSubjectsHead()}
                            {errors && this.renderErrors(errors)}
                            {isLoading && this.renderLoadingIndicator()}
                        </DetailCard>

                        {subjects && this.renderSubjects(subjects)}
                        {subjects && this.renderAddSubjectButton()}
                        {subjects &&
                        <SubjectModal
                            action={activeSubject ? "update" : "add"}
                            subject={activeSubject}
                            open={subjectModalIsShowing}
                            onClose={() => this.toggleSubjectModal(false)}
                        />
                        }
                    </Grid>
                </div>
            </div>
        );
    }
}