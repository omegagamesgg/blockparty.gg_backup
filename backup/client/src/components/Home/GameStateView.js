import React, { Component } from 'react';
import { gameState, getGameState } from '../../gameManager';

class GameStateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    gameState: null,
    gameStateActive: '',
    gameStateTime: '',
  };
}

  componentDidMount() {
    getGameState();
    this.updateTime();
  }

  updateTime() {
    var remainingTime;
    var formattedRemainingMinutes;
    var formattedRemainingSeconds;
    var active = gameState.active === true ? "Game in progress" : "Next game starts in...";
    this.setState({ gameState: gameState });
    this.setState({ gameStateActive: active });
    if(gameState.active && gameState.gameEndTime) {
      remainingTime = new Date(gameState.gameEndTime.getTime() - Date.now());
      formattedRemainingMinutes = remainingTime.getMinutes();
      formattedRemainingSeconds = remainingTime.getSeconds() < 10 ? '0' + remainingTime.getSeconds() : remainingTime.getSeconds();
    }
    else if(!gameState.active && gameState.nextGameTime) {
      remainingTime = new Date(gameState.nextGameTime.getTime() - Date.now());
      formattedRemainingMinutes = remainingTime.getMinutes();
      formattedRemainingSeconds = remainingTime.getSeconds() < 10 ? '0' + remainingTime.getSeconds() : remainingTime.getSeconds();
    }
    this.setState({ gameStateTime: `${formattedRemainingMinutes}:${formattedRemainingSeconds}` });
    setTimeout(() => { this.updateTime(); }, 1000);
  }

  render() {
    if(this.state.gameState) {
      return(
        <div className="GameStateView">
        <p className="GameStateActive">{this.state.gameStateActive}</p>
        <p className="GameStateTime">{this.state.gameStateTime}</p>
        </div>
      );
    }
    else {
      return(
        <p>Fail</p>
      );
    }
  }
}

export default GameStateView;