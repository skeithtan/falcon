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
        status
        rejectionReason
    }
    availability {
        submitted
        M_TH
        T_F
    }
    classes {
        ${classScheduleFields}
    }
`;

export const fetchAllMySchedules = () => client.query({
    query: gql`
    query {
        mySchedule
    }
    `
})