import React from 'react'
import './App.css'
import Draggable from 'react-draggable';
import {PathLine} from 'react-svg-pathline'
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      f1: {x: 0, y:0},
      f2: {x: 0, y:0},
      disabled: false,
      isConnecting: false,
      start:{
        x:0,
        y:0
      },
      end:{
        x:350,
        y:100
      }
    }
  }
  componentDidMount(){
    document.addEventListener("mouseup", (e)=>{
      this.setState({disabled: false, isConnecting: false})
    }, false);
    document.addEventListener("mousemove", (e)=>{
      if (this.state.isConnecting){
        this.setState({end:{x:e.clientX, y:e.clientY}})
      }
    }, false);
  }
  componentWillUnmount(){
    document.removeEventListener("mouseup", (e)=>{
      this.setState({disabled: false, isConnecting: false})
  }, false);
  }
  render(){
    console.log('start', this.state.start.x, this.state.start.y)
    console.log('end', this.state.end.x, this.state.end.y)
    return(
      <div className="container">
        <Draggable bounds="parent" disabled={this.state.disabled} onDrag={(e, data) => {
          this.setState({f1: {x: data.x, y:data.y}})
        }}>
          <div id="f1">
            x: {this.state.f1.x.toFixed(0)}, y: {this.state.f1.y.toFixed(0)}
            <div className="handle" 
              onMouseDown={(e) => {
                e.stopPropagation()
                this.setState({disabled: true, isConnecting: true, start:{x:e.clientX, y:e.clientY}})
              }}
            ></div>
          </div>
          </Draggable>
        <Draggable onDrag={(e, data) => {
          this.setState({f2: {x: data.x, y:data.y}})
        }}><div id="f2">
            x: {this.state.f2.x.toFixed(0)}, y: {this.state.f2.y.toFixed(0)}
          </div></Draggable>
        <svg className='drawing_container'>
          <PathLine 
              points={[{x:this.state.start.x, y:this.state.start.y}, {x:this.state.end.x, y: this.state.end.y}]} 
              stroke="red" 
              strokeWidth="3"
              fill="none"
              r={10}
              />
        </svg>
      </div>
    )
  }
}

export default App;
