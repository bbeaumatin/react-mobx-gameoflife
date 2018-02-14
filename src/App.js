import React, { Component } from 'react';
import {Button, DropdownButton, MenuItem} from 'react-bootstrap';

import './App.css';
import CellsStore from './Stores/CellsStore';
import Cell from './Components/Cell';

class App extends Component {
  constructor(props){
    super(props);
    this.cellStore = new CellsStore();
  }

  render() {
    return (
      <div className="App">
        {this.cellStore.cells.map(col => col.map(cell => <Cell key={"cell:"+cell.x+":"+cell.y} cell={cell}/>))}
        <div className="actions">
          <Button className="action step btn-block" bsStyle="primary" onClick={this.step.bind(this)}>Step</Button>
          <Button className="action start btn-block" bsStyle="success" onClick={this.start.bind(this)}>Start</Button>
          <DropdownButton className="interval" bsStyle="success" title="Set Interval" id={"interval"} onSelect={this.startInterval.bind(this)}>
            <MenuItem eventKey="25">25</MenuItem>
            <MenuItem eventKey="50">50</MenuItem>
            <MenuItem eventKey="100">100</MenuItem>
            <MenuItem eventKey="100">250</MenuItem>
            <MenuItem eventKey="500">500</MenuItem>
            <MenuItem eventKey="1000">1000</MenuItem>
          </DropdownButton>
          <Button className="action stop btn-block" bsStyle="danger" onClick={this.stop.bind(this)}>Stop</Button>
          <Button className="action reset btn-block" bsStyle="warning" onClick={this.reset.bind(this)}>Reset</Button>
        </div>
      </div>
    );
  }

  step(){
    this.cellStore.step();
  }

  start(){
    this.cellStore.start();
  }

  startInterval(eventKey){
    this.cellStore.start(eventKey);
  }

  stop(){
    this.cellStore.stop();
  }

  reset(){
    this.cellStore.reset();
  }
}

export default App;