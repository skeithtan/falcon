import Card from "@material-ui/core/Card";
import React, { Component } from "react";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { TableToolbar } from "../../../../../components/TableToolbar";
import { FacultyChips } from "../../FacultyChips";
import { ExpertFacultiesModal } from "../../modals/ExpertFacultiesModal";
import { wrap } from "./wrapper";


class BaseFacultyCard extends Component {
    state = {
        expertFacultiesModalIsShowing: false,
    };

    componentDidMount() {
        const {faculties, isLoading, fetchData} = this.props;
        if (!faculties && !isLoading) {
            fetchData();
        }
    }

    renderLoadingIndicator = () => (
        <FullPageLoadingIndicator size={100} />
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchData}
            message="An error occurred while trying to fetch faculties"
            debug={errors[0]}
        />
    );

    toggleExpertFacultiesModal = shouldShow => this.setState({
        expertFacultiesModalIsShowing: shouldShow,
    });

    onAddButtonClick = () => {
        if (this.props.faculties) {
            this.toggleExpertFacultiesModal(true);
        }
    };

    renderEmptyState = () => (
        <EmptyState
            bigMessage={`This subject does not have expert faculties`}
            smallMessage="Faculties that can teach this subject will be shown here"
            onAddButtonClick={this.onAddButtonClick}
            addButtonText="Add an expert faculty"
            showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
        />
    );

    renderBody = subject => subject.faculties.length === 0 ?
        this.renderEmptyState() :
        <FacultyChips subject={subject} faculties={this.props.faculties} user={this.props.user}/>;

    render() {
        const {isLoading, errors, subject, faculties} = this.props;
        const {expertFacultiesModalIsShowing} = this.state;

        return (
            <Card>
                <TableToolbar
                    tableTitle="Expert Faculties"
                    addButtonTooltipTitle="Add an expert faculty"
                    onAddButtonClick={this.onAddButtonClick}
                    showAddButton={this.props.user.permissions.MUTATE_FACULTY_PROFILES}
                />

                {faculties && this.renderBody(subject)}
                {errors && this.renderErrors(errors)}
                {isLoading && this.renderLoadingIndicator()}

                {faculties &&
                <ExpertFacultiesModal
                    action="update"
                    open={expertFacultiesModalIsShowing}
                    onClose={() => this.toggleExpertFacultiesModal(false)}
                    allFaculties={faculties}
                    subject={subject}
                />
                }
            </Card>
        );
    }
}

export const FacultyCard = wrap(BaseFacultyCard);