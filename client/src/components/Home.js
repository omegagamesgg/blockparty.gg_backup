import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import './Home.css';
import AuthUserContext from './AuthUserContext';

class HomePage extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        { context =>
          <main className="HomePage">
            <header className="HomeHeader">
              <button className="HomeMenu"><i className="fas fa-bars"></i></button>
              <nav>
              </nav>
              <p className="HomeTitle">Lobby</p>
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