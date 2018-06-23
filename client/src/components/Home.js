import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { database } from '../firebase';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import SignOutButton from './SignOut';
import { gameState, getGameState } from '../gameManager';
import './Home.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
    };
  }

  handleHomePageMouseDown(event) {
    if(this.state.menuVisible) {
      this.setState({ menuVisible: false });
    }
  }

  handleHomeMenuButtonMouseDown() {
    this.setState({ menuVisible: true });
  }

  render() {
    return (
      <AuthenticatedUserContext.Consumer>
        { context =>
          <main className="HomePage" onMouseDown={() => { this.handleHomePageMouseDown(); } }>
            <header className="HomeHeader">
              <button className="HomeMenuButton" onMouseDown={() => { this.handleHomeMenuButtonMouseDown(); } }><i className="fas fa-bars"></i></button>
              <HomeMenu visibility={this.state.menuVisible} />
              <p className="HomeTitle">Home</p>
              <GameStateView />
            </header>
            <section className="HomeBody" id="HomeBody">
              <ChatMessageList />
            </section>
            <footer className="HomeFooter">
              <ChatForm currentPlayer={context.currentPlayer} />
            </footer>
          </main>
        }
      </AuthenticatedUserContext.Consumer>
    ); 
  }
}

class HomeMenu extends Component {
  handleOnMouseDown(event) {
    event.stopPropagation();
  }

  render() {
    var visibilityClass = this.props.visibility ? "show" : "hide";
    return(
      <nav id="HomeMenu" className={visibilityClass} onMouseDown={this.handleOnMouseDown}>
        <ul>
          <li><SignOutButton /></li>
        </ul>
      </nav>
    )
  }
}

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
      )
    }
  }
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_CHAT_LIST_STATE = { messages: [] };

class ChatMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_CHAT_LIST_STATE};
  }
  
  componentDidMount() {
    const messagesRef = database.getRecentChatMessages();
    messagesRef.on('child_added', snapshot => {
      const message = { id: snapshot.key, sender: snapshot.val().sender, text: snapshot.val().message };
      this.setState(prevState => ({
        messages: [ message, ...prevState.messages]
      }));
      var body = document.getElementById("HomeBody");
      body.scrollTop = body.scrollHeight;
    });
  }

  render() {
    const { messages } = this.state;

    return(
      <ul className="ChatMessageList">
        {messages.map(message => <li className="ChatMessageItem" key={message.id}><b>{message.sender}</b> {message.text}</li>)}
      </ul>
    );
  }
}

const INITIAL_CHAT_FORM_STATE = { message: '' };

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_CHAT_FORM_STATE};
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(event) {
    database.createChatMessage(this.props.currentPlayer.playername, this.state.message);
    this.setState(() => ({...INITIAL_CHAT_FORM_STATE}));
    event.preventDefault();
  }

  render() {
    const { message } = this.state;
    const isInvalid = message === '';

    return(
      <form className="ChatInputForm" onSubmit={this.onSubmit}>
        <input className="ChatMessageInputField" value={message} onChange={event => this.setState(byPropKey('message', event.target.value))} type="text" placeholder="Say something" />
        <button className="ChatSubmit" disabled={isInvalid} type="submit">Send</button>
      </form>
    );
  }
}

const authorizationCondition = (signedInUser) => !!signedInUser;

export default withAuthorization(authorizationCondition)(HomePage);