import React from "react";
import Drawflow from 'drawflow'
import toolbox from "./Components/Shared/toolbox";
import  'drawflow/dist/drawflow.min.css'
import './App.css'
class DrawFlow extends React.Component{

    constructor(props) {
        super(props);
        this.drawflow = React.createRef();
    }
    componentDidMount() {
        const editor = new Drawflow(this.drawflow.current);
        editor.start();

        let html = `
        <div><input type="text" df-name></div>
        `;
        let data = { "name": '' };

        editor.addNode('github', 0, 3, 150, 300, 'github', data, null);
        editor.addNode('another', 3, 3, 150, 300, 'another', data, null);
        editor.addNode('another', 3, 3, 150, 300, 'another', data, null);
    }

    render() {
        return(
            <>
                <toolbox></toolbox>
                <div ref={this.drawflow} className='drawflow-container'></div>
            </>
        )
    }
}
export default DrawFlow