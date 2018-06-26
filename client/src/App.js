import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import * as routes from './routes';
import LandingPage from './LandingPage';
import PlayPage from './PlayPage';
import './App.css';

const App = () =>
  <BrowserRouter>
    <main className="App">
      <Route exact path={ routes.LANDING } component={ () => <LandingPage /> } />
      <Route exact path={ routes.PLAY } component={ () => <PlayPage /> } />
    </main>
  </BrowserRouter>  

export default App;
