import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import ImageUploader from 'react-images-upload'

@inject('httpService')
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			price: '',
			image: [],
		}
	}

	onInputChanged = event => {
		const target = event.target
		if (target.name === 'title') {
			this.setState({
				title: target.value,
			})
		} else if (target.name === 'description') {
					this.setState({
						description: target.value,
					})
				} else if (target.name === 'price') {
							this.setState({
								price: target.value,
							})
						} else if (target.name === 'image') {
									this.setState({
										image: target.value,
									})
								}
	}

	register = () => {
		this.props.httpService
			.registerItem(
				this.state.title,
				this.state.description,
				this.state.price,
				this.state.image,
			)
			.then(response => {
				alert('매물이 등록되었습니다.')
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
									placeholder="title"
									value={this.state.title}
									onChange={this.onInputChanged}
									name="title"
								/>
							</p>
							<p>
								<input
									type="text"
									placeholder="description"
									value={this.state.description}
									onChange={this.onInputChanged}
									name="description"
								/>
							</p>
							<p>
								<input
									type="number"
									placeholder="price"
									value={this.state.price}
									onChange={this.onInputChanged}
									name="price"
								/>
							</p>
							<ImageUploader
								withIcon={true}
								buttonText="Choose images"
								onChange={this.onDrop}
								imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
								maxFileSize={5242880}
							/>
							<button onClick={this.register}>매물등록</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Register)
