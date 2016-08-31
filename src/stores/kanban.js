import { observable, autorunAsync, computed, toJS } from 'mobx';
import { createOrUpdate, getAll } from 'libs/localStorage';
import _ from 'lodash';

// Store that handles all the Kanban board logic
const kanban = new class Kanban {
  @observable lists = [];
  @observable loading = false;

  constructor() {
    this.getLists = this.getLists.bind(this);
    this.createNewList = this.createNewList.bind(this);
    this.createNewCard = this.createNewCard.bind(this);
    this.addCardToList = this.addCardToList.bind(this);
    this.removeCardFromList = this.removeCardFromList.bind(this);
    this.moveCardToAnotherList = this.moveCardToAnotherList.bind(this);
    this.loading = true;

    // Get all board lists from pouchdb
    // 500ms delay to show smooth loading
    getAll((docs) => {
      setTimeout(() => {
        this.loading = false
      }, 500);
      this.lists = docs;
    });
  }

  getLists() {
    return this.lists.toJS();
  }

  // generate total number of tasks
  @computed get totalTasks() {
    const totalTasks = _.reduce(this.lists, (result, list) => {
      result += list.cards.length;
      return result;
    }, 0);

    return totalTasks;
  }

  // assign uniqueId, date etc to each list before add to board
  createNewList(listName) {
    this.lists.push({
      _id: _.uniqueId(listName),
      name: listName,
      cards: [],
      created_at: Date.now(),
    });
  }

  // assign uniqueId, date, pos etc to each card before adding to list
  createNewCard(cardName, listId) {
    const cards = this.getListCards(listId);
    const newPos = cards.length !== 0 ? (cards[cards.length-1].pos + 1) : 0;

    this.addCardToList({
      _id: _.uniqueId(cardName),
      title: cardName,
      pos: newPos,
      created_at: Date.now(),
    }, listId);
  }

  // Add new or existing card to list
  addCardToList(cardToAdd, listId) {
    try {
      let cards = this.getListCards(listId);

      // pushing position of other cards down
      // TODO: proper sorted array implementation to be done later
      cards = cards.map(card => {
        if (cardToAdd.newPos <= card.pos) {
          card.pos += 1;
        }
        return card;
      });

      cards.push({
        _id: cardToAdd._id,
        title: cardToAdd.title,
        pos: cardToAdd.newPos || cardToAdd.pos,
        created_at: cardToAdd.created_at,
      });

      this.setListCards(listId, _.sortBy(cards, ['pos']));
    } catch (e) {
      this.setListCards(listId, [cardToAdd]);
    }
  }

  // remove card from list
  removeCardFromList(cardToRemove, listId) {
    let cards = _.reject(this.getListCards(listId), { _id: cardToRemove._id });
    this.setListCards(listId, cards);
  }

  // move card from one list to another
  // if card is being moved within same list then just repositioning it.
  moveCardToAnotherList(card, prevListId, nextListId) {
    if (prevListId === nextListId) {
      this.moveCardWithInSameList(card, prevListId);
      return;
    }
    this.addCardToList(card, nextListId);
    this.removeCardFromList(card, prevListId);
  }

  moveCardWithInSameList(cardToMove, listId) {
    let cards = this.getListCards(listId);

    // pushing position of other cards down and assigning new position to card that was moved
    // TODO: proper sorted array implementation to be done later
    cards = cards.map(card => {
      if (cardToMove.newPos <= card.pos) {
        card.pos += 1;
      }

      if (cardToMove._id === card._id) {
        card.pos = cardToMove.newPos;
      }

      return card;
    });


    this.setListCards(listId, _.sortBy(cards, ['pos']));
  }

  // get specified list cards
  getListCards(listId) {
    return _.find(this.lists, { _id: listId }).cards || [];
  }

  // set cards for specified list
  setListCards(listId, cards) {
    this.lists.filter(list => list._id === listId)[0].cards = cards;
  }
}();


// autorun with delay of 300ms when kanban list is updates
// this is to save all the data to pouchdb and keep everything in sync
// to provide better offline/lie-fi experience
autorunAsync(() => {
  const lists = toJS(kanban.lists, false);
  lists.forEach(list => {
    createOrUpdate(list)
  });
}, 300);

export default kanban;
