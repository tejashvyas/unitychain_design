import React from 'react';
import { Row, Col, Button, Upload, message } from 'antd';
import { connect } from 'react-redux';
import { uploadSocialProfileFile } from '../../action/profile.action';
import { LoadingAction } from '../../action/loading.action';
const Dragger = Upload.Dragger;

class ProfileUploadComponent extends React.Component {
	render() {
		let self = this;
		const props = {
			name: 'file',
			multiple: true,
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			onChange(info) {
				const status = info.file.status;
				self.props.LoadingAction(true);
				if (status !== 'uploading') {
					const formData = new FormData();
					formData.append('userData', info.file.originFileObj);
					self.props.uploadSocialProfileFile(formData, self.props.User._id);
					setTimeout(() => {
						self.props.LoadingAction(false);
						self.props.history.push('app/user-facebook-data');
					}, 3000);
				}

				if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
					self.props.LoadingAction(false);
				}
			},
		};

		return (
			<div className="profile slideInUp animated">
				<Row className="file_list">
					<Col span={24}>
						<Button className="upload_fb">
							<img src={require('../../assests/images/facebook_btn.svg')} width="150" />
						</Button>
					</Col>
					<Col span={24}>
						<div className="drug_zone">
							<Dragger {...props}>
								<p className="ant-upload-drag-icon">
									<img src={require('../../assests/images/upload_icon.svg')} width="161" />
								</p>
								<p className="ant-upload-text">
									Drag & drop files here or <span>Browse</span>
								</p>
							</Dragger>
						</div>
					</Col>
					<Col xl={6} lg={12} md={12} sm={24}>
						<ul>
							<li>ads</li>
							<li className="active">apps_and_websites</li>
							<li>calls_and_messages</li>
							<li>comments</li>
							<li>events</li>
							<li>stories</li>
						</ul>
					</Col>
					<Col xl={6} lg={12} md={12} sm={24}>
						<ul>
							<li>likes_and_reactions</li>
							<li>following_and_followers</li>
							<li>friends</li>
							<li>groups</li>
							<li>location</li>
							<li>your_places</li>
						</ul>
					</Col>
					<Col xl={6} lg={12} md={12} sm={24}>
						<ul>
							<li>other_activity</li>
							<li>pages</li>
							<li>payment_history</li>
							<li>posts</li>
							<li>marketplace</li>
							<li>profile_information</li>
						</ul>
					</Col>
					<Col xl={6} lg={12} md={12} sm={24}>
						<ul>
							<li>saved_items_and_collections</li>
							<li>search_history</li>
							<li>security_and_login_information</li>
							<li>messages</li>
						</ul>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	User: state.Auth.user,
});

export default connect(
	mapStateToProps,
	{ uploadSocialProfileFile, LoadingAction }
)(ProfileUploadComponent);
