import React from 'react'
import './App.css'
import Toolbox from "./Components/Shared/toolbox"
import {IconButton} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
library.add(
    faUser,
    faDatabase
);

const App = (props)=>{
    const [state, setState] = React.useState({
        is_drawer_open: false
    })
    const toggleDrawer = () => {
        setState({ ...state, is_drawer_open: !state.is_drawer_open });
    }
    return (
        <React.Fragment>
            <IconButton aria-label="delete" onClick={toggleDrawer}>
                <MenuIcon />
            </IconButton>
            <Toolbox open={state.is_drawer_open} onClose={toggleDrawer} />
        </React.Fragment>
    )
}
export default App
