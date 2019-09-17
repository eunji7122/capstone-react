import React from 'react'
import { inject } from 'mobx-react'
import '../login.css'

@inject('authStore', 'httpService', 'history')
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
		}
	}

	onInputChanged = event => {
		const target = event.target
		if (target.name === 'username') {
			this.setState({
				username: target.value,
			})
		} else if (target.name === 'password') {
			this.setState({
				password: target.value,
			})
		}
	}

	login = () => {
		this.props.httpService.login(this.state.username, this.state.password).then(token => {
			this.props.history.push('/')
		})
	}

	render() {
		return (
			<div>
				<div className="login-page">
					<div className="form">
						<div className="login-form">
							<p>
								<input
									type="text"
									placeholder="username"
									value={this.state.username}
									onChange={this.onInputChanged}
									name="username"
								/>
							</p>
							<p>
								<input
									type="password"
									placeholder="password"
									value={this.state.password}
									onChange={this.onInputChanged}
									name="password"
								/>
							</p>
							<button onClick={this.login}>로그인</button>
							<p className="message">
								Not registered? <a href="/register">Create an account</a>
							</p>
							<p className="message">
								<a href="https://baobab.wallet.klaytn.com/">Klaytn Wallet</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
