import React from 'react';
//import socketIOClient from 'socket.io-client';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import { authentication, database } from '../../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { signedInUser: null };
    }

    componentDidMount() {
      authentication.onAuthenticationStateChanged(user => {
        if(user) {
          //authentication.getSignedInUser().getIdToken().then(idToken => {
          //    fetch('http://localhost:5000/players/me?auth=' + idToken).then(response => response.json()).then(data => {
          //      console.log(data);  
          //    //this.setState(() => ({ signedInUser: data }));
          //    });
          //  });
          database.getPlayer(user.uid).then(snapshot => {
            //var socket = socketIOClient('http://localhost:5000');
            //socket.emit('set player socket', snapshot.key);
            //socket.emit('set player socket', user.uid);
            console.log(snapshot.val());
            this.setState(() => ({
              signedInUser: user,
              signedInPlayer: snapshot.val()
            }));
          });
        }
        else {
          this.setState(() => ({ signedInUser: null, signedInPlayer: null }));
        }
      });
    }

    render() {
      const { signedInUser, signedInPlayer } = this.state;

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