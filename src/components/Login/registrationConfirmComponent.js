import React from 'react';
import { Typography, Form, Input, Button, message,Row,Col } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const { Title } = Typography;

class RegistrationConfirmComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recoveryEmail: '',
			privateKey: this.props.data.private_key,
			copied: false,
		};

		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
	}

	onSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				
			}
		});
	};

	onChangeValue = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { did, private_key, token, username } = this.props.data
		
		return (
			<div className="loginPage">
				<div className="login_bx">
					<div className="login_bx_inr">
						<div className="first_part congra my-5">
							{/* <a href="#" className="close">
								<img src={require('../../assests/images/close.svg')} width="13" />
							</a> */}
							<Title level={3} className="title2 animated fadeIn a">
								Congratulations!
							</Title>
							<Row type="flex" justify="space-between">
								<Col xl={24} sm={24}>
									<p className="lbl_name animated fadeIn b">USERNAME</p>
									<p className="lbl_data animated fadeIn c">{username}</p>
									<p className="lbl_name animated fadeIn b">YOUR UNITYCHAIN ID</p>
									<p className="lbl_data animated fadeIn c" style={{wordBreak: 'break-word'}}>{did}</p>
								</Col>
							</Row>
							
							<a
								href="javascript:void(0);"
								onClick={e => this.props.history.push('/dashboard')}
								className="login-button animated fadeIn d"
							>
								GO TO DASHBOARD
							</a>
						</div>
						<hr className="or animated fadeIn d" />
						<div className="first_part recover my-3 animated slideInUp a">
							<Title level={4} className="title">
								Save Your Private Key
							</Title>

							<Form className="recovery_email">
								<Form.Item>
									<Input type="text" name="privateKey" value={private_key} />
									<CopyToClipboard
										text={private_key}
										type="link"
										className="login-button"
										onCopy={() => {
											this.setState({ copied: true });
											message.success(`copied successfully.`);
										}}
									>
										<Button type="link" className="login-button">
											COPY
										</Button>
									</CopyToClipboard>
								</Form.Item>
							</Form>
						</div>
						{/* <hr className="or animated fadeIn d" />
						<div className="first_part recover my-3 animated slideInUp a">
							<Title level={4} className="title">
								Enter Password Recovery Email
							</Title>
							<p className="text2">
								Neque porro quisquam estqui lorem ipsum dolorem ipsum quia dolor loremsit amet.
							</p>
							<Form className="recovery_email">
								<Form.Item>
									{getFieldDecorator('email', {
										rules: [
											{ type: 'email', message: 'The input is not valid E-mail!' },
											{ required: true, message: 'Please input your E-mail!' },
										],
									})(
										<Input
											type="email"
											name="recoveryEmail"
											onChange={this.onChangeValue}
											placeholder="Enter Email"
										/>
									)}
									<Button type="submit" className="login-button" onClick={this.onSubmit}>
										DONE
									</Button>
								</Form.Item>
							</Form>
						</div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default Form.create({ name: 'recovery_email' })(RegistrationConfirmComponent);
