import { Subject } from "../models/class.model";
import { Faculty } from "../models/faculty.model";


export function addSubjectToFaculties(subject, facultiesId) {
    facultiesId
    // Convert faculty ID to faculty query promise
        .map(facultyId => Faculty.findById(facultyId).exec())
        // Resolve promise and push subject ID to teachingSubjects
        .forEach(query => query.then(faculty => {
            console.log(`Adding ${subject.name} to ${faculty._id}`);
            faculty.teachingSubjects.push(subject._id);
            faculty.save();
        }));
}

export function removeSubjectFromFaculties(subject, facultiesId) {
    facultiesId
        .map(facultyId => Faculty.findById(facultyId).exec())
        .forEach(query => query.then(faculty => {
            faculty.teachingSubjects.pull(subject._id);
            faculty.save();
        }));
}

export function addFacultyToSubjects(faculty, subjectsId) {
    subjectsId
        .map(subjectId => Subject.findById(subjectId).exec())
        .forEach(query => query.then(subject => {
            subject.faculties.push(faculty._id);
            subject.save();
        }));
}

export function removeFacultyFromSubjects(faculty, subjectsId) {
    subjectsId
        .map(subjectId => Subject.findById(subjectId).exec())
        .forEach(query => query.then(subject => {
            subject.faculties.pull(faculty._id);
            subject.save();
        }));
}

