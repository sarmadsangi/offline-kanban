import React, { Component } from 'react';
import styles from './List.css';
import Card from 'components/Card';
import AddNewCard from 'components/AddNewCard';
import ListHeader from 'components/ListHeader';
import { observer } from 'mobx-react';

@observer
class List extends Component {
  constructor(props) {
    super(props);
    this.onCardDropIntoEmptyList = this.onCardDropIntoEmptyList.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.handleDropOnCard = this.handleDropOnCard.bind(this);
  }

  getCards() {
    const { list, moveCardToPreviousList, moveCardToNextList } = this.props;
    const { cards } = list;
    let cardElements;
    if (cards.length) {
      cardElements = cards.map(card => (
        <Card
          list_id={list._id}
          {...card}
          isMobileCard={window.__md.mobile()}
          handleDropOnCard={this.handleDropOnCard}
          moveCardToPreviousList={() => {
            moveCardToPreviousList(card, list);
          }}
          moveCardToNextList={() => {
            moveCardToNextList(card, list);
          }}
        />
      ));
    }

    return cardElements;
  }

  // only takes care of empty list drop
  // everything else happens inside handleDropOnCard
  onCardDropIntoEmptyList(e) {
    e.preventDefault();
    const {list_id, ...dropProps} = JSON.parse(e.dataTransfer.getData('text'));
    const { list, moveCardToAnotherList } = this.props;

    if (!list.cards || !list.cards.length) {
      moveCardToAnotherList(dropProps, list_id, list._id);
    }
  }

  onDragOver(e) {
    e.preventDefault();
  }

  handleDropOnCard(card, prevListId, nextListId) {
    this.props.moveCardToAnotherList(card, prevListId, nextListId);
  }

  render() {
    const { list, handleAddNewCardToList } = this.props;

    return (
      <div className={styles.list}>
        <ListHeader list={list} />
        <section
          className={styles.list_cards_section}
          onDrop={this.onCardDropIntoEmptyList}
          onDragOver={this.onDragOver} >
          {this.getCards()}
          <AddNewCard handleAddNewCard={handleAddNewCardToList} />
        </section>
      </div>
    );
  }
};

export default List;
