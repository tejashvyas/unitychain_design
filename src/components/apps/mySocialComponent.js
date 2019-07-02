import React from 'react';
import { Layout, Button, Input, Tabs, Icon, Popover, message } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { AllPostComponent, CreatePostComponent, AddSocialAccount } from './mySocial';
import { authManage, getSocialFeed } from '../../action/mySocialAction/allPostAction';
import { LoadingAction } from '../../action/loading.action';
import { facebookWithAuth, instagramWithAuth } from '../../action/auth.action';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import InstagramLogin from 'react-instagram-login';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { configConsumerProps } from 'antd/lib/config-provider';
import config from '../../config';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const toTitleCase = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();

class MySocialComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			facebook: [],
			instagram: [],
			active: 'facebook',
			socialAuth: {},
		};

		this.onClickToFeed = this.onClickToFeed.bind(this);
	}

	async componentDidMount() {		
		this.props.LoadingAction(true);
		const result = await this.props.getSocialFeed(this.state.active, this.props.User._id);
		if (result.data.status && result.data.response.code == 200) {
			const { data, paging, error } = result.data.response.data;
			this.props.LoadingAction(false);			
			if (error) {
				console.log('Error');
			} else {
				Object.keys(this.state).map(res => {
					if (res != 'active' && res != 'socialAuth') {
						this.setState({ [res]: [] });
					}
				});
				if (localStorage.feed == undefined) {
					localStorage.feed = null;
				}
				let obj = {};
				if (localStorage.feed) {
					obj = JSON.parse(localStorage.feed);
				}
				localStorage.feed = JSON.stringify({ ...obj, [this.state.active]: data });
				this.setState({ [this.state.active]: data });
			}
		}
		if (localStorage.user) {
			const { auth } = JSON.parse(localStorage.user);
			this.setState({ socialAuth: auth });
		}
		this.props.LoadingAction(false);
	}

	onClickToFeed = async status => {
		this.props.LoadingAction(true);

		// if (this.state.socialAuth[status] == false) {
		// 	message.error(`You have to first map ${status}`, 3);
		// 	this.props.LoadingAction(false);
		// 	return;
		// }
		
		const result = await this.props.getSocialFeed(status, this.props.User._id);
		this.props.LoadingAction(false);

		if (result.data.status) {
			if (result.data.response.code != 200) {
				// message.error(error.message, 3);
				Object.keys(this.state).map(res => {
					if (res != 'active' && res != 'socialAuth') {
						this.setState({ [res]: [] });
					}
				});
				this.setState({ [status]: [], active: status });
			} else {
				const { data, paging, error } = result.data.response.data;
				Object.keys(this.state).map(res => {
					if (res != 'active' && res != 'socialAuth') {
						this.setState({ [res]: [] });
					}
				});

				if (localStorage.feed == undefined) {
					localStorage.feed = null;
				}

				let obj = {};
				if (localStorage.feed) {
					obj = JSON.parse(localStorage.feed);
				}

				localStorage.feed = JSON.stringify({ ...obj, [status]: data });

				this.setState({ [status]: data, active: status });
			}
		} else {

		}
	};
	
	onClickToTwitterAuth = (e) => {
		e.preventDefault();
		axios.request({
			method: 'post',
			url: `https://api.twitter.com/oauth/request_token`,
			data: {
				oauth_callback: 'http://localhost:3000/app/my-social/twitter-callback',
				consumer_key: config.twitter.consumer_key,
				consumer_secret: config.twitter.consumer_secret_key
			},
			'Content-Type': 'application/x-www-form-urlencoded',
			crossDomain: true,
		}).then((res) => console.log("res", res));
	}

	render() {

		const { facebook, instagram, twitter } = !_.isEmpty(this.state.socialAuth) ? this.state.socialAuth : {};		
		return (
			<div className="mysocial slideInUp animated mt-3 social_identy">
				<div className="first_part py-2 animated fadeIn f">
					<ul className="social">
						<li>
							{facebook != undefined && !facebook && (
								<FacebookLogin
									appId={config.facebook.app_id}
									callback={e => {
										this.props.LoadingAction(true);
										this.props.facebookWithAuth(e, 'facebook').then(res => {
											if (res.data.status) {
												if (res.data.response.code == 200) {
													this.setState({
														socialAuth: { ...this.state.socialAuth, facebook: true },
													});
													
													this.onClickToFeed('facebook');
													message.success(res.data.response.message, 3);
												} else {
													message.error(res.data.response.message, 3);
												}
											} else {
												message.error(res.data.error.message, 3);
											}
											this.props.LoadingAction(false);
										});
									}}
									render={renderProps => (
										<a href="javascript:void(0);" onClick={renderProps.onClick}>
											<img src={require('../../assests/images/facebook-big.svg')} width="40" />
										</a>
									)}
								/>
							)}
						</li>
						<li>
							<a href="javascript:void(0);" onClick={this.onClickToTwitterAuth}>Twitter</a>
						</li>
						<li>
							{instagram != undefined && !instagram && (
								<InstagramLogin
									clientId={config.instagram.client_id}
									buttonText={
										<img src={require('../../assests/images/instagram-big.svg')} width="40" />
									}
									onSuccess={async (r, e) => {
										var data = new FormData();
										data.append('client_id', config.instagram.client_id);
										data.append('client_secret', config.instagram.client_secret);
										data.append('redirect_uri', config.instagram.redirect_uri);
										data.append('grant_type', 'authorization_code');
										data.append('code', r);

										this.props.LoadingAction(true);
										this.props.instagramWithAuth(data, 'instagram').then(res => {
											if (res.data.status) {
												if (res.data.response.code == 200) {
													this.setState({
														socialAuth: { ...this.state.socialAuth, instagram: true },
													});
													this.onClickToFeed('instagram');
													message.success(res.data.response.message, 3);
												} else {
													message.error(res.data.response.message, 3);
												}
											} else {
												message.error(res.data.error.message, 3);
											}
											this.props.LoadingAction(false);
										});
									}}
									onFailure={e => {
										console.log('esss', e);
									}}
								/>
							)}
						</li>
					</ul>
				</div>
				<Layout className="social_dashboard">
					<Sider>
						<Button className="btn1 mt-3">ADD A SOCIAL ACCOUNT</Button>

						<Input placeholder="Type to find contact" className="search_con" />
						<div className="contact_list">
							<ul>
								<li className={this.state.active == 'facebook' ? 'active' : ''}>
									<a href="javascript:void(0);" onClick={e => this.onClickToFeed('facebook')}>
										<div>
											<img
												src={require('../../assests/images/user/user.png')}
												width="44"
												className="user_img"
											/>
											<img
												src={require('../../assests/images/facebook-small.svg')}
												className="social_icon"
												width="14"
											/>
										</div>
										<span>
											{this.props.User.username ? toTitleCase(this.props.User.username) : ''}
										</span>
									</a>
								</li>
								<li className={this.state.active == 'instagram' ? 'active' : ''}>
									<a href="javascript:void(0);" onClick={e => this.onClickToFeed('instagram')}>
										<div>
											<img
												src={require('../../assests/images/user/user.png')}
												width="44"
												className="user_img"
											/>
											<img
												src={require('../../assests/images/instagram-small.svg')}
												className="social_icon"
												width="14"
											/>
										</div>
										<span>
											{this.props.User.username ? toTitleCase(this.props.User.username) : ''}
										</span>
									</a>
								</li>
								{/* <li className={this.state.active == 'twitter' ? 'active' : ''}>
									<a href="javascript:void(0);" onClick={e => this.onClickToFeed('twitter')}>
										<div>
											<img
												src={require('../../assests/images/user/user.png')}
												width="44"
												className="user_img"
											/>
											<img
												src={require('../../assests/images/twitter-small.svg')}
												className="social_icon"
												width="14"
											/>
										</div>
										<span>Anthony Pasiens</span>
									</a>
								</li> */}
								{/* <li className={this.state.active == 'facebook'?'active':''}>
									<a href="#">
										<div>
											<img
												src={require('../../assests/images/user/user.png')}
												width="44"
												className="user_img"
											/>
											<img
												src={require('../../assests/images/google-plus-small.svg')}
												className="social_icon"
												width="14"
											/>
										</div>
										<span>Anthony Pasiens</span>
									</a>
								</li>
								<li>
									<a href="#">
										<div>
											<img
												src={require('../../assests/images/user/user.png')}
												width="44"
												className="user_img"
											/>
											<img
												src={require('../../assests/images/instagram-small.svg')}
												className="social_icon"
												width="14"
											/>
										</div>
										<span>Anthony Pasiens</span>
									</a>
								</li>
								<li>
									<a href="#">
										<div>
											<img
												src={require('../../assests/images/user/user.png')}
												width="44"
												className="user_img"
											/>
											<img
												src={require('../../assests/images/linkedin-small.svg')}
												className="social_icon"
												width="14"
											/>
										</div>
										<span>Anthony Pasiens</span>
									</a>
								</li> */}
							</ul>
						</div>
					</Sider>
					<Content>
						<Tabs defaultActiveKey="1">
							<TabPane tab="All Post" key="1">
								
								<AllPostComponent data={this.state} />
							</TabPane>
							<TabPane tab="My Post" key="2">
								Content of Tab Pane 2
							</TabPane>
							<TabPane tab="Create Post" key="3">
								<CreatePostComponent />
							</TabPane>
							<TabPane tab="Sent Post" key="4">
								Content of Tab Pane 4
							</TabPane>
						</Tabs>
						{/* <AddSocialAccount /> */}
					</Content>
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	User: state.Auth.user,
});

export default connect(
	mapStateToProps,
	{ authManage, getSocialFeed, facebookWithAuth, instagramWithAuth, LoadingAction }
)(MySocialComponent);
