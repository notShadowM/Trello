import {
  makeObservable, observable, computed, action, autorun,
} from 'mobx';

class ItemsData {
  draggedList = '';

  droppedList = '';

  draggedCard = '';

  droppedCard = '';

  done = true;

  constructor() {
    makeObservable(this, {
      draggedList: observable,
      droppedList: observable,
      done: observable,
      draggedCard: observable,
      droppedCard: observable,
      setList: action,
      setCard: action,
      setDroppedList: action,
      setDroppedCard: action,
      setDone: action,
    });
  }

  setList(id) {
    this.draggedList = id;
  }

  setDroppedList(id) {
    this.droppedList = id;
  }

  setDone(value) {
    this.done = value;
  }

  setCard(obj) {
    this.draggedCard = obj;
  }

  setDroppedCard(obj) {
    this.droppedCard = obj;
  }
}

export default new ItemsData();
