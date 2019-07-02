import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as Ant from 'antd';
import DefaultHeader from './DefaultHeader';
import DefaultSidebar from './DefaultSidebar';
import DefaultMobileDrawer from './DefaultMobileDrawer';
import { Layout, Affix } from 'antd';
import Media from 'react-media';
import routes from '../../routes';
import nav from '../../nav';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { ChangeOsDesign } from '../../action/os.action';
import { ChangeTogleUrl } from '../../action/auth.action';
import OSCOMPONENT from '../../components/os.component';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

const { Content } = Layout;

class DefaultLayout extends React.Component {
	constructor(props) {
		super(props);
		const { pathname } = this.props.history.location;
		const currentRoute = routes.find(res => res.path === pathname);

		this.state = {
			collapsed: false,
			currentRoute: currentRoute,
			mobileDrawer: false,
			os: {
				minimize: [],
				openSmall: [],
				openFull: null,
			},
			slide: false,
			osMode: false,
			loading: true
		};

		this.onClickDrawer = this.onClickDrawer.bind(this);
		this.onClickToredirect = this.onClickToredirect.bind(this);
		this.onClickToMobileDrawer = this.onClickToMobileDrawer.bind(this);
		this.onClickOs = this.onClickOs.bind(this);
		this.onChangeOsMode = this.onChangeOsMode.bind(this);
	}

	componentDidMount() {
		const { osDesign } = this.props;
		this.setState({loading: false})
		// if (!osDesign) {
		// 	this.refs.content_area.addEventListener('scroll', () => {
		// 		if (
		// 			this.refs.content_area.scrollTop + this.refs.content_area.clientHeight >=
		// 			this.refs.content_area.scrollHeight
		// 		) {
		// 			let index = nav.findIndex(result => result.path == this.state.currentRoute.path);
		// 			if (nav[index + 1]) {
		// 				this.onClickToredirect(nav[index + 1]);
		// 			} else {
		// 				this.onClickToredirect(nav[index - 1]);
		// 			}
		// 		}
		// 	});
		// }
	}

	componentDidUpdate() {
		const { osDesign } = this.props;

		// if (!osDesign) {
		// 	this.refs.content_area.addEventListener('scroll', () => {
		// 		if (
		// 			this.refs.content_area.scrollTop + this.refs.content_area.clientHeight >=
		// 			this.refs.content_area.scrollHeight
		// 		) {
		// 			let index = nav.findIndex(result => result.path == this.state.currentRoute.path);
		// 			if (nav[index + 1]) {
		// 				this.onClickToredirect(nav[index + 1]);
		// 			} else {
		// 				this.onClickToredirect(nav[index - 1]);
		// 			}
		// 		}
		// 	});
		// }
	}

	// When props update than it will call
	static getDerivedStateFromProps(nextProps, state) {
		const { toggle, osDesign, Loader } = nextProps;
		const { pathname } = nextProps.history.location;
		const currentRoute = routes.find(res => res.path === pathname);
		return {
			slide: toggle,
			currentRoute,
			osMode: osDesign,
			loading: Loader
		};
	}

	onChangeOsMode = status => {
		this.props.ChangeOsDesign(!status);
		this.props.history.push('/');
	};

	// Drawer toggle
	onClickDrawer(collapsed) {
		this.setState({ collapsed });
	}

	// Menu click to redirect that page
	onClickToredirect(pathName) {
		this.setState({ mobileDrawer: false });
		let { openSmall, openFull, minimize } = this.state.os;
		const { path, name, icon } = pathName;

		const { osDesign } = this.props;
		if (osDesign) {
			let url = window.location.origin;
			let pathN = `${url}/#${path == '/' ? 'dashboard' : path}`;

			let objOpenSmall = {
				url: pathN,
				icon: icon,
				name: name,
				class: '',
				fullscreen: false,
				zindex: true,
				none: false,
			};

			let objminimize = { url: pathN, icon: icon, name: name, class: '', open: false };
			let index = openSmall.findIndex(res => res.name == objOpenSmall.name);
			openSmall = openSmall.map(res => ({ ...res, fullscreen: false, zindex: false }));

			if (index == -1) {
				openSmall.push(objOpenSmall);
				minimize.push(objminimize);
			} else {
				openSmall[index].zindex = true;
				openSmall[index].none = false;
				minimize[index].open = false;
			}

			this.state.os = {
				openSmall,
				minimize,
			};

			this.setState({ os: this.state.os });
			// this.onClickOs('ADD_TO_LINK', pathName);
		} else {
			this.refs.content_area.scroll(0, 0);
			let index = nav.findIndex(result => result.path == this.state.currentRoute.path);
			let index1 = nav.findIndex(result => result.path == pathName.path);
			if (index > index1) {
				this.props.ChangeTogleUrl(false);
			} else {
				this.props.ChangeTogleUrl(true);
			}
			if (path) {
				this.props.history.push(path);
			} else {
				this.props.history.push(pathName);
			}
		}
	}

