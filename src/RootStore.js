import { createBrowserHistory } from 'history';
import AuthStore from './AuthStore';
import HttpService from './HttpService';

export default class RootStore {

    constructor() {
        this.history = createBrowserHistory();
        this.authStore = new AuthStore(this);
		this.httpService = new HttpService(this);
    }
}
