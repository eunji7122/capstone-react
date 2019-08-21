import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './App';
import RootStore from './RootStore';
import * as serviceWorker from './serviceWorker';

const rootStore = new RootStore();

ReactDOM.render(
	<Router history={rootStore.history}>
		<Provider
			authStore={rootStore.authStore}
			httpService={rootStore.httpService}
			history={rootStore.history}>
			<App />
		</Provider>
	</Router>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
