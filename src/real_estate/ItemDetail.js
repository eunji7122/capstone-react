import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import '../css/style.css'
import '../plugins/bootstrap/bootstrap.min.css'
import '../plugins/themefisher-fonts/themefisher-fonts.css'
import '../plugins/owl-carousel/owl.carousel.css'
import '../plugins/magnific-popup/magnific-popup.css'

@inject('authStore', 'httpService')
class ItemDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			item: null,
			isPurchased: false,
		}
	}

	componentDidMount() {
		this.getItem()
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
		this.props.httpService.purchaseItem(item).then(result => console.log(result))
		this.setState({
			isPurchased: true,
		})
	}

	sendToOwner = () => {
		const item = this.state.item
		const ownerAddress = item ? item.owner.address : ''
		const ownerPrivateKey = item ? item.owner.private_key : ''
		this.props.httpService.sendKlay(item.price, ownerAddress, ownerPrivateKey)
	}

	// addToCart = () => {
	// 	const { itemStore } = this.props;
	// 	const item = this.state.item;
	// 	itemStore.addItemToCart(item);
	// };

	render() {
		const item = this.state.item
		const title = item ? item.title : ''
		const desc = item ? item.description : ''
		const image = item ? item.image : null
		const price = item ? item.price : ''
		const owner = item ? item.owner.username : ''

		return (
			<div>
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
									<button className="btn2 btn-main2" onClick={this.purchase}>
										Purchase
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* <div className="item-image-container">
					<img src={image} alt="" />
				</div>
				<div className="item-detail-container">
					<p>
						<b>{title}</b>
					</p>
					<p>설명: {desc}</p>
					<p>집주인: {owner}</p>
					<p>{price} KLAY</p>
					{this.state.isPurchased ? (
						<strong>매입 중</strong>
					) : (
						<button onClick={this.purchase}>구입</button>
					)}
					<button onClick={this.sendToOwner}>입금</button>
				</div> */}
			</div>
		)
	}
}

export default withRouter(ItemDetail)
