import React from 'react'
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react'
import '../css/mainRegisterItem.css'

@inject('httpService')
class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			description: '',
			price: '',
			image: {
				'name': ''
			},
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
				image: target.files[0],
			})
		}
	}

	register = () => {
		const formData = new FormData()
		formData.append('title', this.state.title)
		formData.append('description', this.state.description)
		formData.append('price', this.state.price)
		formData.append('image', this.state.image)

		this.props.httpService.registerItem(formData).then(response => {
			alert('매물이 등록되었습니다.')
			this.props.history.push('/')
		})
	}

	render() {
		return (
			<div>
				<div className="page-wrapper p-t-100 p-b-50">
					<div className="wrapper2 wrapper--w9002">
						<div className="card2 card-6">
							<div className="card-heading">
								<h2 className="title2">Register Item</h2>
							</div>
							<div className="card-body2">
								<div className="form-row">
									<div className="name">Title</div>
									<div className="value">
										<input
											className="input--style-6"
											type="text"
											placeholder="title"
											value={this.state.title}
											onChange={this.onInputChanged}
											name="title"
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="name">Description</div>
									<div className="value">
										<div className="input-group">
											<textarea
												className="input--style-6"
												type="text"
												placeholder="description"
												value={this.state.description}
												onChange={this.onInputChanged}
												name="description"
											/>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div className="name">Price</div>
									<div className="value">
										<input
											className="input--style-6"
											type="number"
											placeholder="title"
											value={this.state.price}
											onChange={this.onInputChanged}
											name="price"
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="name">Image</div>
									<div className="value">
										<div className="input-group js-input-file">
											<input
												style={{ display: 'none' }}
												className="input-file"
												type="file"
												name="image"
												id="image_file"
												// value={this.state.image}
												onChange={this.onInputChanged}></input>
											<label className="label--file" htmlFor="image_file">
												Choose file
											</label>
											<span className="input-file__info">{this.state.image.name}</span>
										</div>
										<div className="label--desc">
											Upload your image file. Max file size 50 MB
										</div>
									</div>
								</div>
								<div className="card-footer">
									<button
										className="btn btn--radius-2 btn--blue-2"
										type="submit"
										onClick={this.register}>
										Register Item
									</button>
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
				</div> */}
			</div>
		)
	}
}

export default withRouter(Register)
