import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
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
    return (
        <React.Fragment>
            <Drawer open={state.open} onClose={props.onClose}>
                <h1>hello</h1>
            </Drawer>
        </React.Fragment>
    )
}