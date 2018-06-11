import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";


export const SubjectsHeader = ({classes, searchKeyword, onSearchInputChange}) => (
    <div className={`${classes.subjectsHeader} ${classes.split}`}>
        <div className={classes.searchWrapper}>

            <Paper className={classes.searchPaper}>
                <Input className={classes.searchInput}
                       fullWidth
                       type="search"
                       value={searchKeyword}
                       onChange={event => onSearchInputChange(event.target.value)}
                       startAdornment={
                           <InputAdornment position="start" className={classes.searchAdornment}>
                               <SearchIcon />
                           </InputAdornment>
                       }
                       placeholder="Search subjects" />
            </Paper>
        </div>
    </div>
);