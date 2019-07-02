import React from 'react';
import {
	LoginComponent,
	ForgotPasswordComponent,
	CreateUnitychainIdComponent,
	RegistrationConfirmComponent,
} from '../../components/Login';
import { connect } from 'react-redux';
import { LoadingAction } from '../../action/loading.action';

class Loign extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pageName: 'LoginComponent',
			userData: {},
		};

		this.onClickToChangeComponent = this.onClickToChangeComponent.bind(this);
	}

	componentDidMount() {
		this.props.LoadingAction(false);
	}

	onClickToChangeComponent = component => {
		this.setState({ pageName: component });
	};

	onHandleUserData = data => {
		this.setState({ userData: data });
	};

	render() {
		const { pageName, userData } = this.state;

		return (
			<>
				{pageName == 'LoginComponent' && (
					<LoginComponent history={this.props.history} onClick={this.onClickToChangeComponent} />
				)}
				{pageName == 'ForgotPasswordComponent' && (
					<ForgotPasswordComponent onClick={this.onClickToChangeComponent} />
				)}
				{pageName == 'CreateUnitychainIdComponent' && (
					<CreateUnitychainIdComponent
						history={this.props.history}
						onHandleUserData={this.onHandleUserData}
						onClick={this.onClickToChangeComponent}
					/>
				)}
				{pageName == 'RegistrationConfirmComponent' && (
					<RegistrationConfirmComponent
						history={this.props.history}
						onClick={this.onClickToChangeComponent}
						data={userData}
					/>
				)}
			</>
		);
	}
}

export default connect(
	null,
	{ LoadingAction }
)(Loign);
