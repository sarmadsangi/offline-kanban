import React, { Component } from 'react';
import styles from './KanbanBoard.css';
import List from 'components/List';
import AddNewList from 'components/AddNewList';
import { observer } from 'mobx-react';
import Slider from 'react-slick';

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
    const {
      lists,
      createNewCard,
      moveCardToPreviousList,
      moveCardToNextList,
    } = this.props;

    const settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      nextArrow: '',
      swipe: true,
      prevArrow: '',
      slidesToScroll: 1,
      variableWidth: true,
      className: styles.slider_wrapper,
    };

    const listElements = lists.map(list => (
      <div>
        <List
          list={list}
          handleAddNewCardToList={(cardName) => createNewCard(cardName, list._id)}
          moveCardToAnotherList={this.handleMoveCardToAnotherList}
          moveCardToPreviousList={moveCardToPreviousList}
          moveCardToNextList={moveCardToNextList}
        />
      </div>
    ));

    if (window.__md.isPhoneSized()) {
      return (
        <Slider {...settings}>
          {listElements}
          <div>
            <AddNewList handleAddNewList={this.handleCreateNewList} />
          </div>
        </Slider>
      );
    }

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
