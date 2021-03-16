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
                                        <div className="handle"
                                             onMouseDown={(e) => this.handleMouseDownOnHandle(e)}
                                        />
                                    </div>
                                </Draggable>
                            </>
                        )
                    })
                }
                <svg className='drawing_container'>
                    <PathLine
                        points={[{x: this.state.start.x, y: this.state.start.y}, {
                            x: this.state.end.x,
                            y: this.state.end.y
                        }]}
                        stroke="red"
                        strokeWidth="3"
                        fill="none"
                        r={10}
                    />
                </svg>
            </div>
        )
    }

    handleNodeDrag(e, data) {
    }
    handleNodeDragStop(e, data){
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
    }
    handleMouseDownOnHandle(e){
        e.stopPropagation()
        let rect = e.target.getBoundingClientRect()
        this.setState({
            isConnecting: true,
            start: {x: rect.left + 10, y: rect.top + 10},
            end: {x: rect.left + 10, y: rect.top + 10}
        })
    }
}

export default App;
