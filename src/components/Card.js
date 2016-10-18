import React, { Component } from 'react';
import styles from './Card.css';
import DummyCard from 'components/DummyCard';
import ArrowIcon from 'components/icons/Arrow';
import { observer } from 'mobx-react';

export const constants = {
  CARD_ID: 'CARD_ID',
};

@observer
class Card extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.hideDummy = this.hideDummy.bind(this);
    this.displayDummy = this.displayDummy.bind(this);
    this.handleCardDragStart = this.handleCardDragStart.bind(this);
    this.handleCardDragEnd = this.handleCardDragEnd.bind(this);

    this.state = {
      displayDummy: false,
      dragging: false,
    };
  }

  handleDrop(e) {
    e.preventDefault();

    const { handleDropOnCard, list_id, _id, pos } = this.props;
    const dropProps = JSON.parse(e.dataTransfer.getData('text'));

    // prepare new card props, some will be discarded in Store
    // TODO: improve this schema / move this to store as well.
    const newCard = {
      _id: dropProps._id,
      droppedAtCardId: _id,
      newPos: pos,
      title: dropProps.title,
      pos: dropProps.pos,
      created_at: dropProps.created_at,
    }

    handleDropOnCard(newCard, dropProps.list_id, list_id);
    this.hideDummy(e);
  }

  hideDummy(e) {
    // onDragLeave causes issues when there are nested elements inside drop zone
    // with this it will only trigger any change on dropzone element itself (parent)
    if (e.target.id === constants.CARD_ID) {
      this.setState({
        displayDummy: false,
        dragging: false,
      });
    }
  }

  // Don't display dummy when this card itself is being dragged
  displayDummy(e) {
    const { dragging } = this.state;
    if (!dragging) {
      this.setState({
        displayDummy: true,
      });
    }
  }

  handleCardDragStart(e) {
    e.dataTransfer.setData('text', JSON.stringify(this.props));
    this.setState({
      dragging: true,
    })
  }

  handleCardDragEnd(e) {
    this.setState({
      dragging: false,
    })
  }

  renderMobileControls() {
    return (
      <div className={styles.controls}>
        <a onClick={this.props.moveCardToPreviousList} className={styles.goBack}><ArrowIcon /></a>
        <a onClick={this.props.moveCardToNextList} className={styles.goNext}><ArrowIcon /></a>
      </div>
    );
  }

  render() {
    const { title, isMobileCard } = this.props;
    const { displayDummy } = this.state;

    return (
      <div
        onDrop={this.handleDrop}
        onDragEnter={this.displayDummy}
        onDragLeave={this.hideDummy}
        id={constants.CARD_ID} >
        {displayDummy ? <DummyCard /> : ''}
        <div
          draggable='true'
          onDragStart={this.handleCardDragStart}
          onDragEnd={this.handleCardDragEnd}
          className={styles.card} >
          <div>{title}</div>
          {isMobileCard ? this.renderMobileControls() : null}
        </div>
      </div>
    )
  }
};

export default Card;
