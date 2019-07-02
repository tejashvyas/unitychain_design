import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends React.Component {
		componentDidMount() {
			if(!this.props.auth.isAuthenticate) {
				this.props.history.push('/');
			} else {
				if(this.props.history.location.pathname == '/') {
					this.props.history.push('/dashboard');
				} else {
						
				}
			}
		}

		componentWillUpdate() {}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	const mapStateToProps = state => ({
		auth: state.Auth,
	});

	return connect(mapStateToProps)(Authentication);
}
