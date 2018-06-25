import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App">
        <h1 className="App-instructions">Click as many times as possible in 2 minutes!</h1>
        <div className="App-score-group">
          <p className="App-score-label">Score</p>
          <h2 className="App-score-text">0</h2>
        </div>
      </main>
    );
  }
}

export default App;
