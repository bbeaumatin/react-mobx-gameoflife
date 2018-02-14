import {observable, action} from 'mobx';

export default class CellsStore{

  @observable cells;

  constructor(){
    let self = this;
    this.width = 60;
    this.height = 120;
    this.cells = [];
    for(let x = 0; x < this.width; x++){
      this.cells[x] = [];
      for(let y = 0; y < this.height; y++){
        this.cells[x][y] = new Cell(x, y);
      }
    }

    this.cells.forEach((col, x) => {
      col.forEach((cell, y) => {
        let xp1 = x+1<self.width?x+1:0,
            xm1 = x-1>=0?x-1:self.width-1,
            yp1 = y+1<self.height?y+1:0,
            ym1 = y-1>=0?y-1:self.height-1;
        
        cell.addNeighbour(this.cells[xm1][ym1]);
        cell.addNeighbour(this.cells[x][ym1]);
        cell.addNeighbour(this.cells[xp1][ym1]);

        cell.addNeighbour(this.cells[xm1][y]);
        cell.addNeighbour(this.cells[xp1][y]);

        cell.addNeighbour(this.cells[xm1][yp1]);
        cell.addNeighbour(this.cells[x][yp1]);
        cell.addNeighbour(this.cells[xp1][yp1]);
      });
    });
  }

  @action step(){
    this.cells.forEach((col, x) => {
      col.forEach((cell, y) => {
        let aliveNeighbours = 0;
        cell.neighbours.forEach(neighbour => {if(neighbour.alive)aliveNeighbours++});
        if(!cell.alive && aliveNeighbours === 3){
          cell.willBeAlive = true;
        } else if(aliveNeighbours >= 2 && aliveNeighbours <= 3){
          cell.willBeAlive = cell.alive;
        } else {
          cell.willBeAlive = false;
        }
      });
    });
    this.cells.forEach((col, x) => {
      col.forEach((cell, y) => {
        cell.alive = cell.willBeAlive;
      });
    });
  }

  start(interval = 25){
    var self = this;
    clearInterval(this.timer);
    this.timer = setInterval(()=>self.step(),interval);
  }

  stop(){
    clearTimeout(this.timer);
  }

  @action reset(){
    this.cells.forEach((col, x) => {
      col.forEach((cell, y) => {
        cell.alive = false;
        cell.willBeAlive = false;
      });
    });
  }

}

class Cell {
  @observable alive;
  willBeAlive;
  x;
  y;
  neighbours;

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.alive = false;
    this.willBeAlive = false;
    this.neighbours = [];
  }

  addNeighbour(neighbour){
    this.neighbours.push(neighbour);
  }

  @action toggleLife(){
    this.alive = !this.alive;
  }
  @action giveLife(){
    this.alive = true;
  }
  @action removeLife(){
    this.alive = false;
  }
}