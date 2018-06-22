import React from 'react';
import socketIOClient from 'socket.io-client';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import { authentication, database } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        signedInUser: null, 
        signedInPlayer: null,
      };
    }

    componentDidMount() {
      authentication.onAuthenticationStateChanged(user => {
        if(user) {
          database.getPlayer(user.uid).then(snapshot => {
            var socket = socketIOClient('http://localhost:5000');
            socket.emit('set player socket', user.uid.toString());
            this.setState(() => ({
              signedInUser: user,
              signedInPlayer: snapshot.val(),
              socket: socket
            }));
          });
          
        }
        else {
          this.setState(() => ({ 
            signedInUser: null, 
            signedInPlayer: null,
            sockt: null
          }));
        }
      });
    }

    render() {
      const { 
        signedInUser, 
        signedInPlayer 
      } = this.state;

      return (
        <AuthenticatedUserContext.Provider value={{ signedInUser, signedInPlayer }}>
          <Component />
        </AuthenticatedUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;