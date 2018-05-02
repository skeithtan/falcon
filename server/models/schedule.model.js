import mongoose, { Schema } from "mongoose";

const SubjectSchema = new Schema({
    subjectCode: String,
    subjectName: String,
    major: String,
});

const Schedule = {
    subject: {
        type: ObjectId,
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
        type: ObjectId,
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
const Term = mongoose.Schema("Term", TermSchema);

export { Subject, Term };