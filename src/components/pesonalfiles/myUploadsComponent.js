import React from 'react';
import { Row, Col, Upload, message, Card, Typography } from 'antd';
const Dragger = Upload.Dragger;

const { Meta } = Card;
const { Title,Text } = Typography;

const props = {
	name: 'file',
	multiple: true,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	onChange(info) {
		const status = info.file.status;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

class MyUploadsComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {

		return (
			<div className="myuploads slideInUp animated">
				<Row className="file_list">
					<Col xl={16} lg={12} md={24}>
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
					<Col xl={8} lg={12} md={24} className="pfs">
						<Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs1 bxs">
								<Card
									className="card_blue card_bx"
									cover={<img src={require('../../assests/images/audio.svg')} />}
								>
									<Meta
										title="145"
										description={
											<div className="des">
												<span>Audio</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
						<Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs2 bxs">
								<Card
									className="card_purple card_bx"
									cover={<img src={require('../../assests/images/video.svg')} />}
								>
									<Meta
										title="210"
										description={
											<div className="des">
												<span>Video</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
						<Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs3 bxs">
								<Card
									className="card_gray card_bx"
									cover={<img src={require('../../assests/images/image.svg')} />}
								>
									<Meta
										title="615"
										description={
											<div className="des">
												<span>Image</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
						<Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs4 bxs">
								<Card
									className="card_orange card_bx"
									cover={<img src={require('../../assests/images/document.svg')} />}
								>
									<Meta
										title="410"
										description={
											<div className="des">
												<span>Document</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
					</Col>
					
				</Row>
				<Row type="flex" justify="space-between" className="mt-3">
					<Title className="title">Files</Title>
					<ul className="action_grp">
						<li><a className="link" href="#"><img src={require('../../assests/images/link.svg')} /></a></li>
						<li><a className="link" href="#"><img src={require('../../assests/images/garbage.svg')} /></a></li>
						<li><a className="link" href="#"><img src={require('../../assests/images/share-doc.svg')} /></a></li>
						<li><a className="link" href="#">SHOW ALL</a></li>
					</ul>
					
				</Row>
				<Row className="ao r_mar clearfix">
					<Col lg={6} md={12} sm={12} xs={24} >
						<Card className="doc_bx2">
							<Row type="flex">
								<img
									src={require('../../assests/images/media/1.jpg')}
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
									src={require('../../assests/images/doc/ppt.svg')}
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
									src={require('../../assests/images/doc/pdf.svg')}
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
									src={require('../../assests/images/doc/doc.svg')}
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
									src={require('../../assests/images/doc/doc.svg')}
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
									src={require('../../assests/images/doc/zip.svg')}
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
									src={require('../../assests/images/doc/doc.svg')}
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
									src={require('../../assests/images/doc/xls.svg')}
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

export default MyUploadsComponent;
