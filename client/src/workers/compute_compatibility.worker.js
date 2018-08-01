import { toWorkerScript } from "../utils/worker.util";

const computeCompatibility = () => {
    // eslint-disable-next-line
    self.onmessage = function({
        data: { faculty, classSchedule, availability, termSchedule },
    }) {
        const assignedClasses = termSchedule.classes.filter(
            item => item.faculty === faculty._id
        );

        // Placed here because web workers can't import from our other modules
        const MEETING_HOURS = {
            "7-9": {
                identifier: "7-9",
                name: "7 AM - 9 AM",
            },
            "9-11": {
                identifier: "9-11",
                name: "9 AM - 11 AM",
            },
            "11-1": {
                identifier: "11-1",
                name: "11 AM - 1 PM",
            },
            "1-3": {
                identifier: "1-3",
                name: "1 PM - 3 PM",
            },
            "3-5": {
                identifier: "3-5",
                name: "3 PM - 5  PM",
            },
            "5-7": {
                identifier: "5-7",
                name: "5 PM - 7 PM",
            },
        };

        const getTwoMeetingHoursBefore = meetingHours => {
            const allMeetingHours = Object.values(MEETING_HOURS).map(
                item => item.identifier
            );
            const candidateIndex = allMeetingHours.indexOf(meetingHours);

            // Ensure this is at least the third or above, else null
            if (candidateIndex < 2) {
                return null;
            }

            return [
                allMeetingHours[candidateIndex - 1],
                allMeetingHours[candidateIndex - 2],
            ];
        };

        const compatibility = [
            {
                criteria: "Faculty-subject compatibility",
                get isCompatible() {
                    return faculty.teachingSubjects.includes(
                        classSchedule.subject
                    );
                },
                get message() {
                    return this.isCompatible
                        ? "This subject is within this faculty's expertise"
                        : "This subject is not within this faculty's expertise";
                },
            },
            {
                criteria: "Faculty time availability",
                get isCompatible() {
                    if (!availability) {
                        return null;
                    }

                    return availability[classSchedule.meetingDays].includes(
                        classSchedule.meetingHours
                    );
                },
                get message() {
                    if (this.isCompatible) {
                        return "This faculty is available at this time";
                    } else if (this.isCompatible === null) {
                        return "This faculty has not submitted their time availability";
                    } else {
                        return "This faculty is not available during these hours";
                    }
                },
            },
            {
                criteria: "Third consecutive class",
                get isCompatible() {
                    const { meetingHours, meetingDays } = classSchedule;
                    // The first two meeting hours means it is never the third consecutive
                    if (meetingHours === "7-9" || meetingHours === "9-11") {
                        return true;
                    }

                    const assignedHoursForDay = assignedClasses
                        // Get only classes from the day itself
                        .filter(item => item.meetingDays === meetingDays)
                        // Get only the meeting hours of these classes
                        .map(item => item.meetingHours);

                    // TODO: Look forward
                    const twoMeetingHoursBefore = getTwoMeetingHoursBefore(
                        meetingHours
                    );

                    return !twoMeetingHoursBefore.every(hours =>
                        assignedHoursForDay.includes(hours)
                    );
                },
                get message() {
                    return this.isCompatible
                        ? "This class is not the third consecutive"
                        : "This class is the third consecutive class";
                },
            },
            {
                criteria: "Class time conflict",
                get isCompatible() {
                    const { meetingDays, meetingHours } = classSchedule;

                    return (
                        assignedClasses
                            // Get only assigned classes from that day
                            .filter(item => item.meetingDays === meetingDays)
                            // Remove candidate from list
                            .filter(item => item._id !== classSchedule._id)
                            // Ensure it's unique
                            .every(item => item.meetingHours !== meetingHours)
                    );
                },
                get message() {
                    return this.isCompatible
                        ? "This class does not conflict with other classes"
                        : "This faculty has another class within these hours";
                },
            },
        ];

        // eslint-disable-next-line
        self.postMessage({
            compatibility,
            isCompatible: compatibility.every(
                criteria =>
                    // Consider unknown (null) criterias as compatible
                    criteria.isCompatible || criteria.isCompatible === null
            ),
        });
    };
};

export const computeCompatibilityWorker = toWorkerScript(computeCompatibility);
