import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from "clsx";
import menus from "../../constants/menus";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    menuIcon: {
        paddingRight: 10
    }
});

export default function Toolbox(props) {
    const classes = useStyles();
    const [state, setState] = useState({
        open: props.open
    })
    useEffect(() => {
        setState({...state, open:props.open});
    }, [props.open]);

    const closeDrawer = () => {
        setState({...state, open: false})
    }
    const menuList = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
        >
            <List>
                {
                   menus.map((item, index) => (
                        <ListItem button key={item.name}>
                            <FontAwesomeIcon className={clsx(classes.menuIcon)} icon={['fas', item.icon]} />
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))
                }
            </List>
        </div>
    )

    return (
        <React.Fragment>
            <Drawer open={state.open} onClose={props.onClose}>
                {menuList()}
            </Drawer>
        </React.Fragment>
    )
}