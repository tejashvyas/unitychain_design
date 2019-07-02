import React from 'react';
import {
	Row,
	Typography,
	Col,
	Card,
	Upload,
	message,
	Progress,
	Button,
	Form,
	Input,
	List,
	Popover,
	DatePicker,
} from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';
let NODE_URL = process.env.REACT_APP_NODE_API;
// import ReactJson from 'react-json-view';
var _ = require('lodash');

const { Text } = Typography;

function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

function beforeUpload(file) {
	const isJPG = file.type === 'image/jpeg';
	const isPNG = file.type === 'image/png';

	if (!isJPG && !isPNG) {
		message.error('You can only upload JPG OR PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error('Image must smaller than 2MB!');
	}
	return (isJPG || isPNG) && isLt2M;
}

const data = [
	{
		title: 'William Smith',
	},
	{
		title: 'William Smith',
	},
	{
		title: 'William Smith',
	},
	{
		title: 'William Smith',
	},
];

const content = (
	<div className="down_info">
		<Text>Step to download Facebook data:</Text>
		<ul>
			<li>1) Login to Facebook.</li>
			<li>2) Click on arrow key and then click on settings.</li>
			<li>3) Click on 'Your Facebook information' from top left side.</li>
			<li>4) Under 'Download your information' Click on 'view'.</li>
			<li>5) Select 'Json' under 'Format' field and click on 'Create File'.</li>
			<li>6) Click on 'Available files' , you can see the files are in 'pending' state.</li>
			<li>7) After the status changes to 'Download', click on download(Your data will start downloading).</li>
			<li>8) Create a zip file of the downloaded folder.</li>
			<li>9) Upload the zip file under unitychain facebook social profile upload section.</li>
		</ul>
	</div>
);

class ProfileComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			copied: false,
			name: '',
			birthDate: '',
			emailAddress: '',
			phoneNumber: '',
			profile_uri: '',
		};

		this.onChangeImage = this.onChangeImage.bind(this);
		this.onChangeInput = this.onChangeInput.bind(this);
	}

	componentDidMount() {
		axios.request({ method: 'get', url: `${NODE_URL}/unitychain/static/facebook/fetchFacebookData/${this.props.usersData._id}`, crossDomain: true }).then(row => {
			if (row.data.response.code == 200 ) {
				const { name, emails, birthday, phone_numbers, profile_uri } = row.data.response.data.profile;
				
				if (!_.isEmpty(row.data.response.data.profile)) {
					const { day, month, year } = birthday;
					this.setState({
						name: name.full_name,
						birthDate: `${month}/${day}/${year}`,
						emailAddress: emails.emails[0],
						phoneNumber: phone_numbers[0].phone_number,
						profile_uri: profile_uri,
					});
				}
			}
		});
	}

	onChangeInput(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onChangeImage(info) {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, imageUrl => {
				this.setState({
					imageUrl,
					loading: false,
				});
			});
		}
	}

	render() {
		const imageUrl = this.state.imageUrl;

		const theme = {
			
			base00: '#272822',
			base01: '#383830',
			base02: '#49483e',
			base03: '#75715e',
			base04: '#a59f85',
			base05: '#f8f8f2',
			base06: '#f5f4f1',
			base07: '#f9f8f5',
			base08: '#f92672',
			base09: '#fd971f',
			base0A: '#f4bf75',
			base0B: '#a6e22e',
			base0C: '#a1efe4',
			base0D: '#66d9ef',
			base0E: '#ae81ff',
			base0F: '#cc6633'
		  };

		const { did, diddocument, public_key, publickey, username } = this.props.usersData;
		
		let PUBLICKEY = public_key?public_key:publickey
		return (
			<div className="profile slideInUp animated">
				<Row className="ao r_mar" type="flex" justify="space-between">
					<Col xl={10} lg={10} md={24} className="pr-5">
						<div className="blue_cont_bx p-3">
							<Row type="flex">
								<div className="profile_img">
									{imageUrl ? (
										<img src={imageUrl} alt="avatar" width="88" height="88" />
									) : (
										<img src={require('../../assests/images/user/user.svg')} width="88" />
									)}
									<Upload
										name="avatar"
										listType="picture-card"
										className="avatar-uploader"
										showUploadList={false}
										action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
										beforeUpload={beforeUpload}
										onChange={this.onChangeImage}
									>
										<img
											src={require('../../assests/images/profile_upload_img_btn.svg')}
											alt="avatar"
											width="38"
											height="38"
										/>
									</Upload>
								</div>
								<div className="avtar_name">
									<Text className="name">{this.state.name}</Text>
									<Form>
										<Input value={this.state.profile_uri} />
										<CopyToClipboard
											text={this.state.profile_uri}
											type="link"
											className="copy"
											onCopy={() => {
												this.setState({ copied: true });
												message.success(`copied successfully.`);
											}}
										>
											<Button type="link" className="copy">
												Copy
											</Button>
										</CopyToClipboard>
									</Form>
								</div>
							</Row>
							<Text className="text mt-3">Profile Completed</Text>
							<Progress percent={30} status="active" />
						</div>
						<div className="blue_cont_bx social_bx">
							<Card title="Spread Your Profile">
								<ul className="social">
									<li>
										<a href="javascript:void(0);">
											<img src={require('../../assests/images/twitter.svg')} width="58" />
										</a>
									</li>
									<li>
										<a href="javascript:void(0);">
											<img src={require('../../assests/images/facebook.svg')} width="58" />
										</a>
									</li>
									<li>
										<a href="javascript:void(0);">
											<img src={require('../../assests/images/linkedin.svg')} width="58" />
										</a>
									</li>
									<li>
										<a href="javascript:void(0);">
											<img src={require('../../assests/images/google_plus.svg')} width="58" />
										</a>
									</li>
								</ul>
							</Card>
						</div>
					</Col>
					<Col xl={14} lg={14} md={24}>
						<div className="blue_cont_bx social_bx">
							<Card
								title="Account details"
								extra={
									<div>
										<a href="javascript:void(0);" onClick={e => this.props.onClick()}>
											<img src={require('../../assests/images/import.svg')} width="153" />
										</a>
										<Popover placement="bottomRight" content={content} className="info">
											<img src={require('../../assests/images/info.svg')} width="21" />
										</Popover>
									</div>
								}
							>
								<Row className="py-2 r_mar ao in_menual">
									<Col xl={12} lg={12} md={12}>
										<Form.Item className="form-group">
											<Input
												type="text"
												className={username ? 'input in_fill' : 'input'}
												name="name"
												value={username}
												onChange={this.onChangeInput}
												disabled
												autoComplete="true"
											/>
											<label>Username</label>
										</Form.Item>
									</Col>
									<Col xl={12} lg={12} md={12}>
										<Form.Item className="form-group">
											<DatePicker
												format="D MMM YYYY"
												className={
													this.state.birthDate
														? 'input datepicker in_fill'
														: 'input datepicker'
												}
												name="birthDate"
												value={this.state.birthDate?moment(new Date(this.state.birthDate), 'D MMM YYYY'):moment(new Date(), 'D MMM YYYY')}
												onChange={e => {
													this.setState({
														birthDate: e != null ? moment(e._d).format('D MMM YYYY') : '',
													});
												}}
											/>
											<label className="date_lbl">Date of Birth</label>
										</Form.Item>
									</Col>
									<Col xl={12} lg={12} md={12}>
										<Form.Item className="form-group">
											<Input
												type="email"
												className={this.state.emailAddress ? 'input in_fill' : 'input'}
												name="emailAddress"
												value={this.state.emailAddress}
												onChange={this.onChangeInput}
												autoComplete="true"
											/>
											<label>Email Address</label>
										</Form.Item>
									</Col>
									<Col xl={12} lg={12} md={12}>
										<Form.Item className="form-group">
											<Input
												type="text"
												className={this.state.phoneNumber ? 'input in_fill' : 'input'}
												name="phoneNumber"
												value={this.state.phoneNumber}
												onChange={this.onChangeInput}
												autoComplete="true"
											/>
											<label>Phone Number</label>
										</Form.Item>
									</Col>

									<Col span={24}>
										<Button className="btn1 float-right mr-3">SAVE</Button>
									</Col>
								</Row>
							</Card>
						</div>
					</Col>
				</Row>
				<Row className="ao r_mar" type="flex" justify="space-between">
					<Col span={24}>
						<div className="blue_cont_bx social_bx">
							<Card title="DID details">
								<Row className="py-2 r_mar ao in_menual">
									<Col xl={12} lg={12} md={12}>
										<Form.Item className="form-group">
											<Input
												type="text"
												className={did ? 'input in_fill' : 'input'}
												name="DID"
												value={did}
												disabled
											/>
											<label>DID</label>
										</Form.Item>
									</Col>

									<Col xl={12} lg={12} md={12}>
										<Form.Item className="form-group">
											<Input
												type="text"
												className={PUBLICKEY ? 'input in_fill' : 'input'}
												name="publicKey"
												value={PUBLICKEY}
												disabled
												autoComplete="true"
											/>
											<label>Public Key</label>
										</Form.Item>
									</Col>

									<Col span={24}>
										{/* <ReactJson src={JSON.parse(diddocument)} /> */}
										<label>DID Document</label>										
										<JSONTree data={JSON.parse(diddocument)} theme={theme} invertTheme={true}/>
										{/* <Form.Item className="form-group data_form">
											<textarea
												rows="10"
												className={this.state.did ? 'input in_fill' : 'input'}
												name="didDocument"
												value={JSON.stringify(JSON.parse(diddocument))}
												disabled
												autoComplete="true"
											/>
										</Form.Item> */}
									</Col>
								</Row>
							</Card>
						</div>
					</Col>
				</Row>

				<Row className="ao r_mar" type="flex" justify="space-between">
					<Col xl={10} lg={10} md={24} className="pr-5">
						<div className="blue_cont_bx social_bx">
							<Card title="Invitation Sent">
								<Scrollbars
									style={{ width: '100%', height: 130 }}
									autoHide
									// Hide delay in ms
									autoHideTimeout={1000}
									// Duration for hide animation in ms.
									autoHideDuration={200}
								>
									<List
										className="in_sent"
										itemLayout="horizontal"
										dataSource={data}
										renderItem={item => (
											<List.Item className="facebook">
												<List.Item.Meta
													title={
														<div className="in_sent_name">
															<span>M</span>
															<a href="https://ant.design">{item.title}</a>
														</div>
													}
												/>
												<a href="javascript:void(0);">Facebook</a>
											</List.Item>
										)}
									/>
								</Scrollbars>
							</Card>
						</div>
					</Col>
					<Col xl={14} lg={14} md={24}>
						<div className="blue_cont_bx social_bx">
							<Card title="Invite Friends">
								<Col span={24}>
									<Form.Item className="form-group did">
										<Input
											type="text"
											className={this.state.did ? 'input in_fill' : 'input'}
											name="did"
											onChange={this.onChangeInput}
											autoComplete="true"
										/>
										<Button type="link" className="copy">
											Copy
										</Button>
									</Form.Item>
									<div className="invite_send">
										<p className="f16">Otherwise to send invitation:</p>
										<ul className="social_send">
											<li>
												<a href="#">
													<img src={require('../../assests/images/twitter.svg')} width="58" />
												</a>
											</li>
											<li>
												<a href="#">
													<img
														src={require('../../assests/images/facebook.svg')}
														width="58"
													/>
												</a>
											</li>
											<li>
												<a href="#">
													<img src={require('../../assests/images/more.svg')} width="58" />
												</a>
											</li>
										</ul>
									</div>
								</Col>
							</Card>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	usersData: state.Auth.user,
});

export default connect(
	mapStateToProps,
	{ connect }
)(ProfileComponent);
