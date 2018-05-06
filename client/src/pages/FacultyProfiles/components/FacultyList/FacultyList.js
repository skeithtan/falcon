import React, { Component } from "react";
import ListSubheader from "material-ui/List/ListSubheader";
import List, { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import AddIcon from '@material-ui/icons/Add';

export default class FacultyList extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.facultyList}>
                <List subheader={<li />}>
                    <li className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>Full Time Permanent</ListSubheader>
                            <ListItem button>
                                <Avatar>RM</Avatar>
                                <ListItemText>Reeve Musk</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>PN</Avatar>
                                <ListItemText>Patrick Ng</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>PM</Avatar>
                                <ListItemText>Peter Mendoza</ListItemText>
                            </ListItem>
                        </ul>
                    </li>
                    <li className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>Full Time Temporary</ListSubheader>
                            <ListItem button>
                                <Avatar>CA</Avatar>
                                <ListItemText>Claire Arguelles</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>SC</Avatar>
                                <ListItemText>Samuel Conanan</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>RD</Avatar>
                                <ListItemText>Ronald Deniega</ListItemText>
                            </ListItem>
                        </ul>
                    </li>
                    <li className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>Part Time</ListSubheader>
                            <ListItem button>
                                <Avatar>HO</Avatar>
                                <ListItemText>Hussein Obama</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>AP</Avatar>
                                <ListItemText>Aaron Presley</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>JM</Avatar>
                                <ListItemText>James McCartney</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>HG</Avatar>
                                <ListItemText>Henry Gates</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>PJ</Avatar>
                                <ListItemText>Paul Jobs</ListItemText>
                            </ListItem><ListItem button>
                            <Avatar>HO</Avatar>
                            <ListItemText>Hussein Obama</ListItemText>
                        </ListItem>
                            <ListItem button>
                                <Avatar>AP</Avatar>
                                <ListItemText>Aaron Presley</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>JM</Avatar>
                                <ListItemText>James McCartney</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>HG</Avatar>
                                <ListItemText>Henry Gates</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <Avatar>PJ</Avatar>
                                <ListItemText>Paul Jobs</ListItemText>
                            </ListItem>
                        </ul>
                    </li>
                </List>
                <Button variant="fab" color="primary" className={classes.addButton}>
                    <AddIcon/>
                </Button>
            </div>
        );
    }
}