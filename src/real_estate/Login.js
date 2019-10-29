import React from 'react'
import { inject } from 'mobx-react'
import '../vendorLogin/bootstrap/css/bootstrap.min.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../vendorLogin/animate/animate.css'
import '../vendorLogin/css-hamburgers/hamburgers.min.css'
import '../vendorLogin/select2/select2.min.css'
import img01 from '../images/img-01.png'
import '../css/util.css'
import '../css/main.css'

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
			this.props.httpService.getMe().then(me => {
				this.props.authStore.setPrivateKey(me.private_key)
			})
		})
	}

	render() {
		return (
			<div>
				<div className="limiter">
					<div className="container-login100">
						<div className="wrap-login100">
							<div className="login100-pic js-tilt" data-tilt>
								<img src={img01} alt={'img01'} />
							</div>
							<div className="login100-form validate-form">
								<span className="login100-form-title">Member Login</span>

								<div className="wrap-input100 validate-input">
									<input
										className="input100"
										type="text"
										placeholder="username"
										value={this.state.username}
										onChange={this.onInputChanged}
										name="username"
									/>
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<i className="fa fa-user" aria-hidden="true"></i>
									</span>
								</div>
								<div
									className="wrap-input100 validate-input"
									data-validate="Password is required">
									<input
										className="input100"
										type="password"
										placeholder="password"
										value={this.state.password}
										onChange={this.onInputChanged}
										name="password"
									/>
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<i className="fa fa-lock" aria-hidden="true"></i>
									</span>
								</div>

								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.login}>
										Login
									</button>
								</div>

								<div className="text-center p-t-12">
									<span className="txt1">Forgot </span>
									<a className="txt2" href="#">
										Username / Password?
									</a>
								</div>

								<div className="text-center p-t-136">
									<a className="txt2" href="/register">
										Create your Account
										<i
											className="fa fa-long-arrow-right m-l-5"
											aria-hidden="true"></i>
									</a>
									<br></br>
									<a className="txt2" href="https://baobab.wallet.klaytn.com/">
										Create Klaytn Wallet
										<i
											className="fa fa-long-arrow-right m-l-5"
											aria-hidden="true"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login
