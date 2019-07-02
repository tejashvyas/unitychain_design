import React from 'react';
import { Row, Col, Card } from 'antd';
import {PdfComponent, DocComponent, PptComponent, XlsComponent, ZipComponent} from './docfiles';

const { Meta } = Card;

class DocumentsComponent extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		
		return (
			<div className="slideInUp animated doc_page">
						<Row className="ao document">
						<Col lg={6} md={12} sm={12} xs={24}>
								<div className="bxs4 bxs">
									<Card
										className="card_orange card_bx"
										cover={<img src={require('../../assests/images/status-social/d1.svg')} />}
									>
										<Meta
											title="15,200"
											description={
												<div className="des">
													<span>Engagement Rate</span>
												</div>
											}
										/>
									</Card>
								</div>
							</Col>
							<Col lg={18} md={12} sm={12} xs={24}>
								<Row>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="5148"
												description={
													<div className="des">
														<span>Pdf</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="3251"
												description={
													<div className="des">
														<span>Doc</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="2154"
												description={
													<div className="des">
														<span>Excel</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="3854"
												description={
													<div className="des">
														<span>PPT</span>
													</div>
												}
											/>
										</Card>
									</Col>
									<Col xl={8} lg={12} md={24} sm={24} xs={24}>
										<Card className="doc_bx">
											<Meta
												title="2514"
												description={
													<div className="des">
														<span>Zip</span>
													</div>
												}
											/>
										</Card>
									</Col>
								</Row>
							</Col>
						</Row>
						
						<PdfComponent/>
						<XlsComponent/>
						<DocComponent/>
						<ZipComponent/>
						<PptComponent/>
						
						
					</div>
				
		);
	}
}

export default DocumentsComponent;
