import React from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { loginUser } from '../../action/auth.action';

const { Title } = Typography;

class LoginComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			loading: false,
		};

		this.onSubmitLogin = this.onSubmitLogin.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
	}

	onSubmitLogin = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ loading: true });
				this.props
					.loginUser(values)
					.then(res => {
						if (res.data.status == 'error') {
							message.error(res.data.result, 3);
						} else {
							this.props.history.push('/dashboard');
						}
						this.setState({ loading: false });
					})
					.catch(e => {
						this.setState({ loading: false });
					});
			}
		});
	};

	onChangeValue = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="loginPage">
				<div className="login_bx">
					<div className="login_bx_inr">
						<div className="first_part mt-5">
							{/* <a href="#" className="close">
								<img src={require('../../assests/images/close.svg')} width="13" />
							</a> */}
							<img src={require('../../assests/images/logo.svg')} className="logo_login"  width="200px"/>
							<Title level={4} className="title animated fadeIn a">
								LOGIN NOW
							</Title>
							<Form className="login-form" onSubmit={this.onSubmitLogin}>
								<Form.Item className="animated fadeIn b">
									{getFieldDecorator('username', {
										rules: [
											// { type: 'email', message: 'The input is not valid E-mail!' },
											{ required: true, message: 'Please enter username' },
										],
									})(
										<Input
											type="text"
											name="username"
											onChange={this.onChangeValue}
											placeholder="Enter Username"
										/>
									)}
								</Form.Item>
								<Form.Item className="animated fadeIn c">
									{getFieldDecorator('password', {
										rules: [{ required: true, message: 'Please input your Password!' }],
									})(
										<Input
											type="password"
											name="password"
											onChange={this.onChangeValue}
											placeholder="Enter Password"
										/>
									)}
								</Form.Item>
								<Form.Item className="animated fadeIn d">
									<Button
										type="submit"
										className="login-button"
										onClick={this.onSubmitLogin}
										loading={this.state.loading}
									>
										LOGIN NOW
									</Button>
								</Form.Item>
								<Form.Item>
									<a
										className="forgot animated fadeIn e"
										href="javascript:void(0);"
										// onClick={(e) => this.props.onClick('ForgotPasswordComponent')}
									>
										Forgot Password?
									</a>
									<a
										className="title register_link mt-3 animated fadeIn f"
										href="javascript:void(0);"
										onClick={e => this.props.onClick('CreateUnitychainIdComponent')}
									>
										CREATE NEW ACCOUNT
									</a>
									
								</Form.Item>
							</Form>
						</div>
						{/* <hr className="or animated fadeIn f or_after" /> */}
						{/* <div className="first_part my-5 animated fadeIn f"> */}
							{/* <ul className="social">
								<li>
									<a href="javascript:void(0);">
										<img src={require('../../assests/images/facebook-big.svg')} width="40" />
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										<img src={require('../../assests/images/twitter-big.svg')} width="40" />
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										<img src={require('../../assests/images/linkedin-big.svg')} width="40" />
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										<img src={require('../../assests/images/google-plus-big.svg')} width="40" />
									</a>
								</li>
								<li>
									<a href="javascript:void(0);">
										<img src={require('../../assests/images/instagram-big.svg')} width="40" />
									</a>
								</li>
							</ul> */}
							
						{/* </div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ loginUser }
)(Form.create({ name: 'normal_login' })(LoginComponent));
