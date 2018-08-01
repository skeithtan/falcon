import Grid from "@material-ui/core/Grid";
import React, { PureComponent } from "react";
import { FullPageLoadingIndicator } from "../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../components/states/ErrorState";
import { SubjectsDetail } from "./components/SubjectsDetail";
import { SubjectsHeader } from "./components/SubjectsHeader";
import { SubjectsList } from "./components/SubjectsList";
import { wrap } from "./wrapper";

class BaseSubjectsPage extends PureComponent {
    componentDidMount() {
        document.title = "Subjects - Falcon";

        const { subjects, isLoading, fetchData } = this.props;
        if (!subjects && !isLoading) {
            fetchData();
        }
    }

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchData}
            message="An error occurred while trying to fetch list of faculty."
            debug={errors[0]}
        />
    );

    render() {
        const {
            classes,
            match: {
                params: { subjectId },
            },
            isLoading,
            errors,
            subjects,
        } = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (!subjects) {
            return null;
        }

        return (
            <div className={classes.subjects}>
                <SubjectsHeader />
                <div className={`${classes.subjectsBody} ${classes.split}`}>
                    <SubjectsList subjectId={subjectId} />
                    <SubjectsDetail subjectId={subjectId} />
                </div>
            </div>
        );
    }
}

export const SubjectsPage = wrap(BaseSubjectsPage);
