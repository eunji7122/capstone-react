import React from 'react'
import ItemBox from './ItemBox'
import { inject } from 'mobx-react'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../css/heroic-features.css'

@inject('httpService')
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
			user: '',
		}
	}

	componentDidMount() {
		this.indexItems()
		this.getLoginUser()
	}

	indexItems() {
		this.props.httpService.indexItems().then(items => {
			this.setState({
				items,
			})
		})
	}

	createItem = () => {
		this.props.httpService.createItem(1, 0.01 * 10000).then(result => {
			console.log(result)
		})
	}

	getItem = () => {
		this.props.httpService.getItem(1).then(result => {
			console.log(result)
		})
	}

	getLoginUser = () => {
		this.props.httpService.getMe().then(user => {
			this.setState({
				user,
			})
		})
	}

	render() {
		const user = this.state.user
		const userAddress = user.address
		console.log('user: ' + userAddress)
		const items = this.state.items.map(item => {
			return <ItemBox key={item.id} item={item} />
		})
		return (
			<div className="container">
				{/* <div className="divex">
					<button onClick={this.createItem}>CreateItem</button>
					<button onClick={this.getItem}>GetOwner</button>
				</div> */}
				<header className="jumbotron my-4">
					<h1 className="display-3">Welcome!</h1>
					<p className="lead">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam,
						eligendi, in quo sunt possimus non incidunt odit vero aliquid similique
						quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.
					</p>
					<p className="lead">
						[내 계정 주소] {userAddress}
					</p>
					<a href="#" className="btn btn-primary btn-lg">
						Detail BlockChain
					</a>
				</header>
				<div className="row text-center">{items}</div>
			</div>
		)
	}
}

export default Home
