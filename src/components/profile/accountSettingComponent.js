import React from 'react';
import moment from 'moment';
import { Row, Typography, Col, Card, Button, Form, Input, Table } from 'antd';

const { Text } = Typography;

class AccountSettingComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		};
	}

	render() {
		const columns = [
			{
				title: 'Date',
				dataIndex: 'date',
				width: 150,
			},
			{
				title: 'Particulars',
				dataIndex: 'particulars',
				width: 150,
			},
			{
				title: 'Debit',
				dataIndex: 'debit',
			},
			{
				title: 'Credit',
				dataIndex: 'credit',
			},
		];

		const data2 = [];
		for (let i = 0; i < 6; i++) {
			data2.push({
				key: i,
				date: moment(new Date()).format('D MMM YYYY'),
				particulars: `Edward King ${i}`,
				debit: 32,
				credit: 70,
			});
		}
		return (
			<div className="account_setting ao r_mar slideInUp animated">
				<Row className="mt-2">
					<Col xl={10} lg={10} md={24} className="pr-5">
						<div className="blue_cont_bx social_bx">
							<Card title="Your Balance">
								<div className="balance mt-2">
									<img
										src={require('../../assests/images/euro.svg')}
										className="box_img"
										width="55"
									/>
									<span>194</span>
								</div>
								<div className="btn_group">
									<Button className="btn1">Redeem</Button>
								</div>
								<Text className="note mt-3">* 1,000 Gold minimum to redeem $10 gift card</Text>
							</Card>
						</div>
						<div className="blue_cont_bx social_bx">
							<Card title="Change Password">
								<Col xl={18} lg={18} md={24}>
									<Form.Item className="form-group px-0 mt-3">
										<Input
											type="password"
											className={this.state.oldPassword ? 'input in_fill' : 'input'}
											name="oldPassword"
											onChange={this.onChangeInput}
											autoComplete="true"
										/>
										<label>Old Password</label>
									</Form.Item>
									<Form.Item className="form-group px-0">
										<Input
											type="password"
											className={this.state.newPassword ? 'input in_fill' : 'input'}
											name="newPassword"
											onChange={this.onChangeInput}
											autoComplete="true"
										/>
										<label>New Password</label>
									</Form.Item>
									<Form.Item className="form-group px-0">
										<Input
											type="password"
											className={this.state.confirmPassword ? 'input in_fill' : 'input'}
											name="confirmPassword"
											onChange={this.onChangeInput}
											autoComplete="true"
										/>
										<label>Confirm Password</label>
									</Form.Item>
								</Col>
								<div className="btn_group">
									<Button className="btn1">UPDATE</Button>
								</div>
							</Card>
						</div>
					</Col>
					<Col xl={14} lg={14} md={24}>
						<div className="blue_cont_bx social_bx">
							<Card
								title="Token History"
								extra={
									<div>
										<a href="#" className="link op-3">
											VIEW ALL
										</a>
									</div>
								}
							>
								<Table className="table history" columns={columns} dataSource={data2} />
							</Card>
						</div>
						<div className="blue_cont_bx social_bx">
							<Card title="Social Account Recovery">
								<Text className="text2">
									Lorem ipsum dolor sit amet, consectetur spendisse fringilla accumsan{' '}
								</Text>
								<Row className="sar">
									<Col xl={14} lg={10} md={24}>
										<Form.Item className="form-group px-0">
											<Input
												type="email"
												className={this.state.emailAddress ? 'input in_fill' : 'input'}
												name="emailAddress"
												onChange={this.onChangeInput}
												autoComplete="true"
											/>
											<label>Email</label>
										</Form.Item>
									</Col>
									<Col xl={10} lg={10} md={24}>
										<div className="btn_group">
											<Button className="btn1">RESTORE ACCOUNT</Button>
										</div>
									</Col>
								</Row>
							</Card>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default AccountSettingComponent;
