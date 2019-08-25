import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject } from 'mobx-react';

@inject('httpService')
class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			phone: '',
			private_key: '',
		};
	}

	onInputChanged = event => {
		const target = event.target;
		if (target.name === 'username') {
			this.setState({
				username: target.value,
			});
		} else if (target.name === 'password') {
			this.setState({
				password: target.value,
			});
		} else if (target.name === 'email') {
			this.setState({
				email: target.value,
			});
		} else if (target.name === 'phone') {
			this.setState({
				phone: target.value,
			});
		} else if (target.name === 'private_key') {
			this.setState({
				private_key: target.value,
			});
		}
	};

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
				const { history } = this.props;
				alert('회원가입에 성공하였습니다. 다시 로그인해 주세요.');
				history.push('/login');
			});
	};

	render() {
		return (
			<div>
				<div id="container">
					<p>
						<label>아이디: </label>
						<input
							type="text"
							value={this.state.username}
							onChange={this.onInputChanged}
							name="username"
						/>
					</p>
					<p>
						<label>비밀번호: </label>
						<input
							type="password"
							value={this.state.password}
							onChange={this.onInputChanged}
							name="password"
						/>
					</p>
					<p>
						<label>이메일: </label>
						<input
							type="text"
							value={this.state.email}
							onChange={this.onInputChanged}
							name="email"
						/>
					</p>
					<p>
						<label>폰번호: </label>
						<input
							type="text"
							value={this.state.phone}
							onChange={this.onInputChanged}
							name="phone"
						/>
					</p>
					<p>
						<label>비밀키: </label>
						<input
							type="text"
							value={this.state.private_key}
							onChange={this.onInputChanged}
							name="private_key"
						/>
					</p>
					<button onClick={this.register}>회원가입</button>
				</div>
			</div>
		);
	}
}

export default withRouter(Register);