	// Mobile drawer toggle
	onClickToMobileDrawer(mobileDrawer) {
		this.setState({ mobileDrawer });
	}

	onClickOs = (type, data) => {
		let { openSmall, openFull, minimize } = this.state.os,
			index;
		switch (type) {
			case 'ADD_TO_ZINDEX':
				index = openSmall.findIndex(res => res == data);
				openSmall = openSmall.map(res => ({ ...res, fullscreen: false, zindex: false }));

				if (openSmall.length > 0) {
					openSmall[index].fullscreen = false;
					openSmall[index].zindex = true;
				}
				break;
			case 'SMALL_TO_FULL':
				index = openSmall.findIndex(res => res == data);
				openSmall = openSmall.map(res => ({ ...res, fullscreen: false, zindex: false }));
				if (openSmall.length > 0) {
					openSmall[index].fullscreen = true;
					openSmall[index].zindex = true;
				}
				break;
			case 'FULL_TO_SMALL':
				index = openSmall.findIndex(res => res == data);
				openSmall = openSmall.map(res => ({ ...res, fullscreen: false, zindex: false }));
				if (openSmall.length > 0) {
					openSmall[index].fullscreen = false;
					openSmall[index].zindex = true;
				}
				break;
			case 'TO_MINIMIZE':
				index = openSmall.findIndex(res => res == data);
				let indexMinimize = minimize.findIndex(res => res.name == data.name);
				if (openSmall.length > 0) {
					openSmall[index].fullscreen = false;
					openSmall[index].zindex = false;
					openSmall[index].none = true;
					minimize[indexMinimize].open = true;
					let fulscreen = openSmall.findIndex(res => res.fullscreen == true);
					let small = openSmall.findIndex(res => res.none == false);
					if (fulscreen == -1 && small != -1) {
						openSmall[small].zindex = true;
					}
				}

				break;
			case 'TO_OPEN':
				index = openSmall.findIndex(res => res == data);
				let fulscreen = openSmall.findIndex(res => res.fullscreen == true);
				indexMinimize = minimize.findIndex(res => res.name == data.name);

				if (openSmall.length > 0 && fulscreen == -1) {
					openSmall = openSmall.map(res => ({ ...res, zindex: false }));
					openSmall[indexMinimize].fullscreen = true;
					openSmall[indexMinimize].zindex = true;
					openSmall[indexMinimize].none = false;
					minimize[indexMinimize].open = false;
				} else if (openSmall.length > 0 && fulscreen != -1) {
					openSmall = openSmall.map(res => ({ ...res, zindex: false, fullscreen: false }));
					openSmall[indexMinimize].fullscreen = true;
					openSmall[indexMinimize].zindex = true;
					openSmall[indexMinimize].none = false;
					minimize[indexMinimize].open = false;
				}

				break;
			case 'TO_REMOVE':
				indexMinimize = minimize.findIndex(res => res.name == data.name);
				openSmall = openSmall.map(res => ({ ...res, zindex: false, fullscreen: false }));
				openSmall[indexMinimize].none = true;
				fulscreen = openSmall.findIndex(res => res.fullscreen == true);
				let small = openSmall.findIndex(res => res.none == false);
				if (fulscreen == -1 && small != -1) {
					openSmall[small].zindex = true;
				}
			// break;
		}

		this.setState({ os: { openSmall, minimize } });
	};

