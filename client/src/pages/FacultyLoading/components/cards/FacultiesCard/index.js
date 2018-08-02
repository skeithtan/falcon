import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { FacultyListItem } from "../../FacultyListItem";
import { wrap } from "./wrapper";
import { EmptyState } from "../../../../../components/states/EmptyState";
import { FullPageLoadingIndicator } from "../../../../../components/FullPageLoadingIndicator";
import { ErrorState } from "../../../../../components/states/ErrorState";
import { AddFacultyModal } from "../../modals/AddFacultyModal";
import { TERM_STATUSES } from "../../../../../enums/class.enums";
import { EmptySearchResultsState } from "../../../../../components/states/EmptySearchResultsState";
import { categorizeFaculties } from "../../../../../utils/faculty_loading.util";

class BaseFacultiesCard extends Component {
    state = {
        addFacultyModalIsShowing: false,
        searchKeyword: "",
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.fetchData();
    }

    fetchData = () => {
        const {
            faculties: { isLoading, errors, faculties },
            fetchAllFaculties,
        } = this.props;

        if (!isLoading && !faculties && !errors) {
            fetchAllFaculties();
        }
    };

    toggleAddFacultyModal = shouldShow =>
        this.setState({
            addFacultyModalIsShowing: shouldShow,
        });

    onSearchInputChange = event =>
        this.setState({
            searchKeyword: event.target.value,
        });

    renderEmptyState = () => (
        <EmptyState
            bigMessage="No faculties found"
            smallMessage="When faculties are added, you can see them here"
            onAddButtonClick={() => this.toggleAddFacultyModal(true)}
            addButtonText="Add a faculty"
            showAddButton={this.canSchedule}
        />
    );

    renderLoading = () => (
        <Grid container style={{ height: "100%" }}>
            <FullPageLoadingIndicator size={100} />
        </Grid>
    );

    renderErrors = errors => (
        <ErrorState
            onRetryButtonClick={this.props.fetchAllFaculties}
            message="An error occurred while trying to fetch faculties."
            debug={errors[0]}
        />
    );

    get canSchedule() {
        const { termSchedule, user } = this.props;
        return (
            termSchedule.status === TERM_STATUSES.SCHEDULING.identifier &&
            user.permissions.MUTATE_TERM_SCHEDULES
        );
    }

