import React from 'react';
import { Row, Col, message, Typography } from 'antd';
import axios from 'axios';
import { LoadingAction } from '../action/loading.action';
import { connect } from 'react-redux';
let NODE_URL = process.env.REACT_APP_NODE_API;
var _ = require('lodash');

const { Title, Text } = Typography;

function splitArray(data) {
	if (_.isArray(data)) {
		return data.reduce((acc, x) => acc.concat(x.name), []);
	} else {
		return Object.keys(data).reduce((acc, x) => acc.concat(data[x]), []);
	}
}

function pagesManage(data) {
	return data.map((res, index) => {
		return (
			<div className="bot_bor data" key={index}>
				<span>{res.name}</span>
				<ul>{chipListData(res.pages)}</ul>
			</div>
		);
	});
}

function chipListData(data) {
	if (_.isEmpty(data)) {
		return;
	}

	return data.map((res, index) => <li key={index}>{res}</li>);
}

function multipleKeyObj(data, [...keys]) {
	if (_.isEmpty(data)) {
		return;
	}

	return data.map(res => {
		let row = keys.map(result => {
			return res[result];
		});
		return row.join(', ');
	});
}

class DummyDataComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: {},
		};

		this.onRender = this.onRender.bind(this);
	}

	componentDidMount() {		
		this.props.LoadingAction(true);
		console.log("Here")
		axios
			.request({
				method: 'get',
				url: `${NODE_URL}/unitychain/static/facebook/fetchFacebookData/${this.props.User._id}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				crossDomain: true,
			})
			.then(row => {
				console.log("rowHere", row)
				this.props.LoadingAction(false);
				
				if (row.status == 200 && row.data.response.code == 200) {
					this.setState({ profile: row.data.response.data.profile });
				}
			});
	}

	onRender = data => {
		if (_.isEmpty(data)) {
			return;
		}

		const {
			name,
			email,
			birthday,
			gender,
			previous_names,
			pages,
			current_city,
			hometown,
			relationship,
			family_members,
			education_experiences,
			work_experiences,
			political_view,
			religious_view,
			websites,
			phone_numbers,
			about_me,
			favorite_quotes,
			profile_uri,
			groups,
		} = data;

		return (
			<div className="section">
				<Row type="flex" justify="space-between">
					<Title className="title">Facebook Data</Title>
					<div className="about_data">
						{/* {createContent(profile)} */}
						<div className="blue_cont_bx m-0 p-3">
							<Row type="flex" justify="space-between">
								<Col xl={5} md={24}>
									<div className="bot_bor data">
										<span>Name</span>
										<label>{name.full_name}</label>
									</div>
								</Col>
								<Col xl={11} md={24}>
									<div className="bot_bor data">
										<span>Email</span>

										<ul>{chipListData(splitArray(data.emails))}</ul>
									</div>
								</Col>
								<Col xl={5} md={24}>
									<div className="bot_bor data">
										<span>Birthday</span>
										<label>{`${birthday.month}/${birthday.day}/${birthday.year}`}</label>
									</div>
								</Col>
							</Row>
							<Row type="flex" justify="space-between">
								<Col xl={5} md={24}>
									<div className="bot_bor data">
										<span>Gender</span>
										<label>{gender.gender_option}</label>
									</div>
								</Col>
								<Col xl={11} md={24}>
									<div className="bot_bor data">
										<span>Previous names</span>
										<ul>{chipListData(splitArray(previous_names))}</ul>
									</div>
								</Col>
								<Col xl={5} md={24}>
									<div className="bot_bor data">
										<span>Other names</span>
										<label>-</label>
									</div>
								</Col>
							</Row>
							<Row type="flex" justify="space-between">
								<Col xl={5} md={24}>
									<div className="bot_bor data">
										<span>Current city</span>
										<label>{current_city.name}</label>
									</div>
								</Col>
								<Col xl={11} md={24}>
									<div className="bot_bor data">
										<span>Hometown</span>
										<label>{hometown.name}</label>
									</div>
								</Col>
								<Col xl={5} md={24}>
									<div className="bot_bor data">
										<span>Relationship</span>
										<label>{relationship.status}</label>
									</div>
								</Col>
							</Row>
							<Row type="flex" justify="space-between">
								<Col span={24}>
									<div className="bot_bor data">
										<span>Family Members</span>
										<ul>{chipListData(multipleKeyObj(family_members, ['name', 'relation']))}</ul>
									</div>
									<div className="bot_bor data">
										<span>Education Experience</span>
										<ul>
											{chipListData(
												multipleKeyObj(education_experiences, ['name', 'school_type'])
											)}
										</ul>
									</div>
									<div className="bot_bor data">
										<span>Work Experience</span>
										<ul>
											{chipListData(
												multipleKeyObj(work_experiences, ['employer', 'title', 'location'])
											)}
											<li>Unitychain Founder and CEO Taipei, Taiwan</li>
											<li>The Social Climax Network Founder</li>
										</ul>
									</div>
								</Col>
							</Row>
							<Row type="flex" justify="space-between">
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Political View</span>
										<ul>
											<li>{political_view.name}</li>
										</ul>
									</div>
								</Col>
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Religious View</span>
										<ul>
											<li>{religious_view.name}</li>
										</ul>
									</div>
								</Col>
							</Row>
							<Row type="flex" justify="space-between">
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Website</span>
										<ul>{chipListData(multipleKeyObj(websites, ['address']))}</ul>
									</div>
								</Col>
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Phone Number</span>
										<label>{phone_numbers[0].phone_number}</label>
									</div>
								</Col>
							</Row>
							<Row type="flex" justify="space-between">
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>About me</span>
										<label>{about_me}</label>
									</div>
								</Col>
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Favorite Quotes</span>
										<ul>{chipListData(favorite_quotes.split(' - '))}</ul>
									</div>
								</Col>
							</Row>
						</div>
						<div className="blue_cont_bx m-0 p-3">
							{/* <Row type="flex" justify="space-between">
								{pagesManage(pages)}
								<Col span={24}>
									<Text className="inr_title">Pages</Text>
								</Col>
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Activities</span>
										<ul>
											<li>Guiter</li>
											<li>Jenny Johnson, Sister</li>
										</ul>
									</div>
								</Col>
								<Col xl={10} md={24}>
									<div className="bot_bor data">
										<span>Interest</span>
										<ul>
											<li>Ecumenism</li>
											<li>Meditation</li>
										</ul>
									</div>
								</Col>
							</Row> */}
							<Row type="flex" justify="space-between">
								<Col span={24}>
									<Text className="inr_title">Pages</Text>
								</Col>
								<Col span={24}>{pagesManage(pages)}</Col>
							</Row>
						</div>
						<div className="blue_cont_bx m-0 p-3">
							<Row type="flex" justify="space-between">
								<Col span={24}>
									<Text className="inr_title">Groups</Text>
								</Col>
								<Col xl={24} md={24}>
									<div className="bot_bor data">
										{/* <span>Website</span> */}
										<ul>{chipListData(multipleKeyObj(groups, ['name']))}</ul>
									</div>
								</Col>
							</Row>
						</div>
						<Col className="p-3" xl={10} md={24}>
							<div className="bot_bor data">
								<span>Profile uri</span>
								<label>{profile_uri}</label>
							</div>
						</Col>
					</div>
				</Row>
			</div>
		);
	};

	render() {
		const { profile } = this.state;
		if(_.isEmpty(profile)) {
			return <></>;
		}
		// const { name, email } = profile
		// console.log("profile", profile)
		// console.log("profile", profile);
		return <div className="main">{this.onRender(profile)}</div>;
	}
}

const mapStateToProps = state => ({
	User: state.Auth.user
})

export default connect(
	mapStateToProps,
	{ LoadingAction }
)(DummyDataComponent);
