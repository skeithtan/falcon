import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { Component } from "react";
import FullPageLoadingIndicator from "../../../../../components/FullPageLoadingIndicator";
import ModalFormComponent from "../../../../../components/ModalFormComponent";
import ErrorState from "../../../../../components/states/ErrorState";


const initialForm = {
    subjects: [],
};

function mapFacultySubjectsToForm(facultySubjects) {
    return {
        subjects: [...facultySubjects],
    };
}

class SubjectsTable extends Component {
    renderRow = subject => {
        const {selectedSubjects, classes} = this.props;
        // Convert to ID array, then check if subject's ID is in that array
        const checked = selectedSubjects.map(item => item._id)
                                        .includes(subject._id);

        return (
            <TableRow key={subject._id} className={checked ? classes.activeItem : ""}>
                <TableCell>
                    <Checkbox
                        checked={checked}
                    />
                </TableCell>
                <TableCell>
                    {subject.code}
                </TableCell>
                <TableCell>
                    {subject.name}
                </TableCell>
            </TableRow>
        );
    };

    render() {
        const {classes, subjects, selectedSubjects} = this.props;
        console.log(selectedSubjects);

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="none">Assigned</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subjects.map(this.renderRow)}
                </TableBody>
            </Table>
        );
    }
}

export default class AssignSubjectModal extends ModalFormComponent {
    get initialForm() {
        return initialForm;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.subject.subjects) {
            return prevState;
        }

        return {
            ...prevState,
            form: mapFacultySubjectsToForm(nextProps.facultySubjects),
        };
    }

    get submitAddAction() {
        // TODO
    }

    get buttonName() {
        return "Assign subjects";
    }

    componentDidMount() {
        const {subject, fetchData} = this.props;

        if (!subject.subjects) {
            fetchData();
        }
    }

    renderLoading = () => (
        <FullPageLoadingIndicator size={100} />
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.fetchData}
            message="An error occurred while trying to fetch list of all subjects"
            debug={errors[0]}
        />
    );

    renderDialogContent = () => {
        const {form} = this.state;
        const {subjects} = form;
        const {subject, classes} = this.props;
        const allSubjects = subject.subjects;

        return (
            <div className={classes.form}>
                <SubjectsTable subjects={allSubjects} selectedSubjects={subjects} classes={classes}/>
            </div>
        );
    };

    render() {
        const {open, subject, classes} = this.props;

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>Assign Teaching Subjects</DialogTitle>
                <div>
                    {subject.loading && this.renderLoading()}
                    {subject.errors && this.renderErrors(subject.errors)}
                    {subject.subjects && this.renderDialogContent()}
                </div>
                {subject.subjects && this.renderModalFormDialogActions(false)}
            </Dialog>
        );
    }
}

