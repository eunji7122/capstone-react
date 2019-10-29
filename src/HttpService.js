import axios from 'axios'
import { reaction } from 'mobx'
import Caver from 'caver-js'
import ContractAddress from './deployedAddress.json'
import ContractABI from './deployedABI.json'

class HttpService {
	constructor(rootStore) {
		this.rootStore = rootStore
		this.authStore = rootStore.authStore

		this.cav = new Caver('https://api.baobab.klaytn.net:8651')
		this.contract = new this.cav.klay.Contract(ContractABI, ContractAddress.address)

		this.clientID = 'Lrisd2wLpebx5ITLwBGYrVzHNTSbcUYeMVYNRyue'
		this.refreshSubscribers = []
		this.isRefreshingToken = false

		axios.defaults.baseURL = 'http://localhost:8000'
		axios.defaults.headers.common['Authorization'] = this.authStore.authToken

		reaction(
			() => this.authStore.authToken,
			() => {
				axios.defaults.headers.common['Authorization'] = this.authStore.authToken
			},
		)

		const walletFromSession = sessionStorage.getItem('walletInstance')
		if (walletFromSession) {
			this.cav.klay.accounts.wallet.add(JSON.parse(walletFromSession))
			console.log('내 계정 주소: ' + walletFromSession)
			console.log('Contract 주소: ' + ContractAddress.address)
		}
	}

	getMe() {
		return axios.get('/me/privateKey/').then(response => {
			return response.data
		})
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
				const token = response.data
				this.authStore.setToken(token)
				return token
			})
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
				return response.data
			})
	}

	indexItems() {
		return axios.get('/items/').then(response => {
			return response.data
		})
	}

	getItems(itemId) {
		return axios.get('/items/' + itemId + '/').then(response => {
			return response.data
		})
	}

	purchaseItem(item) {
		const loginAddress = JSON.parse(sessionStorage.getItem('walletInstance'))
		return this.contract.methods.buyRealEstate(item.id).send(
			{
				from: loginAddress.address,
				gas: '250000',
				value: this.cav.utils.toPeb(item.price, 'KLAY'),
			},
			(err, res) => {
				console.log(err)
				console.log(res)
			},
		)
	}

	sendKlay(price, owner, ownerPrivateKey) {
		const cav = new Caver('https://api.baobab.klaytn.net:8651')
		console.log('집주인 privatekey: ' + ownerPrivateKey)
		console.log('집주인 address: ' + owner)

		console.log('owner 주소: ' + owner)
		console.log('컨트랙 주소: ' + ContractAddress.address)

		// const senderTransaction = {
		// 	type: 'VALUE_TRANSFER',
		// 	from: ContractAddress.address,
		// 	to: owner,
		// 	gas: '250000',
		// 	value: cav.utils.toPeb(price, 'KLAY'),
		// }

		// cav.klay
		// 	.sendTransaction(senderTransaction)
		// 	.on('transactionHash', txHash => {
		// 		console.log(`txHash: ${txHash}`)
		// 	})
		// 	.on('receipt', receipt => {
		// 		console.log(`(#${receipt.blockNumber})`, receipt)
		// 		alert(price + ' KLAY를' + owner + '에게 송금했습니다.')
		// 	})
		// 	.on('error', error => {
		// 		console.log(error.message)
		// 	})

		this.contract.methods
			.transfer(cav.utils.toPeb(price, 'KLAY'), owner)
			.send({
				from: owner,
				gas: '250000',
			})
			.then(function(receipt) {
				if (receipt.status) {
					alert(price + 'KLAY가 [' + owner + '] 계정으로 지급되었습니다.')
				}
			})

		return
	}

	createItem(itemId, price) {
		const loginAddress = JSON.parse(sessionStorage.getItem('walletInstance'))
		return this.contract.methods.createRealEstate(itemId, price).send({
			from: loginAddress.address,
			gas: '250000',
		})
	}

	getItem(itemId) {
		return this.contract.methods.getItem(itemId).call()
	}

	indexMyItems() {
		return axios.get('/me/items/').then(response => {
			return response.data
		})
	}

	registerItem(formData) {
		return axios
			.post('/items/', formData, {
				headers: {
      				'Content-Type': 'multipart/form-data'
			}})
			.then(response => {
				return response.data
			})
	}
}

export default HttpService
