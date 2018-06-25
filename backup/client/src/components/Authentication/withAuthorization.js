import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthenticatedUserContext from './AuthenticatedUserContext';
import { authentication } from '../../firebase';
import * as routes from '../../constants/routes';

const withAuthorization = () => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      authentication.onAuthenticationStateChanged(user => {
        if(!user) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthenticatedUserContext.Consumer>
          { context => context.signedInUser ? <Component /> : null}
        </AuthenticatedUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;