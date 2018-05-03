import mongoose, { Schema } from "mongoose";


const SubjectSchema = new Schema({
    code: String,
    name: String,
    major: String,
});

const Schedule = {
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    meetingDays: {
        type: String,
        enum: ["M_TH", "T_F"],
        required: true,
    },
    meetingHours: {
        type: String,
        enum: ["7-9", "9-11", "11-1", "1-3", "3-5"],
        required: true,
    },
    room: String,
    enrollment: Number, //FIXME: Replace with more descriptive name upon clarification
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
    },
};

const TermSchema = new Schema({
    term: {
        type: String,
        enum: ["1", "2", "3"],
        required: true,
    },
    yearStart: Number,
    schedules: [Schedule]
});


const Subject = mongoose.model("Subject", SubjectSchema);
const Term = mongoose.model("Term", TermSchema);

export { Subject, Term };