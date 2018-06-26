import React, { Component } from 'react';
import * as firebase from './firebase';
import './PlayPage.css';

class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      playerName: '',
      score: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
  }

  handlePageClick() {
    if(this.state.playerName === '')
      return;
    
    firebase.database.ref(`games/clickparty/players/${this.state.playerName}`).set({ score: this.state.score + 1 });
  }

  handleNameSubmit(event) {
    this.setState({ playerName: this.state.inputName });
    firebase.database.ref(`games/clickparty/players/${this.state.inputName}`).set({
      name: this.state.inputName,
      score: 0
    });
    firebase.database.ref(`games/clickparty/players/${this.state.inputName}`).on('value', snapshot => {
      this.setState({ score: snapshot.val().score });
    });
    event.preventDefault();
  }

  render() {
    return(
      <div className="PlayPage" onClick={this.handlePageClick}>
        <h1>Play!</h1>
        <form onSubmit={this.handleNameSubmit}>
          <input value={this.state.inputName} onChange={event => this.setState({ inputName: event.target.value })} type="text" placeholder="Player name" />
          <button disabled={this.state.name === ''} type="submit">Sign in</button>
        </form>
        <div>&nbsp;{this.state.playerName}</div>
        <div>Score: {this.state.score}</div>
      </div>
    )
  }
}

export default PlayPage;