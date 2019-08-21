import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './real_estate/Home';
import Login from './real_estate/Login';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
