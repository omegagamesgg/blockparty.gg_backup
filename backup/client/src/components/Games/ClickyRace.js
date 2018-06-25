import React, { Component } from 'react';
import withAuthorization from '../Authentication/withAuthorization';
import socketIOClient from 'socket.io-client';
import { authentication } from '../../firebase';

class ClickyRacePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: "0:00",
      score: 0,
    };
    this.socketIOClient = null;
  }

  componentDidMount() {
    this.socketIOClient = socketIOClient('http://localhost:5000');
    this.socketIOClient.on('player score update', (update) => {
      console.log(`received player score update: ${update.score}`);
      this.setState({ score: update.score });
    });
    this.socketIOClient.emit('join game', authentication.getSignedInUser().uid);
  }

  click = (event) => {
    console.log('click');
    this.socketIOClient.emit('player click');
  }

  render() {
    return(
      <main onClick={this.click}>
        <p className="ClickyRaceGameClock">{this.state.timeRemaining}</p>
        <p className="ClickyRaceInstructions">Click as fast as possible!</p>
        <p className="CurrentUserScore">{this.state.score}</p>
      </main>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(ClickyRacePage);