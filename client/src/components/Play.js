import React, { Component } from 'react';
import withAuthorization from './Authentication/withAuthorization';
import Phaser from 'phaser';
import PlayScene from './PlayScene';
import { authentication, database } from '../firebase';

class PlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.game = {};
  }

  componentDidMount() {
    this.createGame();

    setInterval(() => {
      if(this.game.scene.keys["PlayScene"]) {
        if(this.state.score !== this.game.scene.keys["PlayScene"].score) {
          this.setState({ 
            score: this.game.scene.keys["PlayScene"].score 
          });
        }
      }
    }, 60);

    var gameStateRef = database.getGameState();
    gameStateRef.once('value', snapshot => {
      snapshot.forEach(player => {
        if(player.key === authentication.getCurrentUser().uid) {
          this.game.scene.keys["PlayScene"].addCurrentPlayer(player);
        }
        else {
          this.game.scene.keys["PlayScene"].addOtherPlayer(player);
        }
      });
    });
  } 

  createGame() {
    // Initialize Phaser
    var config = {
      parent: "Game",
      width: window.innerWidth,
      height: window.innerHeight,
      type: Phaser.AUTO,
      backgroundColor: "#71c5cf",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [
        PlayScene
      ],
    }
    this.game = new Phaser.Game(config);
  }

  render() {
    return(
      <main>
        <p>{this.state.score}</p>
        <div id="Game" />
      </main>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(PlayPage);