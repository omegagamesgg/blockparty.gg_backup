import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import './Home.css';

const HomePage = () =>
  <div className="HomePage">
    <div className="HomeHeader">
      <img className="HomeMenu" src="images/menu.png"></img>
      <p className="HomeTitle">Lobby</p>
    </div>
    <div className="HomeBody">
      <ChatList />
    </div>
    <div className="HomeFooter">
      <ChatForm />
    </div>
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