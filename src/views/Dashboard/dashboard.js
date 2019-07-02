import React from 'react';
import { Row, Typography, Select, Col, Card, Carousel, List } from 'antd';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import {Line} from 'react-chartjs-2';

const { Title, Text } = Typography;
const { Option } = Select;
const { Meta } = Card;

const data = {
	labels: ['18 May', '20 May', '22 May', '24 May'],
	datasets: [
	  {
		fill: false,
		lineTension: 0.3,
		backgroundColor: 'rgba(57,205,130,0.4)',
		borderColor: '#00C203',
		borderCapStyle: 'butt',
		borderWidth:3,
		borderDash: [],
		borderDashOffset: 0.0,
		borderJoinStyle: 'miter',
		pointBorderColor: '#fff',
		pointBackgroundColor: '#00C203',
		pointBorderWidth: 2,
		pointHoverRadius: 5,
		pointHoverBackgroundColor: '#00C203',
		pointHoverBorderColor: '#00C203',
		pointHoverBorderWidth: 2,
		pointRadius: 5,
		pointHitRadius: 10,
		data: [2300, 1500, 2700, 3800],
		
	  }
	]
	};
	
  const options = {
		responsive: true,
		legend: { display: false },
		scales: {
			xAxes: [{
				gridLines: {
					display:false
				}
					}],
			yAxes: [{
				display: true,
				gridLines: {
					borderDash: [8, 4],
				}			  
			}]
		}
	};
	

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};

		this.showModal = this.showModal.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	showModal() {
		this.setState({ visible: true });
	}

	handleCancel() {
		this.setState({ visible: false });
	}

	render() {
		var settings = {
			speed: 500,
			infinite: true,
			arrows: false,
			margin: 15,
			slidesToScroll: 2,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						slidesToScroll: 1,
					},
				},
			],
		};
		return (
			<div className="main">
				<div className="section">
					<img
						src={require('../../assests/images/b1.jpg')}
						className="parelax slideInUp animated"
						width="100%"
					/>
					<div className={`slide_animation ${this.props.toggleUrl?'slideInUp':'slideInDown'} animated`}>
						<Row type="flex" justify="space-between">
							<Row type="flex">
								<Title className="title">App Overview</Title>
								<Select defaultValue="Facebook" className="title_menu">
									<Option value="Facebook">Facebook</Option>
									<Option value="Twitter">Twitter</Option>
									<Option value="Youtube">Youtube</Option>
								</Select>
							</Row>
							<a className="link" href="#">
								ALL APP
							</a>
						</Row>
						<Row className="ao r_mar" type="flex" justify="space-between">
							<Col xl={6} lg={12} md={12} sm={12} xs={24}>
								<div className="bxs1">
									<Card
										className="card_blue card_bx"
										cover={<img src={require('../../assests/images/status-social/s1.svg')} />}
									>
										<Meta
											title="2,100"
											description={
												<div className="des">
													<span>Total Followers</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														112.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col xl={6} lg={12} md={12} sm={12} xs={24}>
								<div className="bxs2">
									<Card
										className="card_purple card_bx"
										cover={<img src={require('../../assests/images/status-social/s2.svg')} />}
									>
										<Meta
											title="1,345"
											description={
												<div className="des">
													<span>Impressions</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														112.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col xl={6} lg={12} md={12} sm={12} xs={24}>
								<div className="bxs3">
									<Card
										className="card_gray card_bx"
										cover={<img src={require('../../assests/images/status-social/s3.svg')} />}
									>
										<Meta
											title="3,487"
											description={
												<div className="des">
													<span>Reach</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														24.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col xl={6} lg={12} md={12} sm={12} xs={24}>
								<div className="bxs4">
									<Card
										className="card_orange card_bx"
										cover={<img src={require('../../assests/images/status-social/s4.svg')} />}
									>
										<Meta
											title="7,549"
											description={
												<div className="des">
													<span>Engagement Rate</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														112.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
						</Row>
					</div>
				</div>
				<div className="section">
					<img
						src={require('../../assests/images/b2.jpg')}
						className="parelax slideInUp animated"
						width="100%"
					/>
					<div className={`slide_animation ${this.props.toggleUrl?'slideInUp':'slideInDown'} animated`}>
						<Row type="flex" justify="space-between">
							<Row type="flex">
								<Title className="title">Most Recent</Title>
								<Select defaultValue="Media" className="title_menu">
									<Option value="Media">Media</Option>
									<Option value="Photos">Photos</Option>
									<Option value="Audios">Audios</Option>
									<Option value="Videos">Videos</Option>
								</Select>
							</Row>
							<a className="link" href="#">
								SHOW ALL MEDIA
							</a>
						</Row>
						<Row className="ao media dash-slider">
							<Slider {...settings}>
								<Card
									className="item media_bx"
									cover={<img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />}
								>
									<Meta
										title={
											<Row type="flex" justify="space-between">
												<p>Nature Love.jpg</p>
												<span>1 Day ago</span>
											</Row>
										}
									/>
								</Card>
								<Card
									className="item media_bx"
									cover={<img alt="Nature Love" src={require('../../assests/images/media/2.jpg')} />}
								>
									<Meta
										title={
											<Row type="flex" justify="space-between">
												<p>Nature Love.jpg</p>
												<span>1 Day ago</span>
											</Row>
										}
									/>
								</Card>
								<Card
									className="item media_bx"
									cover={<img alt="Nature Love" src={require('../../assests/images/media/3.jpg')} />}
								>
									<Meta
										title={
											<Row type="flex" justify="space-between">
												<p>Nature Love.jpg</p>
												<span>1 Day ago</span>
											</Row>
										}
									/>
								</Card>
								<Card
									className="item media_bx"
									cover={<img alt="Nature Love" src={require('../../assests/images/media/4.jpg')} />}
								>
									<Meta
										title={
											<Row type="flex" justify="space-between">
												<p>Nature Love.jpg</p>
												<span>1 Day ago</span>
											</Row>
										}
									/>
								</Card>
								<Card
									className="item media_bx"
									cover={<img alt="Nature Love" src={require('../../assests/images/media/5.jpg')} />}
								>
									<Meta
										title={
											<Row type="flex" justify="space-between">
												<p>Nature Love.jpg</p>
												<span>1 Day ago</span>
											</Row>
										}
									/>
								</Card>
								<Card
									className="item media_bx"
									cover={<img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />}
								>
									<Meta
										title={
											<Row type="flex" justify="space-between">
												<p>Nature Love.jpg</p>
												<span>1 Day ago</span>
											</Row>
										}
									/>
								</Card>
							</Slider>
						</Row>
						
					</div>
				</div>

				<div className="section">
					
					<div className={`slide_animation ${this.props.toggleUrl?'slideInUp':'slideInDown'} animated`}>
						<Row type="flex" justify="space-between" className="slide_animation slideInUp animated">
							<Row type="flex">
								<Title className="title">Status of</Title>
								<Select defaultValue="Documents" className="title_menu">
									<Option value="Documents">Documents</Option>
									<Option value="Pdf">Pdf</Option>
									<Option value="Doc">Doc</Option>
									<Option value="Excel">Excel</Option>
									<Option value="Zip">Zip</Option>
								</Select>
							</Row>
							<a className="link" href="#">
								SHOW ALL DOCUMENTS
							</a>
						</Row>
						<Row className="ao document">
						<Col lg={6} md={12} sm={12} xs={24}>
								<div className="bxs4">
									<Card
										className="card_orange card_bx"
										cover={<img src={require('../../assests/images/status-social/d1.svg')} />}
									>
										<Meta
											title="15,200"
											description={
												<div className="des">
													<span>Engagement Rate</span>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col lg={18} md={12} sm={12} xs={24}>
								<Row>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="5148"
												description={
													<div className="des">
														<span>Pdf</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="3251"
												description={
													<div className="des">
														<span>Doc</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="2154"
												description={
													<div className="des">
														<span>Excel</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="3854"
												description={
													<div className="des">
														<span>PPT</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="2514"
												description={
													<div className="des">
														<span>Zip</span>
													</div>
												}
											/>
										</Card>
									</Col>
								</Row>
							</Col>
						</Row>
						
					</div>
				</div>
				<div className="section">
					
					<div className={`slide_animation ${this.props.toggleUrl?'slideInUp':'slideInDown'} animated`}>
						<Row type="flex" justify="space-between" className="slide_animation slideInUp animated">
							<Row type="flex">
								<Title className="title">Growth of</Title>
								<Select defaultValue="Health" className="title_menu">
									<Option value="Documents">Health</Option>
									<Option value="Pdf">1</Option>
									<Option value="Doc">2</Option>
								</Select>
							</Row>
							<a className="link" href="#">
								SHOW ALL
							</a>
						</Row>
						<Row className="ao document">
						<Col xl={18} lg={24} md={24}>
							<Card className="health_chart_bx">
								<Row type="flex">
									<Col lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx hc_bx">
											<Meta
												title="3854"
												description={
													<div className="des">
														<span>Calorie Burned in Month</span>
													</div>
												}
											/>
										</Card>
										<Text className="f16">Lorem ipsum dolor sit amet, consectetur
										spendisse fringilla accumsan ultricies bitur
										tellus euismod malesuada eget sed lectus.</Text>
										<Row type="flex">
											<img
												src={require('../../assests/images/growth.svg')}
												width="50px"
											/>
											<Text className="f18">You have a <span>11% Growth</span> in comparison with previous month</Text>
										</Row>
									</Col>	
									<Col lg={12} md={24} sm={24} xs={24}>
										<Line width="100%" height="67px" data={data} options={options}/>
									</Col>
								</Row>
							</Card>
							</Col>
							<Col xl={6} lg={24} md={24}>
								<Col xl={24} lg={8} md={24}>
									<Card className="doc_bx hl_bx">
										<Row type="flex">
											<img
												src={require('../../assests/images/status-social/h1.svg')}
												width="58px"
											/>
											<div className="right_cont">
												<Text className="num">015<span>KM</span></Text>
												<Text className="num_name">Distance Walked</Text>
											</div>
										</Row>
										
									</Card>
								</Col>
								<Col xl={24} lg={8} md={24}>
									<Card className="doc_bx hl_bx">
										<Row type="flex">
											<img
												src={require('../../assests/images/status-social/h2.svg')}
												width="58px"
											/>
											<div className="right_cont">
												<Text className="num">6:54<span>HR</span></Text>
												<Text className="num_name">Duration Worked</Text>
											</div>
										</Row>
										
									</Card>
								</Col>
								<Col xl={24} lg={8} md={24}>
									<Card className="doc_bx hl_bx">
										<Row type="flex">
											<img
												src={require('../../assests/images/status-social/h3.svg')}
												width="58px"
											/>
											<div className="right_cont">
												<Text className="num">015<span>KM</span></Text>
												<Text className="num_name">Distance Walked</Text>
											</div>
										</Row>
										
									</Card>
								</Col>
							</Col>
						</Row>
						
					</div>
				</div>
				<div className="section">
					<img
						src={require('../../assests/images/b1.jpg')}
						className="parelax slideInUp animated"
						width="100%"
					/>
					<div className={`slide_animation ${this.props.toggleUrl?'slideInUp':'slideInDown'} animated`}>
						<Row type="flex" justify="space-between">
							<Row type="flex">
								<Title className="title">Overview of</Title>
								<Select defaultValue="Digital Assets" className="title_menu">
									<Option value="Facebook">Digital Assets</Option>
									<Option value="Twitter">1</Option>
									<Option value="Youtube">2</Option>
								</Select>
							</Row>
							<a className="link" href="#">
								SHOW ALL
							</a>
						</Row>
						<Row className="ao r_mar" type="flex" justify="space-between">
							<Col lg={6} md={12} sm={12} xs={24}>
								<div className="bxs1">
									<Card
										className="card_blue card_bx"
										cover={<img src={require('../../assests/images/status-social/bitcoin.svg')} />}
									>
										<Meta
											title="2,100"
											description={
												<div className="des">
													<span>Bitcoin</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														112.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col lg={6} md={12} sm={12} xs={24}>
								<div className="bxs2">
									<Card
										className="card_purple card_bx"
										cover={<img src={require('../../assests/images/status-social/ethereum.svg')} />}
									>
										<Meta
											title="1,345"
											description={
												<div className="des">
													<span>Ethereum</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														112.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col lg={6} md={12} sm={12} xs={24}>
								<div className="bxs3">
									<Card
										className="card_gray card_bx"
										cover={<img src={require('../../assests/images/status-social/litecoin.svg')} />}
									>
										<Meta
											title="3,487"
											description={
												<div className="des">
													<span>Litecoin</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														24.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col lg={6} md={12} sm={12} xs={24}>
								<div className="bxs4">
									<Card
										className="card_orange card_bx"
										cover={<img src={require('../../assests/images/status-social/ripple.svg')} />}
									>
										<Meta
											title="7,549"
											description={
												<div className="des">
													<span>Ripple</span>
													<div className="status">
														<img
															src={require('../../assests/images/up.svg')}
															width="12px"
														/>
														112.71%
													</div>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
						</Row>
					</div>
				</div>
				<div className="section pb-0">
					<div className={`slide_animation ${this.props.toggleUrl?'slideInUp':'slideInDown'} animated`}>
						<Row type="flex" justify="space-between" className="slide_animation slideInUp animated">
							<Row type="flex">
								<Title className="title">Recent</Title>
								<Select defaultValue="Chat" className="title_menu">
									<Option value="Documents">Chat</Option>
									<Option value="Pdf">1</Option>
									<Option value="Doc">2</Option>
								</Select>
							</Row>
							<a className="link" href="#">
								SHOW ALL
							</a>
						</Row>
						<Row className="ao document r_mar">
							<Col lg={12} md={12} sm={12} xs={24}>
								<List.Item className="chat_bx">
									<List.Item.Meta
									avatar={
										<img src={require("../../assests/images/user/user.png")} />
									}
									title={<a href="https://ant.design">Calorie Burned in Month</a>}
									description={"Lorem ipsum dolor sit amet, consectetur spendisse fringilla accumsan ultricies bitur tellus euismod malesuada eget"}
									/>
									<div className="m_time">2 Days ago</div>
								</List.Item>
							</Col>
							<Col lg={12} md={12} sm={12} xs={24}>
								<List.Item className="chat_bx">
									<List.Item.Meta
									avatar={
										<img src={require("../../assests/images/user/user.png")} />
									}
									title={<a href="https://ant.design">Calorie Burned in Month</a>}
									description={"Lorem ipsum dolor sit amet, consectetur spendisse fringilla accumsan ultricies bitur tellus euismod malesuada eget"}
									/>
									<div className="m_time">2 Days ago</div>
								</List.Item>
							</Col>
							<Col lg={12} md={12} sm={12} xs={24}>
								<List.Item className="chat_bx">
									<List.Item.Meta
									avatar={
										<img src={require("../../assests/images/user/user.png")} />
									}
									title={<a href="https://ant.design">Calorie Burned in Month</a>}
									description={"Lorem ipsum dolor sit amet, consectetur spendisse fringilla accumsan ultricies bitur tellus euismod malesuada eget"}
									/>
									<div className="m_time">2 Days ago</div>
								</List.Item>
							</Col>
							<Col lg={12} md={12} sm={12} xs={24}>
								<List.Item className="chat_bx">
									<List.Item.Meta
									avatar={
										<img src={require("../../assests/images/user/user.png")} />
									}
									title={<a href="https://ant.design">Calorie Burned in Month</a>}
									description={"Lorem ipsum dolor sit amet, consectetur spendisse fringilla accumsan ultricies bitur tellus euismod malesuada eget"}
									/>
									<div className="m_time">2 Days ago</div>
								</List.Item>
							</Col>
						</Row>
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	toggleUrl: state.toggleUrl.toggle
})

export default connect(mapStateToProps)(Dashboard);
