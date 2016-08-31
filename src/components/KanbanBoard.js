import React, { Component } from 'react';
import styles from './KanbanBoard.css';
import List from 'components/List';
import AddNewList from 'components/AddNewList';
import { observer } from 'mobx-react';

@observer
class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNewList = this.handleCreateNewList.bind(this);
    this.handleMoveCardToAnotherList = this.handleMoveCardToAnotherList.bind(this);
  }

  handleCreateNewList(listName) {
    this.props.createNewList(listName);
  }

  handleMoveCardToAnotherList(cardToMove, prevListId, nextListId) {
    this.props.moveCardToAnotherList(cardToMove, prevListId, nextListId);
  }

  renderLists() {
    const { lists, createNewCard } = this.props;
    const listElements = lists.map(list => (
      <List
        list={list}
        handleAddNewCardToList={(cardName) => createNewCard(cardName, list._id)}
        moveCardToAnotherList={this.handleMoveCardToAnotherList}
      />
    ));

    return (
      <div className={styles.lists_wrapper}>
        {listElements}
        <AddNewList handleAddNewList={this.handleCreateNewList} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.board}>
        {this.renderLists()}
      </div>
    )
  }
};

export default KanbanBoard;
