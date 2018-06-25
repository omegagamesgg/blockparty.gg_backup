import React, { Component } from 'react';
import { database } from '../../firebase';

const INITIAL_CHAT_LIST_STATE = { messages: [] };

class ChatMessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_CHAT_LIST_STATE};
  }

  componentDidMount() {
    const messagesRef = database.getRecentChatMessages();
    messagesRef.on('child_added', snapshot => {
    const message = { id: snapshot.key, playerName: snapshot.val().playerName, message: snapshot.val().message };
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
        {messages.map(message => <li className="ChatMessageItem" key={message.id}><b>{message.playerName}</b> {message.message}</li>)}
      </ul>
    );
  }
}

export default ChatMessageList;