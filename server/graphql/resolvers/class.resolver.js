import { AcademicYear, Course, Subject } from "../../models/class.model";
import { limitAccess, NO_FACULTY } from "../../utils/user_decorator";


function subjects() {
    return Subject.find().populate("faculties");
}

function mutateSubject() {
    return {
        async create({newSubject}) {
            const subject = await Subject.create(newSubject);
            return subject
                .populate("faculties")
                .execPopulate();
        },

        async update({_id, newSubject}) {
            return Subject
                .findByIdAndUpdate(_id, newSubject, {new: true})
                .populate("faculties");
        },
    };
}

function mutateCourse() {
    return {
        async create({newCourse}) {
            return Course.create(newCourse);
        },

        async update({_id, newCourse}) {
            return Course.findByIdAndUpdate(_id, newCourse, {new: true});
        },
    };
}

function mutateAcademicYear() {
    return {
        async create({startYear}) {
            return AcademicYear.create({startYear: startYear});
        },
        async setTermClasses({academicYearId, term, classes}) {
            // TODO
        },
    };
}

async function mutateClass(object, {academicYearId, term}) {
    const academicYear = await AcademicYear.findById(academicYearId);

    function termClasses() {
        // term is uppercase, because it's a YearTerm enum in class.type.graphql
        return academicYear.termsClasses[term.toLowerCase()];
    }

    return {
        async create({newClass}) {
            termClasses().append(newClass);
            await academicYear.save();

            // Re-fetch termClasses
            const termClasses = termClasses();
            return termClasses[termClasses.length - 1];
        },

        async remove({classId}) {
            termClasses().id(classId).remove();
            await academicYear.save();
            return true;
        },
    };
}

function academicYears() {
    const makePopulateObject = term => {
        return {
            path: `termsClasses.${term}.subject`,
            model: "Subject",
        };
    };
    return AcademicYear.find({})
                       .populate(makePopulateObject("first"))
                       .populate(makePopulateObject("second"))
                       .populate(makePopulateObject("third"))
                       .exec();
}

export const queryResolvers = {
    subjects: limitAccess(subjects, {allowed: NO_FACULTY, action: "Get all subjects"}),
    academicYears: limitAccess(academicYears, {allowed: NO_FACULTY, action: "Get all terms"}),
};

export const mutationResolvers = {
    subject: limitAccess(mutateSubject, {allowed: NO_FACULTY, action: "Mutate subject"}),
    academicYear: limitAccess(mutateAcademicYear, {allowed: NO_FACULTY, action: "Mutate academic year"}),
    course: limitAccess(mutateCourse, {allowed: NO_FACULTY, action: "Mutate course"}),
    class: limitAccess(mutateClass, {allowed: NO_FACULTY, action: "Mutate class"}),
};
