import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './real_estate/Home';
import Login from './real_estate/Login';
import Register from './real_estate/Register';
import ItemDetail from './real_estate/ItemDetail';

function App() {
  return (
		<div className="App">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/items/:itemId" component={ItemDetail} />
			</Switch>
		</div>
	);
}

export default App;