	render() {
		const { currentRoute, os, slide, osMode } = this.state;
		const { pathname } = this.props.history.location;

		// osMode?require('../../assests/css/osMode.css'):require('../../assests/css/sliderMode.css');

		return (
			<LoadingOverlay active={this.state.loading} spinner={<BounceLoader color={'rgba(195, 102, 231, 1)'} />}>
				<div className={!osMode ? '' : 'osModeOn'}>
					{!osMode && (
						<div className="bg">
							{/* {currentRoute.path == '/' && ( */}
							<Layout>
								{/* Start mobile drawer */}
								{pathname != '/' && (
									<Media query="(max-width: 1199px)">
										<DefaultMobileDrawer
											currentRoute={currentRoute}
											onClickMobileDrawer={this.onClickToMobileDrawer}
											mobileDrawer={this.state.mobileDrawer}
											onClick={this.onClickToredirect}
										/>
									</Media>
								)}
								{/* End mobile drawer */}

								{/* Start web drawer */}
								{pathname != '/' && (
									<Media query="(min-width: 1200px)">
										<DefaultSidebar
											currentRoute={currentRoute}
											collapsed={this.state.collapsed}
											onClick={this.onClickToredirect}
											onClickDrawer={this.onClickDrawer}
										/>
									</Media>
								)}
								{/* End web drawer */}

								{pathname == '/' && (
									<Switch>
										{/* render={props => <route.component {...props} />} */}
										{routes.map((route, index) => {
											return route.component ? (
												<Route
													key={index}
													className={`${
														!this.state.slide
															? 'slideInDown animated'
															: 'slideInUp animated'
													}`}
													path={route.path}
													exact={route.exact}
													name={route.name}
													component={route.component}
												/>
											) : null;
										})}
										<Redirect to="/" />
									</Switch>
								)}

								{pathname != '/' && (
									<Layout>
										{/* Start Header content */}
										<DefaultHeader
											onClick={this.onClickDrawer}
											onClickMobileDrawer={this.onClickToMobileDrawer}
											collapsed={this.state.collapsed}
											history={this.props.history}
										/>
										{/* End Header content */}

										{/* Start body content */}

										<div className="contentBgImage" />
										<div className="content_area" ref="content_area">
											{pathname != '/' && (
												<div className="mode_change">
													<Ant.Switch
														checkedChildren="SLIDER"
														unCheckedChildren="OS"
														defaultChecked
														onClick={e => this.onChangeOsMode(false)}
													/>
												</div>
											)}
											{pathname != '/' && (
												<button
													className="prev_btn"
													onClick={e => {
														let index = nav.findIndex(
															result => result.path == currentRoute.path
														);
														this.props.ChangeTogleUrl(false);
														if (nav[index - 1]) {
															this.props.history.push(nav[index - 1].path);
														}
													}}
												>
													<img
														src={require('../../assests/images/up2-arrow.svg')}
														width="20px"
													/>
												</button>
											)}
											{pathname != '/' && (
												<button
													className="next_btn"
													onClick={e => {
														let index = nav.findIndex(
															result => result.path == currentRoute.path
														);
														this.props.ChangeTogleUrl(true);
														if (nav[index + 1]) {
															this.props.history.push(nav[index + 1].path);
														}
													}}
												>
													<img
														src={require('../../assests/images/down2-arrow.svg')}
														width="20px"
													/>
												</button>
											)}

											<Content
												className={`container ${
													!this.state.slide ? 'slideInDown animated' : 'slideInUp animated'
												}`}
											>
												<Switch>
													{/* render={props => <route.component {...props} />} */}
													{routes.map((route, index) => {
														return route.component ? (
															<Route
																key={index}
																className={`${
																	!this.state.slide
																		? 'slideInDown animated'
																		: 'slideInUp animated'
																}`}
																path={route.path}
																exact={route.exact}
																name={route.name}
																component={route.component}
															/>
														) : null;
													})}
													<Redirect to="/" />
												</Switch>
											</Content>
										</div>
										{/* End body content */}
									</Layout>
								)}
							</Layout>
						</div>
					)}
					{osMode && (
						<div>
							{currentRoute.path == '/' && osMode && (
								<Layout style={{ minHeight: '100vh' }}>
									{/* Start mobile drawer */}
									<Media query="(max-width: 1199px)">
										<DefaultMobileDrawer
											currentRoute={currentRoute}
											onClickMobileDrawer={this.onClickToMobileDrawer}
											mobileDrawer={this.state.mobileDrawer}
											onClick={this.onClickToredirect}
										/>
									</Media>
									{/* End mobile drawer */}

									{/* Start web drawer */}
									<Media query="(min-width: 1200px)">
										<DefaultSidebar
											currentRoute={currentRoute}
											collapsed={this.state.collapsed}
											onClick={this.onClickToredirect}
											onClickDrawer={this.onClickDrawer}
										/>
									</Media>
									{/* End web drawer */}

									<Layout>
										{/* Start Header content */}
										<DefaultHeader
											onClick={this.onClickDrawer}
											onClickMobileDrawer={this.onClickToMobileDrawer}
											collapsed={this.state.collapsed}
										/>
										{/* End Header content */}
										<div className="mode_change">
											<Ant.Switch
												checkedChildren="SLIDER"
												unCheckedChildren="OS"
												defaultChecked={false}
												onChange={e => this.onChangeOsMode(true)}
											/>
										</div>
										<OSCOMPONENT
											minimize={os.minimize}
											openFull={os.openFull}
											openSmall={os.openSmall}
											onClick={this.onClickOs}
										/>
										{/* End body content */}
									</Layout>
								</Layout>
							)}
							{currentRoute.path != '/' && osMode && (
								<Content className="container">
									<Switch>
										{/* render={props => <routes.component {...props} />} */}
										{routes.map((route, index) => {
											return route.component ? (
												<Route
													key={index}
													path={route.path}
													exact={route.exact}
													name={route.name}
													component={route.component}
												/>
											) : null;
										})}
										<Redirect to="/" />
									</Switch>
								</Content>
							)}
						</div>
					)}
				</div>
			</LoadingOverlay>
		);
	}
}

const mapStateToProps = state => ({
	toggle: state.toggleUrl.toggle,
	osDesign: state.OS.osDesign,
	Loader: state.Loader.loading,
});

export default connect(
	mapStateToProps,
	{ ChangeTogleUrl, ChangeOsDesign }
)(DefaultLayout);
