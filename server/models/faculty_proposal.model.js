import mongoose, { Schema } from "mongoose";

const ProposalTemplate = {
    submitted: {
        type: Date,
        required: true,
    }
};

const OverviewProposal = {
    ...ProposalTemplate,
    sex: {
        type: String,
        
    }
};

const ProfileProposalSchema = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    overviewProposals: [OverviewProposal],

});

export const ProfileProposal = mongoose.model("ProfileProposal", ProposalSchema);