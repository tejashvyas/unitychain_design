import React from 'react';
import { Row, Typography, Select } from 'antd';
import {
	ProfileComponent,
	ProfileUploadComponent,
	AccountSettingComponent,
	MyPreferenceComponent,
} from '../../components/profile';

const { Title } = Typography;
const { Option } = Select;

class ProfilePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			profile: 'profile',
			importData: false,
		};

		this.onChangeProfile = this.onChangeProfile.bind(this);
		this.onChangeImportData = this.onChangeImportData.bind(this);
	}

	onChangeProfile = value => {
		this.setState({ profile: value });
	};

	onChangeImportData = () => {
		this.setState({ importData: !this.state.importData });
	};

	render() {
		const { profile, importData } = this.state;

		return (
			<div className="main">
				<div className="section p-0">
					<div className={`slide_animation ${this.props.toggleUrl ? 'slideInUp' : 'slideInDown'} animated`}>
						<Row type="flex" justify="space-between" className="slide_animation slideInUp animated">
							<Row type="flex">
								<Title className="title">App Overview</Title>
								<Select
									name="profile"
									className="title_menu"
									onChange={this.onChangeProfile}
									value={profile}
								>
									<Option value="profile">Profile</Option>
									<Option value="myPreference">My Preference</Option>
									<Option value="accountSetting">Account Setting</Option>
								</Select>
							</Row>
							{profile == 'profile' && importData && (
								<a className="link back" href="javascript:void(0);" onClick={this.onChangeImportData}>
									<img src={require('../../assests/images/back.svg')} width="72" />
								</a>
							)}
						</Row>

						{profile == 'profile' && !importData && <ProfileComponent onClick={this.onChangeImportData} />}
						{profile == 'profile' && importData && <ProfileUploadComponent history={this.props.history} />}
						{profile == 'myPreference' && <MyPreferenceComponent />}
						{profile == 'accountSetting' && <AccountSettingComponent />}
					</div>
				</div>
			</div>
		);
	}
}

export default ProfilePage;
