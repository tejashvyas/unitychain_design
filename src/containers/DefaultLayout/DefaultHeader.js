import React from 'react';
import { Layout, Row, Col, Input, Dropdown, List, Switch, Divider, Badge } from 'antd';
import Media from 'react-media';
import { connect } from 'react-redux';
import { logout } from '../../action/auth.action';
const { Header } = Layout;

const styles = {
	mainIconDiv: {
		textAlign: 'right',
	},
};

const Search = Input.Search;
const menu1 = (
	<div className="message_bx">
		<List.Item>
			<List.Item.Meta
				avatar={<img src={require('../../assests/images/user/2.png')} />}
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				avatar={<img src={require('../../assests/images/user/2.png')} />}
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				avatar={<img src={require('../../assests/images/user/2.png')} />}
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				avatar={<img src={require('../../assests/images/user/2.png')} />}
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				avatar={<img src={require('../../assests/images/user/2.png')} />}
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<List.Item>
			<a className="view_link" href="#">
				VIEW ALL
			</a>
		</List.Item>
	</div>
);
const menu2 = (
	<div className="message_bx notification">
		<Row>
			<Col span={20} className="title">
				Notifications
			</Col>
			<Col span={4}>
				<Switch defaultChecked />
			</Col>
		</Row>
		<List.Item>
			<List.Item.Meta
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<Divider />
		<List.Item>
			<List.Item.Meta
				title={<a href="https://ant.design">Lorem Ipsum</a>}
				description={
					'Donec viverra viverra mi non placerat. Fusce ultrices augue sem, vestibulum placerat velit venenatis a.'
				}
			/>
			<div className="m_time">29 mins ago</div>
		</List.Item>
		<List.Item>
			<a className="view_link" href="#">
				VIEW ALL
			</a>
		</List.Item>
	</div>
);
class DefaultHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Header>
				<div className="container">
					<Row>
						<Col span={24}>
							{/* Start mobile icon */}
							<Media query="(max-width: 1199px)">
								<div style={styles.mainIconDiv}>
									<a href="#" className="noti">
										<img src={require('../../assests/images/logout.svg')} height="20" />
									</a>
									<Badge count={5} className="noti">
										<img src={require('../../assests/images/email.svg')} height="20" />
									</Badge>
									<Badge count={5} className="noti">
										<img src={require('../../assests/images/alarm.svg')} height="25" />
									</Badge>

									<img
										src={require('../../assests/images/menu.svg')}
										className="menu_icon"
										width="25"
										onClick={e => this.props.onClickMobileDrawer(true)}
										type={'menu-unfold'}
									/>
									<Search
										placeholder="Search"
										className="noti search_icon"
										onSearch={value => console.log(value)}
									/>
								</div>
							</Media>
							{/* End mobile icon */}

							{/* Start web icon */}
							<Media query="(min-width: 1200px)">
								<div style={styles.mainIconDiv}>
									<a
										href="javascript:void(0);"
										className="noti"
										onClick={e => {
											this.props.logout();
											this.props.history.push('/');
										}}
									>
										<img src={require('../../assests/images/logout.svg')} height="20" />
									</a>
									<Dropdown
										overlay={menu1}
										trigger={['click']}
										className="noti message"
										placement="bottomRight"
									>
										<Badge count={5}>
											<a className="ant-dropdown-link" href="#" count={5}>
												<img src={require('../../assests/images/email.svg')} height="20" />
											</a>
										</Badge>
									</Dropdown>
									<Dropdown
										overlay={menu2}
										trigger={['click']}
										className="noti notification"
										placement="bottomRight"
									>
										<Badge count={5}>
											<a className="ant-dropdown-link" href="#">
												<img src={require('../../assests/images/alarm.svg')} height="24" />
											</a>
										</Badge>
									</Dropdown>
									<Search
										placeholder="Search"
										className="noti search_icon"
										onSearch={value => console.log(value)}
									/>

									{this.props.collapsed && (
										<img
											src={require('../../assests/images/logo.svg')}
											width="150"
											className="float-left collapsed_logo"
										/>
									)}
								</div>
							</Media>
							{/* End web icon */}
						</Col>
					</Row>
				</div>
			</Header>
		);
	}
}

export default connect(
	null,
	{ logout }
)(DefaultHeader);
