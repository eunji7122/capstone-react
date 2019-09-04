import axios from 'axios';
import { reaction } from 'mobx';
import Caver from 'caver-js';
import ContractAddress from './deployedAddress.json';
import ContractABI from './deployedABI.json';

class HttpService {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.authStore = rootStore.authStore;

		const cav = new Caver('https://api.baobab.klaytn.net:8651');
		this.contract = new cav.klay.Contract(ContractABI, ContractAddress.address);

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

	purchaseItem(price) {
		const cav = new Caver('https://api.baobab.klaytn.net:8651');
		const loginAddress = JSON.parse(sessionStorage.getItem('walletInstance'));
		console.log(loginAddress);
		console.log(loginAddress.address);

		this.contract.methods
			.deposit()
			.send({
				from: loginAddress.address,
				gas: '250000',
				value: cav.utils.toPeb(price, 'KLAY'),
			})
			.once('transactionHash', txHash => {
				console.log(`txHash: ${txHash}`);
			})
			.once('receipt', receipt => {
				console.log(`(#${receipt.blockNumber})`, receipt);
				alert(price + ' KLAY를 컨트랙에 송금했습니다.');
			})
			.once('error', error => {
				console.log(error.message);
			});
		return;
	}

	createItem(itemId, price) {
		this.contract.methods
			.createRealEstate(itemId, price)
			.call()
			.then(result => {
				return result;
			});
	}

	// getWallet() {
	// 	if (this.cav.klay.accounts.wallet.length) {
	// 		return this.cav.klay.accounts.wallet[0];
	// 	}
	// }
}

export default HttpService;
