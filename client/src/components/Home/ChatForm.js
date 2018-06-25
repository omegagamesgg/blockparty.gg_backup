import React, { Component } from 'react';
import { database } from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_CHAT_FORM_STATE = { message: '' };

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_CHAT_FORM_STATE};
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(event) {
    event.preventDefault();
    database.createChatMessage(this.props.signedInPlayer.id, this.props.signedInPlayer.name, this.state.message);
    this.setState(() => ({...INITIAL_CHAT_FORM_STATE}));
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

export default ChatForm;