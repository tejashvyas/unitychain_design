import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class DefaultFooter extends React.Component {
	render() {
		return <Footer style={{ textAlign: 'center' }}>Unitychain ©{new Date().getFullYear()}</Footer>;
	}
}

export default DefaultFooter;
