import React from 'react';
import AuthUserContext from './AuthUserContext';
import { firebase, db } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        authUser: null, 
        currentPlayer: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          db.onceGetPlayerById(authUser.uid).then(snapshot => {
            this.setState(() => ({
              authUser: authUser,
              currentPlayer: snapshot.val()
            }));
          });
        }
        else {
          this.setState(() => ({ authUser: null, currentPlayer: null }));
        }
      });
    }

    render() {
      const { authUser, currentPlayer } = this.state;

      return (
        <AuthUserContext.Provider value={{ authUser, currentPlayer }}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;