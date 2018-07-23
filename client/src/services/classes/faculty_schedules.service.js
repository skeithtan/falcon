import { client } from "../../client";
import gql from "graphql-tag";
import { fields as classScheduleFields } from "./classes.service";

const fields = `
    _id
    startYear
    term
    status
    involved
    feedback {
        submitted
        status
        rejectionReason
    }
    availability {
        M_TH
        T_F
    }
    classes {
        ${classScheduleFields}
    }
`;

export const fetchAllMySchedules = () =>
    client.query({
        query: gql`
    query {
        mySchedules {
            current {
                ${fields}
            }
            archived {
                ${fields}
            }
        }
    }
    `,
    });

export const setFacultyAvailability = availability =>
    client.mutate({
        mutation: gql`
            mutation($availability: AvailabilityInput!) {
                setFacultyAvailability(availability: $availability)
            }
        `,
        variables: {
            availability,
        },
    });

export const setFacultyFeedback = (status, rejectionReason, newAvailability) =>
    client.mutate({
        mutation: gql`
            mutation(
                $status: FacultyFeedbackStatus!
                $rejectionReason: String
                $newAvailability: AvailabilityInput
            ) {
                setFacultyFeedback(
                    status: $status
                    rejectionReason: $rejectionReason
                    newAvailability: $newAvailability
                ) {
                    submitted
                    status
                    rejectionReason
                }
            }
        `,
        variables: {
            status,
            rejectionReason,
            newAvailability,
        },
    });
