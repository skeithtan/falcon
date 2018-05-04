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
    enrollmentCap: Number,
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: false,
    },
};

const AcademicYearSchema = new Schema({
    startYear: {
        type: Number,
        required: true,
        unique: true,
    },
    terms: {
        _id: false, // No ID for this sub object
        _1: [Schedule],
        _2: [Schedule],
        _3: [Schedule],
    },
});

const Subject = mongoose.model("Subject", SubjectSchema);
const AcademicYear = mongoose.model("AcademicYear", AcademicYearSchema);

export { Subject, AcademicYear };