import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import '../css/style.css'
import '../plugins/bootstrap/bootstrap.min.css'
import '../plugins/themefisher-fonts/themefisher-fonts.css'
import '../plugins/owl-carousel/owl.carousel.css'
import '../plugins/magnific-popup/magnific-popup.css'
import Modal from './SMSModal'

@inject('authStore', 'httpService')
class ItemDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			item: null,
			isPurchased: false,
			user: null,
			auth_number: '',
			isModalOpen: false,
		}
	}

	componentDidMount() {
		this.getItem()
		this.getMe()
	}

	getMe = () => {
		this.props.httpService.getMe().then(user => {
			this.setState({
				user,
			})
		})
	}

	getItem = () => {
		const itemId = this.props.match.params.itemId
		this.props.httpService.getItems(itemId).then(item => {
			this.setState({
				item,
			})
		})
	}

	purchase = () => {
		const item = this.state.item

		this.props.httpService.purchaseItem(item).then(result => {
			alert('구입을 완료했습니다.')
			console.log(result)
		})
		this.setState({
			isPurchased: true,
		})
	}

	smsToUser = () => {
		const user = this.state.user
		const user_phone = user.phone

		this.props.httpService.smsService(user_phone).then(result => {
			alert('문자를 전송하였습니다.')
		})
	}

	smsAuth = () => {
		const user = this.state.user
		const user_phone = user.phone
		const item = this.state.item
		this.setState({ isModalOpen: false })

		this.props.httpService.smsAuth(user_phone, this.state.auth_number).then(response => {
			console.log(response.result)
			if (response.result == true) {
				alert('인증에 성공하였습니다. 잠시 후 구매가 완료됩니다.')
				this.props.httpService.purchaseItem(item).then(result => {
					console.log(result)
				})
				this.setState({
					isPurchased: true,
				})
				this.props.history.push('/')
			} else {
				alert('인증에 실패하였습니다.')
			}
		})
	}

	onInputChanged = event => {
		const target = event.target
		if (target.name === 'auth_number') {
			this.setState({
				auth_number: target.value,
			})
		}
	}

	// sendToOwner = () => {
	// 	const item = this.state.item
	// 	const ownerAddress = item ? item.owner.address : ''
	// 	const ownerPrivateKey = item ? item.owner.private_key : ''
	// 	this.props.httpService.sendKlay(item.price, ownerAddress, ownerPrivateKey)
	// }

	openModal = () => {
		this.setState({ isModalOpen: true })
	}

	// closeModal = () => {

	// 	this.setState({ isModalOpen: false })
	// }

	createItem = () => {
		const item = this.state.item
		const itemId = item ? item.id : ''
		const price = item ? item.price : ''

		this.props.httpService.createItem(itemId, price * 1000).then(result => {
			console.log(result)
			alert('임대인이 등록되었습니다.')
		})
	}

	render() {
		const item = this.state.item
		const title = item ? item.title : ''
		const desc = item ? item.description : ''
		const image = item ? item.image : null
		const price = item ? item.price : ''
		const owner = item ? item.owner.username : ''

		return (
			<div>
				<div className="divex">
					<button onClick={this.createItem}>임대인등록</button>
				</div>
				<section className="section">
					<div className="container">
						<div className="row">
							<div className="col-md-6 text-center mb-5 mb-md-0">
								<img src={image} alt=""></img>
							</div>
							<div className="col-md-6 align-self-center text-center text-md-left">
								<div className="block">
									<h1 className="font-weight-bold mb-4 font-size-60">{title}</h1>
									<p className="mb-4">설명: {desc}</p>
									<p className="mb-4">집주인: {owner}</p>
									<p className="mb-4">{price} KLAY</p>
									<button className="btn2 btn-main2" onClick={this.openModal}>
										Purchase
									</button>
									<Modal
										isOpen={this.state.isModalOpen}
										close={this.smsAuth}
										onInputChanged={this.onInputChanged}
										smsToUser={this.smsToUser}></Modal>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}

export default withRouter(ItemDetail)
