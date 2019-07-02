import React from 'react';
import { Layout, Menu, Icon, Row, Col, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../nav';
const { Sider } = Layout;

const { SubMenu } = Menu;

function findRoutePath(path, data, openKeys = '') {
	return data.map(function(e) {
		if(e.path == path) return {currentRouteIndex: e.index, openKeys};
		else if(e.childrens) return findRoutePath(path, e.childrens, e.index)
	  }).filter(res=>res!=undefined)[0];
}

class DefaultSidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			currentRouteIndex: '1',
			openKeys: '',
		};

		this.onCollapse = this.onCollapse.bind(this);
		this.onChangeSubmenu = this.onChangeSubmenu.bind(this);
	}

	componentDidMount() {
		if (this.props.currentRoute) {
			const { path } = this.props.currentRoute;
			const { currentRouteIndex, openKeys } = findRoutePath(path, routes)
			this.setState({ currentRouteIndex, openKeys, collapsed: this.props.collapsed });
		}
	}

	// When props update it will call.
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

	// Web drawer manage
	onCollapse = collapsed => {
		this.props.onClickDrawer(collapsed);
		this.setState({ collapsed });
	};
	
	// change on submenu to set
	onChangeSubmenu(e) {
		this.setState({ openKeys: e.length > 0? e[1]: '' });
	}

	render() {
		
		let indexId = this.state.currentRouteIndex.toString();

		return (
			<Sider
				className={!this.state.collapsed ? 'drawerSlider' : 'drawerSliderClass'}
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				<div className="maindiv">
					<Row type="flex" justify="center">
						
						<div>
							{!this.state.collapsed && (
								<img src={require('../../assests/images/logo.svg')} width="150" />
							)}
							
						</div>
						<div style={{ textAlign: 'center' }}>
							{!this.state.collapsed && (
								<img
									src={require('../../assests/images/menu2.svg')}
									className="menu_icon"
									width="22"
									onClick={e => this.onCollapse(!this.state.collapsed)}
									type={'menu-unfold'}
								/>
							)}
							{this.state.collapsed && (
								<img
									src={require('../../assests/images/menu.svg')}
									className="menu_icon"
									width="22"
									onClick={e => this.onCollapse(!this.state.collapsed)}
									type={'menu-unfold'}
								/>
							)}
						</div>
					</Row>
				</div>
				<Menu
					mode="inline"
					selectedKeys={[indexId]}
					openKeys={[this.state.openKeys]}
					onOpenChange={this.onChangeSubmenu}
				>
					{routes.map((result, index) => {
						if(result.childrens && result.exact) {
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
						} else if(result.exact) {
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
			</Sider>
		);
	}
}

export default DefaultSidebar;
