import { createBrowserHistory } from 'history'
import AuthStore from './AuthStore'
import HttpService from './HttpService'
import Caver from 'caver-js'

export default class RootStore {
	constructor() {
		this.cav = new Caver('https://api.baobab.klaytn.net:8651')
		this.history = createBrowserHistory()
		this.authStore = new AuthStore(this)
		this.httpService = new HttpService(this)
	}
}
