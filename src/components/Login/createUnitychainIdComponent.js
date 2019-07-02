import React from 'react';
import { Typography, Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { checkAvailability, registrationUser } from '../../action/registration.action';
const { Title } = Typography;

class CreateUnitychainIdComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			confirm: '',
			userAvailibility: false,
			loading: false,
		};

		this.onSubmitRegister1 = this.onSubmitRegister1.bind(this);
		this.onSubmitRegister2 = this.onSubmitRegister2.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
	}

	onSubmitRegister1 = e => {
		e.preventDefault();
		this.setState({ userAvailibility: false });
		this.props.form.validateFields(['username'], (err, values) => {
			if (!err) {
				this.setState({ loading: true });
				this.props.checkAvailability(values.username).then(res => {
					if (res.data.status != 'error') {
						this.setState({ userAvailibility: true });
					} else {
						message.error(res.data.result, 3);
					}
					this.setState({ loading: false });
				});
			}
		});
	};

	onSubmitRegister2 = e => {
		e.preventDefault();
		this.props.form.validateFields(['email', 'password', 'confirm'], (err, values) => {
			if (!err) {
				this.setState({ loading: true });
				const { username } = this.state;
				let obj = { ...values, username };
				delete obj['confirm'];
				this.props.registrationUser(obj).then(res => {
					if(res.data.status != 'error') {
						this.props.onClick('RegistrationConfirmComponent');
						this.props.onHandleUserData(res.data.data);
					} else {
						this.setState({ loading: false });
						message.error(res.data.result, 3);
					}
					// this.setState({
					// 	username: '',
					// 	email: '',
					// 	password: '',
					// 	confirm: '',
					// 	userAvailibility: false,
					// 	loading: false,
					// });
					// this.props.onClick('LoginComponent');
				});
			}
		});
	};

	onChangeValue = e => {
		if (e.target.name == 'username') {
			this.setState({ userAvailibility: false });
		}
		this.setState({ [e.target.name]: e.target.value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;

		var digit = /^(.*[0-9]+.*)$/;
		var upper = /^(.*[A-Z]+.*)$/;
		var lower = /^(.*[a-z]+.*)$/;
		
		if (value && !digit.test(value)) {
			callback('Password must contain one digit');
		}
		
		if (value && !upper.test(value)) {
			callback('Password must contain one uppercase letter');
		}
		
		if (value && !lower.test(value)) {
			callback('Password must contain one lowercase letter');
		}
		
		if (value && value.length <= 8) {
			callback('Password must be 8 digit');
		}

		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}

		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		const { loading, userAvailibility } = this.state;

		return (
			<div className="loginPage">
				<div className="login_bx">
					<div className="login_bx_inr">
						<div className="first_part mt-5">
							<a
								href="javascript:void(0);"
								onClick={e => {
									this.setState({
										username: '',
										email: '',
										password: '',
										confirm: '',
										userAvailibility: false,
										loading: false,
									});
									this.props.onClick('LoginComponent');
								}}
								className="close"
							>
								<img src={require('../../assests/images/close.svg')} width="13" />
							</a>
							<Title level={4} className="title animated fadeIn a">
								CREATE UNITYCHAIN ID
							</Title>
							<Form className="register1">
								<Form.Item className="animated fadeIn b">
									{getFieldDecorator('username', {
										rules: [{ required: true, message: 'Please Username' }],
									})(
										<Input
											type="text"
											name="username"
											onChange={this.onChangeValue}
											placeholder="Create Username"
										/>
									)}
								</Form.Item>
								<Form.Item className="animated fadeIn b">
									<Button
										type="submit"
										className="login-button"
										onClick={this.onSubmitRegister1}
										loading={loading}
										disabled={userAvailibility}
									>
										CHECK AVAILABILITY
									</Button>
								</Form.Item>
							</Form>
						</div>
						<hr className="or animated fadeIn c" />
						{/* second_part */}
						<div className={`first_part ${!userAvailibility ? 'second_part' : ''} my-3 animated slideInUp`}>
							<Form className="register">
								<Form.Item>
									{getFieldDecorator('email', {
										rules: [
											{ type: 'email', message: 'The input is not valid E-mail!' },
											{ required: true, message: 'Please input your E-mail!' },
										],
									})(
										<Input
											type="email"
											name="email"
											disabled={!userAvailibility}
											onChange={this.onChangeValue}
											placeholder="Enter Email"
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('password', {
										rules: [
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												validator: this.validateToNextPassword,
											},
										],
									})(
										<Input
											type="password"
											name="password"
											disabled={!userAvailibility}
											onChange={this.onChangeValue}
											placeholder="Enter Password"
										/>
									)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('confirm', {
										rules: [
											{
												required: true,
												message: 'Please confirm your password!',
											},
											{
												validator: this.compareToFirstPassword,
											},
										],
									})(
										<Input
											type="password"
											name="confirm"
											disabled={!userAvailibility}
											onChange={this.onChangeValue}
											placeholder="Confirm Password"
										/>
									)}
								</Form.Item>
								<Form.Item>
									<Button
										type="submit"
										className="login-button"
										loading={loading}
										disabled={!userAvailibility}
										onClick={this.onSubmitRegister2}
									>
										REGISTER NOW
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ checkAvailability, registrationUser }
)(Form.create({ name: 'register' }, { name: 'register1' })(CreateUnitychainIdComponent));
