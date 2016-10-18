import React, { Component } from 'react';
import styles from './KanbanBoard.css';
import List from 'components/List';
import AddNewList from 'components/AddNewList';
import { observer } from 'mobx-react';
import Slider from 'react-slick';

var slideTimer = null;

@observer
class KanbanBoard extends Component {
  constructor(props) {
    super(props);
    this.handleCreateNewList = this.handleCreateNewList.bind(this);
    this.handleMoveCardToAnotherList = this.handleMoveCardToAnotherList.bind(this);
    this.transitionCardToNextList = this.transitionCardToNextList.bind(this);
    this.transitionCardToPreviousList = this.transitionCardToPreviousList.bind(this);
  }

  handleCreateNewList(listName) {
    this.props.createNewList(listName);
  }

  handleMoveCardToAnotherList(cardToMove, prevListId, nextListId) {
    this.props.moveCardToAnotherList(cardToMove, prevListId, nextListId);
  }

  transitionCardToNextList(card, list) {
    const { slideCount, currentSlide } = this.refs.slider.innerSlider.state;

    // check if there is next list, -2 to exclude ADD NEW LIST component
    // which part of slider but is not counted as list.
    if (currentSlide < slideCount-2) {
      this.refs.slider.slickNext();
      clearTimeout(slideTimer);
      slideTimer = setTimeout(() => this.props.moveCardToNextList(card, list), 300);
    }
  }

  transitionCardToPreviousList(card, list) {
    this.refs.slider.slickPrev();
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => this.props.moveCardToPreviousList(card, list), 300);
  }

  renderLists() {
    const {
      lists,
      createNewCard,
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
          moveCardToPreviousList={this.transitionCardToPreviousList}
          moveCardToNextList={this.transitionCardToNextList}
        />
      </div>
    ));

    if (window.__md.isPhoneSized()) {
      return (
        <Slider ref='slider' {...settings}>
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
