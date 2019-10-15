import React from 'react'
import ItemBox from './ItemBox'
import { inject } from 'mobx-react'

@inject('httpService')
class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: [],
		}
	}

	componentDidMount() {
		this.indexItems()
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

	render() {
		const items = this.state.items.map(item => {
			return <ItemBox key={item.id} item={item} />
		})
		return (
			<div id="container">
				<button onClick={this.createItem}>CreateItem</button>
				<button onClick={this.getItem}>GetOwner</button>
				<div id="item-list-container">{items}</div>
			</div>
		)
	}
}

export default Home
