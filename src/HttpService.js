import axios from 'axios';
import { reaction } from 'mobx';

class HttpService {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.authStore = rootStore.authStore;

		this.clientID = 'Lrisd2wLpebx5ITLwBGYrVzHNTSbcUYeMVYNRyue';
		this.refreshSubscribers = [];
		this.isRefreshingToken = false;

		axios.defaults.baseURL = 'http://localhost:8000';
		axios.defaults.headers.common['Authorization'] = this.authStore.authToken;

		reaction(
			() => this.authStore.authToken,
			() => {
				axios.defaults.headers.common[
					'Authorization'
				] = this.authStore.authToken;
			},
		);
	}

	getMe() {
		return axios.get('/me/').then(response => {
			return response.data;
		});
	}

	login(username, password) {
		return axios
			.post('/o/token/', {
				grant_type: 'password',
				client_id: this.clientID,
				username,
				password,
			})
			.then(response => {
				const token = response.data;
				this.authStore.setToken(token);
				return token;
			});
	}

	register(username, password, email, phone, private_key) {
		return axios
			.post('/users/', {
				username,
				password,
				email,
				phone,
				private_key,
			})
			.then(response => {
				return response.data;
			});
	}

	indexItems() {
		return axios.get('/items/').then(response => {
			return response.data;
		});
	}

	getItems(itemId) {
		return axios.get('/items/' + itemId + '/').then(response => {
			return response.data;
		});
	}
	
}

export default HttpService;
