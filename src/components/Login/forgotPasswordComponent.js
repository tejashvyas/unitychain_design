import React from 'react';
import { Typography, Form, Input, Button } from 'antd';

const { Title,Text } = Typography;

class RegistrationComponent extends React.Component {

    render() {
        return(
            <div className="loginPage">
			<div className="login_bx">
				<div className="login_bx_inr">
				<div className="first_part my-5">
					<a href="#" className="close"><img src={require('../../assests/images/close.svg')} width="13"/></a>
					<Title level={4} className="title animated fadeIn a">FORGOT PASSWORD</Title>
                    <Text className="text animated fadeIn b">Please check your register email.
we have sent one-time password for change
password. Don't share with others.</Text>
					<Form className="login-form">
						<Form.Item className="animated fadeIn c">
							<Input type="text" placeholder="Enter OTP"/>
						</Form.Item>
						<Form.Item className="animated fadeIn d">
							<Button type="submit" className="login-button">
                                LOGIN NOW
							</Button>
						</Form.Item>
						
					</Form>
				</div>
				</div>
			</div>
		</div>
        );
    }

}

export default RegistrationComponent;