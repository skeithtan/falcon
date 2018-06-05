import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const MonthPicker = props => (
    <Select {...props}>
        {months.map((month, index) =>
            <MenuItem key={index} value={index + 1}>{month}</MenuItem>,
        )}
    </Select>
);
