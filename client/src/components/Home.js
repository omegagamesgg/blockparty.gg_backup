import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import AuthUserContext from './AuthUserContext';
import SignOutButton from './SignOut';
import './Home.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      nextGameTime: null,
      countdown: '',
    };
    this.handleHomePageMouseDown = this.handleHomePageMouseDown.bind(this);
    this.handleHomeMenuButtonMouseDown = this.handleHomeMenuButtonMouseDown.bind(this);
  }

  componentDidMount() {
    const nextGameTimeRef = db.getNextGameTime();
    nextGameTimeRef.on('value', snapshot => {
      this.setState({ nextGameTime: snapshot.val() });
    });

    setInterval(() => {
      var nextGameTimeDate = new Date(this.state.nextGameTime);
      var currentTimeDate = new Date();
      var remainingTimeDate = new Date(nextGameTimeDate - currentTimeDate);
      var formattedMinutes = remainingTimeDate.getMinutes();
      var formattedSeconds = remainingTimeDate.getSeconds() >= 10 ? remainingTimeDate.getSeconds() : '0' + remainingTimeDate.getSeconds();
      var countdown = `Next game starts in ${formattedMinutes}:${formattedSeconds}`;
      this.setState({ countdown: countdown });
    }, 1000);
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
      <AuthUserContext.Consumer>
        { context =>
          <main className="HomePage" onMouseDown={this.handleHomePageMouseDown}>
            <header className="HomeHeader">
              <button className="HomeMenuButton" onMouseDown={this.handleHomeMenuButtonMouseDown}><i className="fas fa-bars"></i></button>
              <HomeMenu visibility={this.state.menuVisible} />
              <p className="HomeTitle">Lobby</p>
              <p className="HomeNextGameTime">{this.state.countdown}</p>
            </header>
            <section className="HomeBody" id="HomeBody">
              <ChatMessageList />
            </section>
            <footer className="HomeFooter">
              <ChatForm currentPlayer={context.currentPlayer} />
            </footer>
          </main>
        }
      </AuthUserContext.Consumer>
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
    const messagesRef = db.getRecentMessages();
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
    db.doCreateMessage(this.props.currentPlayer.playername, this.state.message);
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

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);