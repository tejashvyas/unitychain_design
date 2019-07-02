import React from 'react';
import { Row, Col, Card, Typography } from 'antd';


const { Text, Title } = Typography;


class PdfComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {

		return (
			<div>
			<Row type="flex" justify="space-between" className="mt-3">
				<Title className="title">PDF Files</Title>
				<ul className="action_grp">
					<li><a className="link" href="#"><img src={require('../../../assests/images/link.svg')} /></a></li>
					<li><a className="link" href="#"><img src={require('../../../assests/images/garbage.svg')} /></a></li>
					<li><a className="link" href="#"><img src={require('../../../assests/images/share-doc.svg')} /></a></li>
					<li><a className="link" href="#">SHOW ALL</a></li>
				</ul>
				
			</Row>
			<Row className="ao r_mar clearfix">
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
			<Col lg={6} md={12} sm={12} xs={24} >
				<Card className="doc_bx2">
					<Row type="flex">
						<img
							src={require('../../../assests/images/doc/pdf.svg')}
							width="113" height="99"
						/>
						<div className="detail">
							<Text className="name2">File name</Text>
							<Text className="time2">1 Day ago</Text>
						</div>
					</Row>										
				</Card>
			</Col>
		</Row>
		</div>
		);
	}
}

export default PdfComponent;
