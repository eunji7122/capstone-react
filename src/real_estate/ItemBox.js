import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'

@inject('httpService')
class ItemBox extends React.Component {
	constructor() {
		super()
		this.state = {
			owner: '',
		}
	}

	componentDidMount() {
		this.getOwner()
	}

	getOwner() {
		this.props.httpService.getItem(this.props.item.id).then(result => {
			this.setState({
				owner: result[2],
			})
		})
	}

	goToItem = () => {
		const item = this.props.item
		this.props.history.push('/items/' + item.id)
	}

	render() {
		const item = this.props.item

		return (
			<div className="item-container" onClick={this.goToItem}>
				<img src={item.image} alt="" />
				<p className="item-title">{item.title}</p>
				<p className="item-price">{item.price + ' KLAY'}</p>
				<p className="item-owner">{'집주인: ' + this.state.owner}</p>
			</div>
		)
	}
}

export default withRouter(ItemBox)
