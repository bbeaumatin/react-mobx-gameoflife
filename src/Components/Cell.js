import React from 'react';
import {observer} from 'mobx-react';

import './Cell.css';

@observer
export default class Cell extends React.Component{
  render(){
    return(
      <div className={"Cell"+(this.props.cell.alive?" alive":"")} 
           style={{top:this.props.cell.x*10, left:this.props.cell.y*10}} 
           onClick={this.toggleLife.bind(this)}
           onMouseOver={this.paintLife.bind(this)}>
      </div>
    )
  }

  toggleLife(){
    this.props.cell.toggleLife();
  }

  paintLife(e){
    if(e.ctrlKey){
      this.props.cell.giveLife();
    } else if(e.shiftKey){
      this.props.cell.removeLife();
    }
  }
}