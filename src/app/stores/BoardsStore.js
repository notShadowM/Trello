import {
  makeObservable, observable, computed, action, autorun, toJS,
} from 'mobx';

class BoardsStore {
  boards = [{
    id: '0', title: 'testing', background: 'rgb(0, 121, 191)', list: [{ id: 0, listTitle: 'test', cards: [{ id: 0, cardTitle: 'hello' }] }, { id: 1, listTitle: 'test2', cards: [{ id: 0, cardTitle: 'hii' }] }, { id: 2, listTitle: 'test3', cards: [{ id: 0, cardTitle: 'hello' }] }],
  }];

  constructor() {
    makeObservable(this, {
      boards: observable,
      addBoard: action,
      addList: action,
      switchLists: action,
      switchCards: action,
      addCard: action,
      getCard: computed,
    });
  }

  addBoard(title, background) {
    this.boards.push({
      id: `${this.boards.length}`, title, background, list: [],
    });
  }

  addList(listName, boardId) {
    const board = this.boards.find((e) => e.id === boardId);
    board.list.push({ id: board.list.length, listTitle: listName, cards: [] });
  }

  switchLists(dragResult, boardId) {
    const { removedIndex, addedIndex, payload } = dragResult;
    const { list } = this.boards.find((e) => e.id === boardId);
    const firstList = list.findIndex((e) => e.id === removedIndex);
    const secList = list.findIndex((e) => e.id === addedIndex);

    const temp = list[firstList];
    const temp2 = list[secList];
    temp.id = addedIndex;
    list.splice(firstList, 1);
    list.splice(secList, 0, temp);
    if (removedIndex < addedIndex) {
      list.filter((e) => e.id > removedIndex && e.id < addedIndex).forEach((e) => {
        e.id -= 1;
      });
      temp2.id = addedIndex - 1;
    } else if (removedIndex > addedIndex) {
      list.filter((e) => e.id < removedIndex && e.id > addedIndex).forEach((e) => {
        e.id += 1;
      });
      temp2.id = addedIndex + 1;
    }
  }

  addCard(cardName, listId, boardId) {
    const board = this.boards.find((e) => e.id === boardId);
    const list = board.list.find((e) => e.id === listId);
    list.cards.push({ id: list.cards.length, cardTitle: cardName });
  }

  switchCards(dragResult, listId, boardId) {
    const { list } = this.boards.find((e) => e.id === boardId);
    const { removedIndex, addedIndex, payload } = dragResult;

    if (removedIndex !== null) {
      const { cards } = list.find((e) => e.id === payload.listId);
      cards.splice(removedIndex, 1);

      if (!(removedIndex && addedIndex)) {
        cards.filter((e) => e.id > removedIndex).forEach((e) => {
          e.id -= 1;
        });
      } else if (removedIndex && addedIndex) {
        if (removedIndex < addedIndex) {
          cards.filter((e) => e.id > removedIndex && e.id <= addedIndex).forEach((e) => {
            e.id -= 1;
          });
        } else if (removedIndex > addedIndex) {
          cards.filter((e) => e.id < removedIndex && e.id >= addedIndex).forEach((e) => {
            e.id += 1;
          });
        }
      }
    }

    if (addedIndex !== null) {
      const { cards } = list.find((e) => e.id === listId);

      if (!(removedIndex && addedIndex)) {
        cards.filter((e) => e.id >= addedIndex).forEach((e) => {
          e.id += 1;
        });
      }

      cards.splice(addedIndex, 0, { ...payload.card, id: addedIndex });
    }
  }

  get getCard() {
    return (index, listId, boardId) => this.boards[boardId].list.find((e) => e.id === listId).cards.find((e) => e.id === index);
  }
}

export default new BoardsStore();
