import React from 'react';
import { Row, Col, Upload, message, Button, Calendar, Select, DatePicker, Form, TimePicker } from 'antd';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';

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

class CreatePostComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
		};

		this.onChangeImage = this.onChangeImage.bind(this);
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
		return (
			<div>
				<Row className="create_post">
					<Col xl={18} lg={16} md={24}>
						<div className="scheduledpost post_add">
							<form>
								<div className="checkbox">
									<input type="checkbox" id="facebook" />
									<label className="avtar_social">
										<img
											src={require('../../../assests/images/user/user.png')}
											width="44"
											className="user_img"
										/>
										<img
											src={require('../../../assests/images/facebook-small.svg')}
											className="social_icon"
											width="14"
										/>
									</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="twitter" />
									<label className="avtar_social">
										<img
											src={require('../../../assests/images/user/user.png')}
											width="44"
											className="user_img"
										/>
										<img
											src={require('../../../assests/images/twitter-small.svg')}
											className="social_icon"
											width="14"
										/>
									</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="google" />
									<label className="avtar_social">
										<img
											src={require('../../../assests/images/user/user.png')}
											width="44"
											className="user_img"
										/>
										<img
											src={require('../../../assests/images/google-plus-small.svg')}
											className="social_icon"
											width="14"
										/>
									</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="instagram" />
									<label className="avtar_social">
										<img
											src={require('../../../assests/images/user/user.png')}
											width="44"
											className="user_img"
										/>
										<img
											src={require('../../../assests/images/instagram-small.svg')}
											className="social_icon"
											width="14"
										/>
									</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="linkedin" />
									<label className="avtar_social">
										<img
											src={require('../../../assests/images/user/user.png')}
											width="44"
											className="user_img"
										/>
										<img
											src={require('../../../assests/images/linkedin-small.svg')}
											className="social_icon"
											width="14"
										/>
									</label>
								</div>
							</form>
							<div className="post_editer">
								{imageUrl ? <img src={imageUrl} alt="avatar" width="390" height="214" /> : null}
								<textarea />
							</div>
							<Row type="flex" className="action_post">
								<Upload
									name="avatar"
									listType="picture-card"
									className="img_post"
									showUploadList={false}
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									beforeUpload={beforeUpload}
									onChange={this.onChangeImage}
								>
									<img src={require('../../../assests/images/AddPhotoVideo.svg')} width="174" />
								</Upload>
								<Button className="btn1 mt-3">CREATE POST</Button>
							</Row>
						</div>
					</Col>
					<Col xl={6} lg={8} md={24}>
						<div className="scheduledpost set">
							<p className="scheduled_title">Scheduled Post</p>
							<Calendar
								className="post_calendar"
								fullscreen={false}
								headerRender={({ value, type, onChange, onTypeChange }) => {
									const start = 0;
									const end = 12;
									const monthOptions = [];

									const current = value.clone();
									const localeData = value.localeData();
									const months = [];
									for (let i = 0; i < 12; i++) {
										current.month(i);
										months.push(localeData.monthsShort(current));
									}

									for (let index = start; index < end; index++) {
										monthOptions.push(
											<Select.Option className="month-item" key={`${index}`}>
												{months[index]}
											</Select.Option>
										);
									}

									let month = value.month();

									const year = value.year();
									const options = [];
									for (let i = year - 10; i < year + 10; i += 1) {
										options.push(
											<Select.Option key={i} value={i} className="year-item">
												{i}
											</Select.Option>
										);
									}

									return (
										<Row className="cale_select">
											<button
												className="arrow-prev"
												onClick={e => {
													const newValue = value.clone();
													newValue.month(parseInt(month - 1, 10));
													onChange(newValue);
												}}
											>
												<img
													src={require('../../../assests/images/arrow-prev.svg')}
													width="5"
												/>
											</button>
											{months[month]}, {String(year)}
											<button
												className="arrow-next"
												onClick={e => {
													const newValue = value.clone();
													newValue.month(parseInt(month + 1, 10));
													onChange(newValue);
												}}
											>
												<img
													src={require('../../../assests/images/arrow-next.svg')}
													width="5"
												/>
											</button>
										</Row>
									);
								}}
							/>
							<Form.Item className="form-group timePicker">
								<TimePicker
									name="postTime"
									onChange={e => {
										this.setState({
											postTime: e != null ? moment(e._d).format('HH:mm a') : '',
										});
									}}
									className={
										this.state.postTime ? 'input datepicker in_fill' : 'input datepicker in_fill'
									}
									use12Hours
									format="h:mm a"
									defaultValue={moment(new Date(), 'HH:mm a')}
								/>
								<label className="date_lbl">Time</label>
							</Form.Item>
							<p className="scheduled_title">Queued</p>
							<Scrollbars
								style={{ width: '100%', height: 90 }}
								autoHide
								// Hide delay in ms
								autoHideTimeout={1000}
								// Duration for hide animation in ms.
								autoHideDuration={200}
							>
								<ul className="event_list">
									<li>
										<div>
											<span className="event_time">May 12, 2019 05:30 PM</span>
											<span>Udemy Blog</span>
										</div>
										<img src={require('../../../assests/images/delete.svg')} width="33" />
									</li>
								</ul>
							</Scrollbars>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CreatePostComponent;
