import React from 'react'
import './App.css'
import Draggable from 'react-draggable';
import {PathLine} from 'react-svg-pathline'
import {Resizable, ResizableBox} from 'react-resizable';
import 'react-resizable/css/styles.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes:[
                { id:'n1', 'name': 'some name', x: 0, y: 0, drag_disabled: false },
                { id:'n2', 'name': 'some name', x: 100, y: 200, drag_disabled: false },
            ],
            isConnecting: false,
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        }
    }

    componentDidMount() {
        document.addEventListener("mouseup", (e) => {
            this.setState({disabled: false, isConnecting: false})
        }, false);
        document.addEventListener("mousemove", (e) => {
            if (this.state.isConnecting) {
                this.setState({end: {x: e.clientX, y: e.clientY}})
            }
        }, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", (e) => {
            this.setState({disabled: false, isConnecting: false})
        }, false);
    }

    render() {
        console.log(this.state)
        return (
            <div className="container">
                {
                    this.state.nodes.map((item, index)=>{
                        return (
                            <>
                                <Draggable bounds="parent"
                                           onDrag={(e, data) => this.handleNodeDrag(e, data)}
                                           onStop={(e, data) => this.handleNodeDragStop(e, data)}

                                >
                                    <div id={item.id} className="node" style={{top:item.x, left: item.y}}>
                                        <div className="handle"/>
                                    </div>
                                </Draggable>
                            </>
                        )
                    })
                }
            </div>
        )
    }

    handleNodeDrag(e, data) {
    }
    handleNodeDragStop(e, data){
        console.log(e)
        this.updateNode(data.node.id, {x: e.target.offsetTop, y: e.target.offsetLeft});
    }
    updateNode(id, itemAttributes) {
        var index = this.state.nodes.findIndex(x=> x.id === id);
        if (index === -1){
            // handle error
        }
        else {
            this.setState({
                nodes: [
                    ...this.state.nodes.slice(0, index),
                    Object.assign({}, this.state.nodes[index], itemAttributes),
                    ...this.state.nodes.slice(index + 1)
                ]
            });
        }
        console.log(this.state)
    }

}

export default App;
