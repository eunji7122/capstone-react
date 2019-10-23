import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import { Link } from 'react-router-dom'
// import '../vendor/bootstrap/css/bootstrap.min.css'
import '../css/heroic-features.css'

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
			<div className="col-lg-3 col-md-6 mb-4">
				<div className="card h-100">
					<img className="card-img-top" src={item.image} alt="" />
					<div className="card-body">
						<h4 className="card-title">{item.title}</h4>
						<p className="card-text">{item.price + ' KLAY'}</p>
						<p className="card-text">{'집주인: ' + this.state.owner}</p>
					</div>
					<div className="card-footer" onClick={this.goToItem}>
						<Link className="btn btn-primary" to="#">
							Purchase
						</Link>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(ItemBox)
