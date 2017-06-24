import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Logo from './Logo';
import LoginButton from './LoginButton';
import Home from './Home';
import Repository from './Repository';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header>
        <Logo />
        <h3>Code Vote</h3>
        <LoginButton />
      </header>
      <Route exact path="/" component={ Home } />
      <Route path="/:user/:name" component={ Repository }/>
    </div>
  </Router>
);

export default App;
