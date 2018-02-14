import {observable, computed, action} from 'mobx';

export default class ChronoStore{

  @observable time;

  constructor(name){
    this.name = name;
    this.id = name+(Date.now())+Math.floor(Math.random()*10000);
    this.time = 0;
    this.timeStart = 0;
    this.timer = null;
  }

  update(){
    const self = this;
    clearTimeout(this.timer);
    this.time = Date.now()-this.timeStart;
    this.timer = setTimeout(()=>{self.update()}, 1);
  }

  @action start(){
    this.timeStart = Date.now()-this.time;
    this.update();
  }

  @action stop(){
    clearTimeout(this.timer);
  }

  @action reset(){
    this.time = 0;
    this.timeStart = Date.now();
  }

  @computed get hours(){
    return (""+Math.floor(this.time/3600000)).padStart(2,"0")
  }

  @computed get minutes(){
    return (""+Math.floor((this.time%3600000)/60000)).padStart(2,"0")
  }

  @computed get seconds(){
    return (""+Math.floor((this.time%60000)/1000)).padStart(2,"0");
  }

  @computed get milliseconds(){
    return (""+this.time%1000).padStart(3,"0")
  }

}