import mongoose, { Schema } from "mongoose";
import {
    FACULTY_FEEDBACK,
    MEETING_DAYS,
    MEETING_HOURS,
    SUBJECT_CATEGORIES,
    TERM_STATUSES,
    TERMS,
} from "./enums/class.enums";


const SubjectSchema = new Schema({
    code: {
        type: String, 
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: "Faculty",
    }],
    category: {
        type: String,
        enum: SUBJECT_CATEGORIES,
        required: true,
    },
});

const ClassSchema = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    meetingDays: {
        type: String,
        enum: MEETING_DAYS,
        required: true,
    },
    meetingHours: {
        type: String,
        enum: MEETING_HOURS,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    enrollmentCap: {
        type: Number,
        required: true,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: false,
    },
    course: {
        type: String,
        required: true
    },
});

const DayAvailability = {
    "7-9": Boolean,
    "9-11": Boolean,
    "11-1": Boolean,
    "1-3": Boolean,
    "3-5": Boolean,
};

const FacultyResponseSchema = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
    availability: {
        "M_TH": DayAvailability,
        "T_F": DayAvailability,
    },
    feedback: {
        status: {
            type: String,
            enum: FACULTY_FEEDBACK,
        },
        rejectionReason: {
            type: String,
            required: function () {
                return this.feedback.status === "REJECTED";
            },
        },
    },
});

const TermScheduleSchema = new Schema({
    startYear: {
        type: Number,
        required: true,
        unique: true,
    },
    term: {
        type: String,
        required: true,
        enum: TERMS,
    },
    facultyPool: [FacultyResponseSchema],
    classes: [ClassSchema],
    status: {
        type: String,
        required: true,
        enum: TERM_STATUSES,
    },
});

const Subject = mongoose.model("Subject", SubjectSchema);
const TermSchedule = mongoose.model("TermSchedule", TermScheduleSchema);
export { Subject, TermSchedule };

