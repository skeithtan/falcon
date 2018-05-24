import mongoose, { Schema } from "mongoose";
import { Faculty } from "./faculty.model";


const CourseSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const SubjectSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        ref: "Faculty",
    }],
});

const ClassSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
});

const TermClasses = new Schema({
    _id: false,
    facultyPool: [{
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    }],
    classes: [ClassSchema],
});

const AcademicYearSchema = new Schema({
    startYear: {
        type: Number,
        required: true,
        unique: true,
    },
    termsClasses: {
        first: [TermClasses],
        second: [TermClasses],
        third: [TermClasses],
    },
});

const Subject = mongoose.model("Subject", SubjectSchema);
const Course = mongoose.model("Course", CourseSchema);
const AcademicYear = mongoose.model("AcademicYear", AcademicYearSchema);
export { Subject, Course, AcademicYear };

