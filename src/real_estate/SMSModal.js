import React from 'react'
import '../css/modal.scss'

const Modal = ({ isOpen, close, onInputChanged, smsToUser }) => {
	return (
		<React.Fragment>
			{isOpen ? (
				<React.Fragment>
					<div className="Modal-overlay" onClick={close}></div>
					<div className="Modal">
						<p className="title">SMS 본인인증</p>
                        <button className="number_submit" onClick={smsToUser}>인증번호 전송</button>
						<div className="content">
							<p>등록된 휴대폰 번호로 전송된 숫자 4자리를 입력하세요.</p>
							<input
								className="input"
								type="text"
								placeholder="인증번호를 입력하세요"
								onChange={onInputChanged}
								name="auth_number"
							/>
						</div>
						<div className="button-wrap">
							<button onClick={close}>Submit</button>
						</div>
					</div>
				</React.Fragment>
			) : null}
		</React.Fragment>
	)
}
export default Modal
