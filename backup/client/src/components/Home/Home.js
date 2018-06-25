import React, { Component } from 'react';
import withAuthorization from '../Authentication/withAuthorization';
import AuthenticatedUserContext from '../Authentication/AuthenticatedUserContext';
import HomeMenu from './HomeMenu';
import GameStateView from './GameStateView';
import ChatMessageList from './ChatMessageList';
import ChatForm from './ChatForm';
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
              <ChatForm signedInPlayer={context.signedInPlayer} />
            </footer>
          </main>
        }
      </AuthenticatedUserContext.Consumer>
    ); 
  }
}

export default withAuthorization()(HomePage);