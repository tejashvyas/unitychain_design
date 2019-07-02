import React from 'react';
import { Drawer, Layout, Menu, Icon, Row, Col, Avatar } from 'antd';
import routes from '../../nav';

function findRoutePath(path, data, openKeys = '') {
	return data.map(function(e) {
		if(e.path == path) return {currentRouteIndex: e.index, openKeys};
		else if(e.childrens) return findRoutePath(path, e.childrens, e.index)
	  }).filter(res=>res!=undefined)[0];
}

const { SubMenu } = Menu;

class DefaultMobileDrawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			currentRouteIndex: '1',
			openKeys: '',
		};

		this.onCollapse = this.onCollapse.bind(this);
		this.onCloseDrawer = this.onCloseDrawer.bind(this);
		this.onChangeSubmenu = this.onChangeSubmenu.bind(this);
	}

	componentDidMount() {
		if (this.props.currentRoute) {
			const { path } = this.props.currentRoute;
			const { currentRouteIndex, openKeys } = findRoutePath(path, routes)
			this.setState({ currentRouteIndex, openKeys, collapsed: this.props.collapsed });
		}
	}

	// When update props than it will call
	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps.currentRoute) {
			const { path } = nextProps.currentRoute;
			const { currentRouteIndex } = findRoutePath(path, routes)

			return {
				currentRouteIndex,
				collapsed: nextProps.collapsed,
			};
		}

		return null;
	}

	// Mobile Drawer close
	onCloseDrawer() {
		this.props.onClickMobileDrawer(false);
	}

	// Web drawer manage
	onCollapse = collapsed => {
		this.props.onClickDrawer(collapsed);
		this.setState({ collapsed });
	};

	onChangeSubmenu(e) {
		this.setState({ openKeys: e.length > 0? e[1]: '' });
	}

	render() {
		let indexId = this.state.currentRouteIndex.toString();

		return (
			<Drawer
				placement="left"
				closable={false}
				onClose={this.onCloseDrawer}
				visible={this.props.mobileDrawer}
				className={this.props.mobileDrawer?'mobile_drw': 'mobile_drw'}
				// 
			>
				<img src={require('../../assests/images/logo.svg')} className="mobile_logo" width="150" />
				<Menu
					mode="inline"
					selectedKeys={[indexId]}
					openKeys={[this.state.openKeys]}
					style={{ height: '100%' }}
					onOpenChange={this.onChangeSubmenu}
				>
					{routes.map((result, index) => {
						
						if(result.childrens) {
							return (<SubMenu
								key={result.index}
								title={
									<span>
										<span className="icon_menu">
										<img
											src={require(`../../assests/images/default/${result.icon}`)}
											className="sidbarImage"
										/>
										<img
											src={require(`../../assests/images/dark/${result.icon}`)}
											className="sidbarImagehover"
										/>
										</span>
										<span>
										{result.name}
										</span>
										
									</span>
								}
							>
								{result.childrens.map(res => (<Menu.Item key={res.index} onClick={e => this.props.onClick(res)}>{res.name}</Menu.Item>))}
							</SubMenu>)
						} else {
							return (
								<Menu.Item key={result.index} onClick={e => {
										this.setState({openKeys: ''})
										this.props.onClick(result) 
									}}>
									<div className="m_item">
									<span className="icon_menu">
										<img
											src={require(`../../assests/images/default/${result.icon}`)}
											className="sidbarImage"
										/>
										<img
											src={require(`../../assests/images/dark/${result.icon}`)}
											className="sidbarImagehover"
										/>
										</span>
										<span>{result.name}</span>
									</div>
								</Menu.Item>)
								
						}
					})}
					
				</Menu>
				<div className="user_bx" onClick={e => this.props.onClick('/profile')}>
					<img src={require(`../../assests/images/user/user.png`)} />
					<span className="user_name">Stela James</span>
				</div>
			</Drawer>
		);
	}
}

export default DefaultMobileDrawer;
