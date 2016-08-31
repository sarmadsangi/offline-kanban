import React, { Component } from 'react';
import Header from 'components/Header.js';
import KanbanBoard from 'components/KanbanBoard.js';
import Footer from 'components/Footer.js';
import styles from './App.css';
import { observer } from 'mobx-react';
import KanbanStore from 'stores/kanban';

@observer
class App extends Component {
  renderLoading() {
    return (
      <div className={styles.loader_wrapper} >
        <div className={styles.loader} >
          <svg className={styles.circular} viewBox="25 25 50 50">
            <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        </div>
      </div>
    );
  }

  render() {

    if (KanbanStore.loading) {
      return (
        <div className={styles.App}>
          {this.renderLoading()}
        </div>
      );
    }

    return (
      <div className={styles.App}>
        <Header totalTasks={KanbanStore.totalTasks} />
        <KanbanBoard
          loading={KanbanStore.loading}
          lists={KanbanStore.getLists()}
          createNewList={KanbanStore.createNewList}
          createNewCard={KanbanStore.createNewCard}
          moveCardToAnotherList={KanbanStore.moveCardToAnotherList}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
