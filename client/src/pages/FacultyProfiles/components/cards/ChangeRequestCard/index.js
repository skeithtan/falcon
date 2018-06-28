import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AcceptIcon from "@material-ui/icons/Check";
import RejectIcon from "@material-ui/icons/Close";
import moment from "moment";
import React, { Component } from "react";
import { UserAvatar } from "../../../../../components/UserAvatar";
import { SUBDOCUMENT_TYPE } from "../../../../../enums/faculty.enums";
import { getFullName, getObjectForUserType } from "../../../../../utils/user.util";
import {
    DegreeFields,
    ExtensionWorkFields,
    InstructionalMaterialFields,
    PresentationFields,
    RecognitionFields,
} from "./body_components";


const ChangeRequestTopBar = ({faculty, changeRequest}) => {
    const submitted = moment(changeRequest.submitted).fromNow();
    const subdocumentType = SUBDOCUMENT_TYPE[changeRequest.subdocumentType].name;
    return (
        <Toolbar>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <Grid container direction="row" alignItems="center" spacing={16}>
                        <Grid item>
                            <UserAvatar user={faculty.user} />
                        </Grid>
                        <Grid item>
                            <Typography>
                                <strong>{getFullName(faculty.user)}</strong> wants to add
                                this <strong>{subdocumentType}</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography color="textSecondary">
                        {submitted}
                    </Typography>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

const ChangeRequestBody = ({changeRequest}) => {
    switch (changeRequest.subdocumentType) {
        case "Degree":
            return <DegreeFields changeRequest={changeRequest} />;
        case "Recognition":
            return <RecognitionFields changeRequest={changeRequest} />;
        case "Presentation":
            return <PresentationFields changeRequest={changeRequest} />;
        case "InstructionalMaterial":
            return <InstructionalMaterialFields changeRequest={changeRequest} />;
        case "ExtensionWork":
            return <ExtensionWorkFields changeRequest={changeRequest} />;
        default:
            throw new Error(`Attempted to render change request body for unknown subdocument type ${changeRequest.subdocumentType}`);
    }
};

class ChangeRequestReviewActions extends Component {
    state = {
        isSubmitting: false,
        error: null,
    };

    submitAction = action => {
        this.setState({
            isSubmitting: true,
        });

        action().catch(error => {
            this.setState({
                isSubmitting: false,
                error: error.message,
            });
            console.log("An error occurred while reviewing change request", error);
        });
    };

    approveChangeRequest = () => {
        const {approveChangeRequest} = this.props;
        this.submitAction(approveChangeRequest);
    };

    rejectChangeRequest = () => {
        const {rejectChangeRequest} = this.props;
        this.submitAction(rejectChangeRequest);
    };

    renderButtons = () => (
        <Grid container spacing={32} justify="flex-end">
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.rejectChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            Reject
                        </Grid>
                        <Grid item>
                            <RejectIcon />
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="flat"
                    size="small"
                    color="primary"
                    disabled={this.state.isSubmitting}
                    onClick={this.approveChangeRequest}
                >
                    <Grid container spacing={8} alignItems="center">
                        <Grid item>
                            Accept
                        </Grid>
                        <Grid item>
                            <AcceptIcon />
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        </Grid>
    );

    render() {
        const {isSubmitting, error} = this.state;

        return (
            <Toolbar>
                <Grid container alignItems="center" justify="space-between">

                    <Grid item>
                        <Grid container spacing={8} alignItems="center">
                            {isSubmitting &&
                            <Grid item>
                                <CircularProgress size={24} />
                            </Grid>
                            }

                            {isSubmitting &&
                            <Grid item>
                                <Typography color="primary">
                                    Submitting...
                                </Typography>
                            </Grid>
                            }

                            {error &&
                            <Grid item>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                            }
                        </Grid>
                    </Grid>

                    <Grid item>
                        {this.renderButtons()}
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}

const ChangeRequestCardFooter = ({user, approveChangeRequest, rejectChangeRequest}) => {
    const administrativeActions = (
        <ChangeRequestReviewActions
            approveChangeRequest={approveChangeRequest}
            rejectChangeRequest={rejectChangeRequest}
        />
    );
    return getObjectForUserType(user, {
        CLERK: administrativeActions,
        DEAN: administrativeActions,
        ASSOCIATE_DEAN: administrativeActions,
        FACULTY: null, // TODO
    });
};

export const ChangeRequestCard = ({
    user,
    faculty,
    changeRequest,
    approveChangeRequest,
    rejectChangeRequest,
}) => (
    <Card>
        <ChangeRequestTopBar faculty={faculty} changeRequest={changeRequest} />
        <Divider />
        <ChangeRequestBody changeRequest={changeRequest} />

        <ChangeRequestCardFooter
            user={user}
            approveChangeRequest={approveChangeRequest}
            rejectChangeRequest={rejectChangeRequest}
        />
    </Card>
);