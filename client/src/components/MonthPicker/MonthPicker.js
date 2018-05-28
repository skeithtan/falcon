import React, {Component} from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

export class MonthPicker extends Component {
    render() {
        return (
            <Select {...this.props}>
                {/*<MenuItem value="">*/}
                    {/*<em>Select a month</em>*/}
                {/*</MenuItem>*/}

                {months.map((month, index) =>
                    <MenuItem key={index} value={index + 1}>{month}</MenuItem>
                )}
            </Select>
        )
    }
}