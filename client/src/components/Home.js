import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import './Home.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { players: null };
  }

  componentDidMount() {
    db.onceGetPlayers().then(snapshot => this.setState(() => ({ players: snapshot.val() })));
  }

  render() {
    const { players } = this.state;
    return (
      <div className="HomePage">
        <div className="HomeHeader">
          <img className="HomeMenu" src="images/menu.png"></img>
          <p className="HomeTitle">Lobby</p>
        </div>
        <div className="HomeBody">
          { !!players && <PlayerList players={players} /> }
          <ChatList />
        </div>
        <div className="HomeFooter">
          <ChatForm />
        </div>
      </div>
    ); 
  }
}

const PlayerList = ({ players }) =>
  <div>
    <p>List of Playernames of Players</p>
    {Object.keys(players).map(key => <div key={key}>{players[key].playername}</div>)}
  </div>
  
const INITIAL_CHAT_LIST_STATE = { messages: [] };

class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      </div>
    );
  }
}

const INITIAL_CHAT_FORM_STATE = { message: '' };

class ChatForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);