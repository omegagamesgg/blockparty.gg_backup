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
      active: false,
      startTime: null,
      endTime: null,
      remainingTime: '',
      leaderboard: [],
      players: []
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.playerId = '';
    this.scoreId = '';
  }

  componentDidMount() {
    firebase.database.ref(`games/clickparty/clock`).on('value', snapshot => {
      this.setState({ active: snapshot.val().active });
      this.setState({ startTime: new Date(snapshot.val().startTime) });
      this.setState({ endTime: new Date(snapshot.val().endTime) });

      if(snapshot.val().active) {
        setTimeout(() => { this.endGame(); }, new Date(snapshot.val().endTime).getTime() - Date.now());
      }
      else if(!snapshot.val().active) {
        setTimeout(() => { this.startGame(); }, new Date(snapshot.val().startTime).getTime() - Date.now());
      }  
    });

    firebase.database.ref('games/clickparty/players').on('value', snapshot => {
      var players = [];
      snapshot.forEach(player => {
        var newPlayer = {
          id: player.key,
          name: player.val().name
        };
        players.push(newPlayer);
      });
      this.setState({ players: players });
    });

    firebase.database.ref(`games/clickparty/scores`).on('value', snapshot => {
      var leaderboard = [];
      snapshot.forEach(score => {
        var newScore = {};
        newScore.key = score.key;
        var player = this.state.players.find(player => player.id === score.val().playerId);
        if(player) {
          newScore.name = player.name;
        }
        newScore.score = score.val().score;
        leaderboard.push(newScore);
      });
      this.setState({ leaderboard: leaderboard });
    });
    this.updateTime();
  }

  startGame() {
    console.log('starting game');
    setTimeout(() => { this.endGame(); }, this.state.endTime);
  }

  endGame() {
    console.log('ending game');
    setTimeout(() => { this.startGame(); }, this.state.startTime);
  }

  updateTime() {
    var remainingTime;
    if(this.state.active && this.state.endTime) {
      remainingTime = new Date(this.state.endTime.getTime() - Date.now());
    }
    else if(!this.state.active && this.state.startTime) {
      remainingTime = new Date(this.state.startTime.getTime() - Date.now());
    }
    if(remainingTime) {
      var formattedTime = remainingTime.getMinutes() + ':' + (remainingTime.getSeconds() < 10 ? '0' + remainingTime.getSeconds() : remainingTime.getSeconds());
      this.setState({ remainingTime: formattedTime });
    }
    setTimeout(() => { this.updateTime(); }, 1000);
  }

  handlePageClick() {
    if(!this.state.active || this.playerId === '' || this.scoreId === '')
      return;
    
    firebase.database.ref(`games/clickparty/scores/${this.scoreId}`).update({ score: this.state.score + 1 });
  }

  handleNameSubmit(event) {
    this.setState({ playerName: this.state.inputName });
    firebase.database.ref(`games/clickparty/players`).once('value', snapshot => {
      snapshot.forEach(player => {
        if(player.val().name === this.state.inputName) {
          this.playerId = player.key;
        }
      });
    });
    if(!this.playerId) {
      this.playerId = firebase.database.ref(`games/clickparty/players`).push({
        name: this.state.inputName
      }).key;
    }
    firebase.database.ref(`games/clickparty/scores`).once('value', snapshot => {
      snapshot.forEach(score => {
        if(score.val().playerId === this.playerId) {
          this.scoreId = score.key;
        }
      });
    });
    if(!this.scoreId) {
      this.scoreId = firebase.database.ref(`games/clickparty/scores`).push({
        playerId: this.playerId,
        score: 0
      }).key;
    }
    firebase.database.ref(`games/clickparty/scores/${this.scoreId}`).on('value', snapshot => {
      if(snapshot.val()) {
        this.setState({ score: snapshot.val().score });
      }
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
        <div>Time: {this.state.remainingTime}</div>
        <div>Active: {this.state.active.toString()}</div>
        <div>Leaderboard: {this.state.leaderboard.map(score => <p key={score.key}>{score.name}: {score.score}</p>)}</div>

      </div>
    )
  }
}

export default PlayPage;