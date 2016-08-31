import React, { Component } from 'react';
import { TextArea, Button } from 'components/forms';
import styles from './AddNewCard.css';

class AddNewCard extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.hide = this.hide.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleAddNewCardClick = this.handleAddNewCardClick.bind(this);
    this.displayInputBox = this.displayInputBox.bind(this);
    this.state = {
      displayInputBox: false,
      cardTitle: '',
    };
  }

  handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.hide();
    }

    if (e.keyCode === 13) {
      this.handleAddNewCardClick(e);
    }
  }

  hide() {
    this.setState({
      displayInputBox: false
    });
  }

  handleInputValueChange(event) {
    this.setState({
      cardTitle: event.target.value
    });
  }

  displayInputBox() {
    this.setState({
      displayInputBox: true
    });
  }

  handleAddNewCardClick(e) {
    e.preventDefault();
    const { cardTitle } = this.state;
    this.props.handleAddNewCard(cardTitle);

    this.setState({
      cardTitle: '',
      displayInputBox: false,
    })
  }

  renderInitial() {
    return (
      <a onClick={this.displayInputBox} className={styles.container}>
        Add New Task
      </a>
    );
  }

  renderInputBox() {
    const { cardTitle } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleAddNewCardClick}>
        <TextArea
          rows={4}
          placeholder='Your task details ...'
          autoFocus
          value={cardTitle}
          onChange={this.handleInputValueChange}
          onKeyDown={this.handleKeyDown}
        />
        <div className={styles.form_footer}>
          <Button onClick={this.handleAddNewCardClick}>Add Task</Button>
        </div>
      </form>
    );
  }

  render() {
    const { displayInputBox } = this.state;

    if (displayInputBox) {
      return this.renderInputBox();
    }

    return this.renderInitial();
  }
};

export default AddNewCard;
