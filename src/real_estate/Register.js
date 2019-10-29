import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import '../vendorLogin/bootstrap/css/bootstrap.min.css'
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../vendorLogin/animate/animate.css'
import '../vendorLogin/css-hamburgers/hamburgers.min.css'
import '../vendorLogin/select2/select2.min.css'
import img01 from '../images/img-01.png'
import '../css/util.css'
import '../css/main.css'

@inject('httpService')
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			email: '',
			phone: '',
			private_key: '',
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
		} else if (target.name === 'email') {
			this.setState({
				email: target.value,
			})
		} else if (target.name === 'phone') {
			this.setState({
				phone: target.value,
			})
		} else if (target.name === 'private_key') {
			this.setState({
				private_key: target.value,
			})
		}
	}

	register = () => {
		this.props.httpService
			.register(
				this.state.username,
				this.state.password,
				this.state.email,
				this.state.phone,
				this.state.private_key,
			)
			.then(response => {
				alert('회원가입에 성공하였습니다. 다시 로그인해 주세요.')
				this.props.history.push('/login')
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
								<span className="login100-form-title">Member Register</span>

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

								<div className="wrap-input100 validate-input">
									<input
										className="input100"
										type="text"
										placeholder="email"
										value={this.state.email}
										onChange={this.onInputChanged}
										name="email"
									/>
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<i className="fa fa-envelope" aria-hidden="true"></i>
									</span>
								</div>

								<div className="wrap-input100 validate-input">
									<input
										className="input100"
										type="text"
										placeholder="phone"
										value={this.state.phone}
										onChange={this.onInputChanged}
										name="phone"
									/>
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<i className="fa fa-phone" aria-hidden="true"></i>
									</span>
								</div>

								<div className="wrap-input100 validate-input">
									<input
										className="input100"
										type="text"
										placeholder="private key"
										value={this.state.private_key}
										onChange={this.onInputChanged}
										name="private_key"
									/>
									<span className="focus-input100"></span>
									<span className="symbol-input100">
										<i className="fa fa-key" aria-hidden="true"></i>
									</span>
								</div>

								<div className="container-login100-form-btn">
									<button className="login100-form-btn" onClick={this.register}>
										Register
									</button>
								</div>

								<div className="text-center p-t-136">
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
				{/* <div className="login-page">
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
							<p>
								<input
									type="text"
									placeholder="email"
									value={this.state.email}
									onChange={this.onInputChanged}
									name="email"
								/>
							</p>
							<p>
								<input
									type="text"
									placeholder="phone"
									value={this.state.phone}
									onChange={this.onInputChanged}
									name="phone"
								/>
							</p>
							<p>
								<input
									type="text"
									placeholder="private key"
									value={this.state.private_key}
									onChange={this.onInputChanged}
									name="private_key"
								/>
							</p>
							<button onClick={this.register}>회원가입</button>
						</div>
					</div>
				</div> */}
			</div>
		)
	}
}

export default withRouter(Register)
