import mongoose, { Schema } from "mongoose";
import { EMPLOYMENTS } from "./enums/faculty.enums";


const ProposalTemplate = {
    submitted: {
        type: Date,
        required: true,
    },
};

const MutationProposalTemplate = {
    ...ProposalTemplate,
    mutationType: {
        type: String,
        enum : ["ADD", "UPDATE"],
        required: true,
    }
}

const OverviewProposal = {
    ...MutationProposalTemplate,
    sex: {
        type: String,
    },
    name: {
        first: String,
        last: String,
    },
    employment: {
        type: String,
        enum: EMPLOYMENTS,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
};

const ItemRemovalProposal = {
    ...ProposalTemplate,
    itemId: String,
};

const ProfileProposalSchema = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
    overviewProposals: {
        add: [OverviewProposal],
    },

});

export const ProfileProposal = mongoose.model("ProfileProposal", ProfileProposalSchema);