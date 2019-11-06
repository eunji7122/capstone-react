import React from 'react'
import ItemBox from './ItemBox'
import { inject } from 'mobx-react'

@inject('authStore', 'httpService')
class MyItems extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			userItems: [],
		}
	}

	componentDidMount() {
		this.getPrivateKey()
		this.indexMyItems()
	}

	getPrivateKey = () => {
		this.props.httpService.getPrivateKey().then(user => {
			this.setState({
				user,
			})
		})
	}

	indexMyItems = () => {
		this.props.httpService.indexMyItems().then(userItems => {
			this.setState({
				userItems,
			})
		})
	}

	render() {
		const items = this.state.userItems.map((userItem) => {
			const item = userItem
			return <ItemBox key={item.id} item={item} />
		})
		return (
			<div id="container">
				<h1>내 아이템 목록</h1>
				<div id="item-list-container">{items}</div>
			</div>
		)
	}
}

export default MyItems
