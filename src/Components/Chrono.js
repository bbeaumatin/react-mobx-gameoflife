import React from 'react';
import {observer, inject} from 'mobx-react';
import {Row, Col, Button} from 'react-bootstrap';

import './Chrono.css';


@inject("chrono") @observer
export default class Chrono extends React.Component{
  constructor(props){
    super(props);
    this.counter=0;
  }

  render(){
    //console.log("Rendering Chrono:"+this.props.chrono.name+" -> "+(++this.counter));
    return(
      <div className="Chrono">
        <Row>
          <Col className="name" xs={2}>
            {this.props.chrono.name}
          </Col>
          <Col className="hours" xs={1}>
            {this.props.chrono.hours}
          </Col>
          <Col className="minutes" xs={1}>
            {this.props.chrono.minutes}
          </Col>
          <Col className="seconds" xs={1}>
            {this.props.chrono.seconds}
          </Col>
          <Col className="milliseconds" xs={1}>
            {this.props.chrono.milliseconds}
          </Col>
          <Col xs={2}>
            <Button className="btn-block" bsStyle="success" onClick={this.start.bind(this)}>Start</Button>
          </Col>
          <Col xs={2}>
            <Button className="btn-block" bsStyle="danger" onClick={this.stop.bind(this)}>Stop</Button>
          </Col>
          <Col xs={2}>
            <Button className="btn-block" bsStyle="warning" onClick={this.reset.bind(this)}>Reset</Button>
          </Col>
        </Row>
      </div>
    )
  }

  start(){
    this.props.chrono.start();
  }

  stop(){
    this.props.chrono.stop();
  }

  reset(){
    this.props.chrono.reset();
  }
}