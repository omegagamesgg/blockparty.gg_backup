import React, { Component } from 'react';
import SignOutButton from '../Authentication/SignOut';

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
    );
  }
}

export default HomeMenu;