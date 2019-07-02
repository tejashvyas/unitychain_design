import React from 'react';
import { Row, Col, Card } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

const { Meta } = Card;

class AddSocialAccount extends React.Component {
	render() {
		let content = [];

		let images = ['facebook-big.svg','google-plus-big.svg','twitter-big.svg','instagram-big.svg' , 'linkedin-big.svg'];
		for (let index = 0, k = 0; index < 5; index++) {
			if (index % images.length == 0) {
				k = 0;
			} else {
				k++;
            }
            
			content.push(
				<Col key={index} xl={4} lg={6} md={8} xs={12}>
					<Card
						hoverable
						className="social_accounts"
						cover={<img src={require(`../../../assests/images/${images[k]}`)} />}
					>
						<Meta
							description={
								<div className="action_btns">
									<a href="#" className="add_account">Add Account</a>
									<a className="edit install" href="javascript:void(0)">Install</a>
								</div>
							}
						/>
					</Card>
				</Col>
			);
		}

		return <div>
				<Col span={24} className="add_social">
					<Card
						title="Add Social Account"
					>
					<Row className="ao r_mar">
						<Scrollbars
							style={{ width: '100%', height: 500 }}
							autoHide
							// Hide delay in ms
							autoHideTimeout={1000}
							// Duration for hide animation in ms.
							autoHideDuration={200}
						>
						{content}
						</Scrollbars>
					</Row>
					</Card>
				</Col>
		</div>;
	}
}

export default AddSocialAccount;