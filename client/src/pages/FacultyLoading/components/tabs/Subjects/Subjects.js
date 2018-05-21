import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import FullPageLoadingIndicator from "../../../../../components/FullPageLoadingIndicator";
import EmptyState from "../../../../../components/states/EmptyState";
import ErrorState from "../../../../../components/states/ErrorState";
import SubjectRow from "./components/SubjectRow/SubjectRow";


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

    onAddSubjectClick = () => this.setState({
        activeSubject: null,
        subjectModalIsShowing: true,
    });

    renderEmptyState = () => (
        <EmptyState bigMessage="There are no subjects found"
                    smallMessage="Subjects added will be shown here"
                    onAddButtonClick={this.onAddButtonClick}
                    addButtonText="Add a subject" />
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

    render() {
        const {classes, subjects, isLoading, errors} = this.props;
        return (
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
                </Grid>
            </div>
        );
    }
}