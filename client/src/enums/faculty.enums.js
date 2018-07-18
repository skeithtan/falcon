export const EMPLOYMENT = {
    REGULAR: {
        identifier: "REGULAR",
        name: "Regular",
        load: {
            min: 3,
            max: 5,
        },
    },
    PROFESSOR: {
        identifier: "REGULAR",
        name: "Professor",
        load: {
            min: 1,
            max: 2,
        },
    },
    ADMINISTRATOR: {
        identifier: "REGULAR",
        name: "Administrator",
        load: {
            min: 1,
            max: 1,
        },
    },
    PART_TIME: {
        identifier: "PART_TIME",
        name: "Part Time",
        load: {
            min: 1,
            max: 4,
        },
    },
    ADJUNCT: {
        identifier: "ADJUNCT",
        name: "Adjunct",
        load: {
            min: 1,
            max: 2,
        },
    },
    ON_LEAVE: {
        identifier: "ON_LEAVE",
        name: "On leave",
        load: {
            min: 0,
            max: 0,
        },
    },
    TERMINATED: {
        identifier: "TERMINATED",
        name: "Terminated",
        load: {
            min: 0,
            max: 0,
        },
    },
};

export const SEX = {
    M: {
        identifier: "M",
        name: "Male",
    },
    F: {
        identifier: "F",
        name: "Female",
    },
};

export const DEGREE = {
    LEVEL: {
        ASSOCIATE: {
            identifier: "ASSOCIATE",
            name: "Associate",
        },
        BACHELOR: {
            identifier: "BACHELOR",
            name: "Bachelor",
        },
        MASTER: {
            identifier: "MASTER",
            name: "Master",
        },
        DOCTORATE: {
            identifier: "DOCTORATE",
            name: "Doctorate",
        },
    },
};

export const EXTENSION_WORK = {
    ROLES: {
        LECTURER: {
            identifier: "LECTURER",
            name: "Lecturer",
        },
        TRAINER: {
            identifier: "TRAINER",
            name: "Trainer",
        },
        RESOURCE_SPEAKER: {
            identifier: "RESOURCE_SPEAKER",
            name: "Resource Speaker",
        },
        FACILITATOR: {
            identifier: "FACILITATOR",
            name: "Facilitator",
        },
        COACH: {
            identifier: "COACH",
            name: "Coach",
        },
        MATERIAL_WRITER: {
            identifier: "MATERIAL_WRITER",
            name: "Material Writer",
        },
    },
};

export const INSTRUCTIONAL_MATERIAL = {
    MEDIUM: {
        PRINT: {
            identifier: "PRINT",
            name: "Print",
        },
        MODULE: {
            identifier: "MODULE",
            name: "Module",
        },
        VIDEO: {
            identifier: "VIDEO",
            name: "Video",
        },
        SLIDE: {
            identifier: "SLIDE",
            name: "Slide",
        },
        DIGITAL_FILE: {
            identifier: "DIGITAL_FILE",
            name: "Digital File",
        },
        AUDIO: {
            identifier: "AUDIO",
            name: "Audio",
        },
    },
    AUDIENCE: {
        STUDENT: {
            identifier: "STUDENT",
            name: "Student",
        },
        TEACHER: {
            identifier: "TEACHER",
            name: "Teacher",
        },
    },
};

export const RECOGNITION = {
    BASIS: {
        RESEARCH: {
            identifier: "RESEARCH",
            name: "Research",
        },
        SCHOLARSHIP: {
            identifier: "SCHOLARSHIP",
            name: "Scholarship",
        },
        EXTENSION_WORK: {
            identifier: "EXTENSION_WORK",
            name: "Extension Work",
        },
        INSTRUCTION: {
            identifier: "INSTRUCTION",
            name: "Instruction",
        },
    },
};

export const PRESENTATION = {
    CATEGORY: {
        INSTITUTIONAL: {
            identifier: "INSTITUTIONAL",
            name: "Institutional",
        },
        REGIONAL: {
            identifier: "REGIONAL",
            name: "Regional",
        },
        NATIONAL: {
            identifier: "NATIONAL",
            name: "National",
        },
        INTERNATIONAL: {
            identifier: "INTERNATIONAL",
            name: "International",
        },
    },
    MEDIUM: {
        PAPER: {
            identifier: "PAPER",
            name: "Paper",
        },
        POSTER: {
            identifier: "POSTER",
            name: "Poster",
        },
        RESEARCH: {
            identifier: "RESEARCH",
            name: "Research",
        },
    },
};

export const SUBDOCUMENT_TYPE = {
    Degree: {
        name: "Degree",
        facultyKey: "degrees",
    },
    Recognition: {
        name: "Recognition",
        facultyKey: "recognitions",
    },
    Presentation: {
        name: "Presentation",
        facultyKey: "presentations",
    },
    InstructionalMaterial: {
        name: "Instructional Material",
        facultyKey: "instructionalMaterials",
    },
    ExtensionWork: {
        name: "Extension Work",
        facultyKey: "extensionWorks",
    },
};

export const FACULTY_ENUMS = {
    EMPLOYMENT,
    SEX,
    DEGREE,
    EXTENSION_WORK,
    INSTRUCTIONAL_MATERIAL,
    RECOGNITION,
    PRESENTATION,
};
