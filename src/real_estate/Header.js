import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../css/heroic-features.css'

@inject('httpService', 'authStore', 'history')
@observer
class Header extends React.Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		searchText: '',
	// 		categories: [],
	// 	}
	// }

	// componentDidMount() {
	// 	this.indexCategories()
	// }

	// indexCategories() {
	// 	this.props.httpService.indexCategories().then(categories => {
	// 		this.setState({
	// 			categories,
	// 		})
	// 	})
	// }

	logout = () => {
		const { authStore } = this.props
		authStore.deleteToken()
		this.props.history.push('/')
	}

	// onInputChanged = event => {
	// 	const target = event.target
	// 	if (target.name === 'search') {
	// 		this.setState({
	// 			searchText: target.value,
	// 		})
	// 	}
	// }

	// search = () => {
	// 	this.props.history.push('/tags/' + this.state.searchText)
	// }

	render() {
		const { authStore } = this.props
		// const categories = this.state.categories.map(category => {
		// 	return (
		// 		<Link key={category.id} to={'/categories/' + category.id}>
		// 			{category.title}
		// 		</Link>
		// 	)
		// })

		return (
			<div className="header-container">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					<div className="container">
						<Link className="navbar-brand" to="/">
							Klaytn 부동산 거래소
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarResponsive"
							aria-controls="navbarResponsive"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarResponsive">
							<ul className="navbar-nav ml-auto">
								<li className="nav-item active">
									<Link className="nav-link" to="/">
										Home
										<span className="sr-only">(current)</span>
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="#">
										About
									</Link>
								</li>
								<li className="nav-item">
									{authStore.isLoggedIn ? (
										<Link className="nav-link" to="/registerItem">
											Register Item
										</Link>
									) : null}
								</li>
								<li className="nav-item">
									{authStore.isLoggedIn ? (
										<Link className="nav-link" to="/me/items">
											MyItems
										</Link>
									) : (
										<Link className="nav-link" to="/register">
											Register
										</Link>
									)}
								</li>
								<li className="nav-item">
									{authStore.isLoggedIn ? (
										<Link className="nav-link" to="#" onClick={this.logout}>
											Logout
										</Link>
									) : (
										<Link className="nav-link" to="/login">
											Login
										</Link>
									)}
								</li>
							</ul>
						</div>
					</div>
				</nav>
				{/* <Link to="/">Klaytn 부동산 거래소 </Link>
				{categories}

				<div className="header-right">
					<input
						value={this.state.searchText}
						onChange={this.onInputChanged}
						type="text"
						name="search"></input>
					<button style={{ marginRight: '1em' }} onClick={this.search}>
						Search
					</button>
					<Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
					{authStore.isLoggedIn && <Link to="/me/histories">구매내역</Link>}
					{authStore.isLoggedIn ? (
						<Link to="/me/items">My Items</Link>
					) : (
						<Link to="/register">회원가입</Link>
					)}
					{authStore.isLoggedIn ? (
						<button href="#" onClick={this.logout}>
							Logout
						</button>
					) : (
						<Link to="/login">Login</Link>
					)}
				</div> */}
			</div>
		)
	}
}

export default Header
