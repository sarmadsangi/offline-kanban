import React, { Component } from 'react';
import { Input, Button } from 'components/forms';
import styles from './AddNewList.css';

class AddNewList extends Component {
  constructor(props) {
    super(props);
    this.hideOnESC = this.hideOnESC.bind(this);
    this.hide = this.hide.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.handleAddNewListClick = this.handleAddNewListClick.bind(this);
    this.displayInputBox = this.displayInputBox.bind(this);
    this.state = {
      displayInputBox: false,
      listName: '',
    };
  }

  hideOnESC(e) {
    if (e.keyCode === 27) {
      this.hide();
    }
  }

  hide() {
    this.setState({
      displayInputBox: false
    });
  }

  handleInputValueChange(event) {
    this.setState({
      listName: event.target.value
    });
  }

  displayInputBox() {
    this.setState({
      displayInputBox: true
    });
  }

  handleAddNewListClick(e) {
    e.preventDefault();
    const { listName } = this.state;
    this.props.handleAddNewList(listName);

    this.setState({
      listName: '',
      displayInputBox: false,
    })
  }

  renderInitial() {
    return (
      <a onClick={this.displayInputBox} className={styles.container}>
        Add new list
      </a>
    );
  }

  renderInputBox() {
    const { listName } = this.state;

    return (
      <form className={styles.container} onSubmit={this.handleAddNewListClick}>
        <Input
          type='text'
          placeholder='List name'
          autoFocus
          value={listName}
          onChange={this.handleInputValueChange}
          onKeyDown={this.hideOnESC}
        />
        <Button onClick={this.handleAddNewListClick}>Add</Button>
      </form>
    );
  }

  render() {
    const { displayInputBox } = this.state;

    if (displayInputBox) {
      return (
        <div className={styles.wrapper}>
          {this.renderInputBox()}
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        {this.renderInitial()}
      </div>
    );
  }
};

export default AddNewList;