    renderList = showingFaculties => (
        <List
            className={this.props.classes.facultyList}
            dense
            subheader={<li />}
        >
            {showingFaculties.map(([category, faculties]) => (
                <li
                    key={category}
                    className={this.props.classes.facultyListSection}
                >
                    <ul className={this.props.classes.facultyUl}>
                        <ListSubheader>{category}</ListSubheader>
                        {faculties.map(({ facultyResponse, faculty }) => (
                            <FacultyListItem
                                key={facultyResponse.faculty}
                                facultyResponse={facultyResponse}
                                faculty={faculty}
                                termSchedule={this.props.termSchedule}
                                activeClassSchedule={
                                    this.props.activeClassSchedule
                                }
                                canSchedule={this.canSchedule}
                            />
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );

    getFacultyFromId = _id => {
        const {
            faculties: { faculties },
        } = this.props;
        return faculties.find(faculty => faculty._id === _id);
    };

    mapResponseToFaculty = facultyResponse => ({
        facultyResponse: facultyResponse,
        faculty: this.getFacultyFromId(facultyResponse.faculty),
    });

    renderCardContent = () => {
        const {
            faculties: { faculties, isLoading, errors },
            termSchedule: { facultyPool },
        } = this.props;

        if (isLoading) {
            return this.renderLoading();
        }

        if (errors) {
            return this.renderErrors(errors);
        }

        if (facultyPool.length === 0) {
            return this.renderEmptyState();
        }

        if (!faculties) {
            return null;
        }

        const showingFaculties = this.getShowingFaculties();

        // If facultyPool is not empty but showingFaculties is then the filter found nothing with searchKeyword
        if (Object.keys(showingFaculties).length === 0) {
            return (
                <EmptySearchResultsState
                    searchKeyword={this.state.searchKeyword}
                />
            );
        }

        return this.renderList(showingFaculties);
    };

    getSearchResults = () => {
        const {
            termSchedule: { facultyPool },
        } = this.props;

        const mappedPool = facultyPool.map(this.mapResponseToFaculty);

        if (!this.isSearching) {
            return mappedPool;
        }

        const searchKeyword = this.state.searchKeyword.toLowerCase();

        return mappedPool.filter(({ faculty }) => {
            const fullName = `${faculty.user.name.first} ${
                faculty.user.name.last
            }`.toLowerCase();
            const idNumber = `T-${faculty.idNumber}`.toLowerCase();
            return (
                fullName.includes(searchKeyword) ||
                idNumber.includes(searchKeyword)
            );
        });
    };

    getShowingFaculties = () => {
        const {
            termSchedule: { status, classes },
        } = this.props;
        const searchResults = this.getSearchResults();
        return categorizeFaculties(searchResults, status, classes);
    };

    get isSearching() {
        return this.state.searchKeyword.trim().length > 0;
    }

    renderToolbar = () => {
        const {
            classes,
            faculties: { faculties },
            termSchedule,
            activeClassSchedule,
        } = this.props;
        const { addFacultyModalIsShowing } = this.state;

        const compatibleFacultiesView = activeClassSchedule !== null;

        const shouldShowAddFacultiesButton =
            faculties !== null &&
            termSchedule.status === TERM_STATUSES.INITIALIZING.identifier;

        let toolbarClasses = [classes.toolbar];

        if (compatibleFacultiesView) {
            toolbarClasses.push("compatibleFacultiesView");
        }

        return (
            <Toolbar className={toolbarClasses.join(" ")}>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Typography variant="title" color="inherit">
                            {compatibleFacultiesView
                                ? "Compatible Faculty"
                                : "Faculty Members"}
                        </Typography>
                    </Grid>
                    {!compatibleFacultiesView && (
                        <Grid item>
                            {shouldShowAddFacultiesButton && (
                                <Tooltip
                                    disableFocusListener
                                    title="Add faculty to term schedule"
                                >
                                    <IconButton
                                        color="primary"
                                        onClick={() =>
                                            this.toggleAddFacultyModal(true)
                                        }
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Grid>
                    )}
                </Grid>
                {faculties !== null && (
                    <AddFacultyModal
                        action="update"
                        open={addFacultyModalIsShowing}
                        onClose={() => this.toggleAddFacultyModal(false)}
                        allFaculties={faculties}
                        termSchedule={termSchedule}
                    />
                )}
            </Toolbar>
        );
    };

    renderSearch = () => {
        const { classes } = this.props;
        const { searchKeyword } = this.state;

        return (
            <div className={classes.searchContainer}>
                <Input
                    className={classes.searchInput}
                    fullWidth
                    disableUnderline
                    type="search"
                    value={searchKeyword}
                    onChange={this.onSearchInputChange}
                    startAdornment={
                        <InputAdornment
                            position="start"
                            className={classes.searchAdornment}
                        >
                            <SearchIcon />
                        </InputAdornment>
                    }
                    placeholder="Search faculties"
                />
            </div>
        );
    };

    render() {
        const {
            classes,
            faculties: { faculties },
            termSchedule: { facultyPool },
        } = this.props;

        const shouldShowSearchBar =
            faculties !== null &&
            facultyPool.length > 0;
        return (
            <Card className={classes.facultiesCardContainer}>
                <Grid
                    className={classes.facultiesCardContainer}
                    container
                    direction="column"
                    wrap="nowrap"
                >
                    <Grid item>{this.renderToolbar()}</Grid>
                    {shouldShowSearchBar && (
                        <Grid item>
                            {this.renderSearch()}
                            <Divider />
                        </Grid>
                    )}
                    <Grid item xs className={classes.facultiesListContainer}>
                        {this.renderCardContent()}
                    </Grid>
                </Grid>
            </Card>
        );
    }
}
export const FacultiesCard = wrap(BaseFacultiesCard);
