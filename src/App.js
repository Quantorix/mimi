import React from 'react'
import './App.css'
import Toolbox from "./Components/Shared/toolbox";
import {Button} from "@material-ui/core";
const App = (props)=>{
    const [state, setState] = React.useState({
        is_drawer_open: false
    })
    const toggleDrawer = () => {
        setState({ ...state, is_drawer_open: !state.is_drawer_open });
    }
    return (
        <React.Fragment>
            <Button onClick={toggleDrawer}>Open</Button>
            <Toolbox open={state.is_drawer_open} onClose={toggleDrawer} />
        </React.Fragment>
    )
}
export default App
