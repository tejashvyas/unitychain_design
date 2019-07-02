import React from 'react';
import moment from 'moment';
import { Row, Typography, Col, Card, message, Button, Form, Modal, Descriptions, Input, Table } from 'antd';
import { connect } from 'react-redux';
import {
	generateTransaction,
	executeTransaction,
	showTransactionLog,
	showTrancsation,
} from '../../action/testnet.action';
import { LoadingAction } from '../../action/loading.action';
import axios from 'axios';

let URL = process.env.REACT_APP_TESTNET_API;

var _ = require('lodash');
const { Text } = Typography;

const { Title } = Typography;

class TestnetPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			NumberOfBatches: '',
			NumberOfTransactionInSingleBatch: '',
			status: { generate: true, transaction: false, showLogs: false, showTransaction: false },
			transactionData: [],
			transactionLogs: [],
			show: { transaction: false, logs: false, transactionLogs: false },
			transactionDetails: false,
			transactionList: {},
			executeTransactionList: [],
			showLogs: [],
			openModal: false,
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onClickToGenerate = this.onClickToGenerate.bind(this);
		this.onClickToTransaction = this.onClickToTransaction.bind(this);
		this.onClickToShowLog = this.onClickToShowLog.bind(this);
		this.onClickToShowTransaction = this.onClickToShowTransaction.bind(this);
	}

	onChangeInput = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onClickToGenerate = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.LoadingAction(true);

				this.props
					.generateTransaction(values)
					.then(res => {
						if (res.data.Status == 'Success') {
							this.setState({ status: { ...this.state.status, transaction: true, generate: false } });
							message.success(res.data.Message, 4);
						} else {
							message.error(res.data.Message);
						}
						this.props.LoadingAction(false);
					})
					.catch(e => this.props.LoadingAction(false));
			}
		});
	};

	onClickToTransaction = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.LoadingAction(true);
				this.props
					.executeTransaction(values)
					.then(res => {
						if (res.data.Status == 'Success') {
							const { TotalTime, BatchSize, NumberOfBatches, TotalTransaction, TPS } = res.data;

							this.setState({
								status: {
									...this.state.status,
									transaction: false,
									showTransaction: true,
									showLogs: true,
								},
								transactionData: res.data.Data,
								transactionList: { TotalTime, BatchSize, NumberOfBatches, TotalTransaction, TPS },
								transactionDetails: true,
							});
							message.success(res.data.Message, 4);
						} else {
							message.error(res.data.Message);
						}
						this.props.LoadingAction(false);
					})
					.catch(e => this.props.LoadingAction(false));
			}
		});
	};

	onClickToShowLog = e => {
		const { transactionData } = this.state;
		// if (!_.isEmpty(transactionData)) {
		// 	this.props.LoadingAction(true);
		// 	this.props.showTransactionLog(transactionData).then(res => {
		// 		this.props.LoadingAction(false);
		// 		if (res.status == '200') {
		this.setState({
			// transactionLogs: res.data == null ? [] : res.data,
			show: { ...this.state.show, logs: true, transaction: false, transactionLogs: false },
			transactionDetails: false,
		});
		// 		} else {
		// 			message.error(res.data.Message, 3);
		// 		}
		// 	});
		// }
	};

	onClickToShowTransaction = e => {
		// const { transactionData } = this.state;
		// this.props.LoadingAction(true);
		// this.props.showTrancsation(transactionData).then(res => {
		// 	this.props.LoadingAction(false);
		// 	if (res.status == '200') {
		this.setState({
			show: { ...this.state.show, logs: false, transaction: false, transactionLogs: true },
			// executeTransactionList: res.data.BatchTransaction,
			transactionDetails: false,
		});
		// 	} else {
		// 		message.error(res.data.Message, 3);
		// 	}
		// });
		// this.props.LoadingAction(true);

		// this.setState({ show: {...this.state.show, logs: false, transaction: true} });
		// this.props.LoadingAction(false);
	};

	generateShowLog = batchId => {
		const { transactionData } = this.state;
		if (this.state.show.transactionLogs) {
			this.props.LoadingAction(true);
			return this.props.showTrancsation([batchId]).then(res => {
				this.props.LoadingAction(false);
				if (res.status == '200') {
					this.setState({
						show: { ...this.state.show, logs: false, transaction: false, transactionLogs: true },
						showLogs: res.data[0],
						openModal: true,
						executeTransactionList: res.data.BatchTransaction[0].data,
					});
				}
				return res;
			});
		} else {
			this.props.LoadingAction(true);
			return this.props.showTransactionLog([batchId]).then(res => {
				this.props.LoadingAction(false);
				if (res.status == '200') {
					this.setState({
						show: { ...this.state.show, logs: true, transaction: false, transactionLogs: false },
						showLogs: res.data[0],
						openModal: true,
					});
				}
				return res;
			});
		}
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		const {
			NumberOfBatches,
			NumberOfTransactionInSingleBatch,
			transactionLogs,
			executeTransactionList,
			status,
			transactionData,
			transactionList,
			showLogs,
		} = this.state;

		let transactionDataList = [];
		let logs = transactionLogs.map(res => {
			return res.Value.map(result => {
				return result;
			});
		});

		const columns = [
			{
				title: 'NO.',
				dataIndex: 'id',
				width: 150,
			},
			{
				title: 'Batch Id',
				dataIndex: 'batchId',
			},
			{
				title: 'Action',
				dataIndex: '',
				key: 'x',
				render: record => (
					<button onClick={e => this.generateShowLog(record.batchId)}>
						{this.state.show.transactionLogs ? 'Show Transaction' : 'Show Details'}
					</button>
				),
			},
		];

		const columns2 = [
			{
				title: 'NO.',
				dataIndex: 'id',
				width: 150,
			},
			{
				title: 'Log',
				dataIndex: 'log',
			},
		];

		const columns3 = [
			{
				title: 'ID',
				dataIndex: 'ID',
				width: 50,
			},
			{
				title: 'Batch ID',
				dataIndex: 'BatchID',
				width: 200,
			},
			{
				title: 'From',
				dataIndex: 'From',
				width: 100,
			},
			{
				title: 'To',
				dataIndex: 'To',
				width: 100,
			},
			{
				title: 'Amount',
				dataIndex: 'Amount',
				width: 150,
			},
			{
				title: 'Status',
				dataIndex: 'Status',
				width: 50,
			},
		];

		const data1 =
			showLogs && showLogs.Value && showLogs.Value.length
				? showLogs.Value.map((res, index) => ({
						key: index,
						id: `${index + 1}`,
						log: res,
				  }))
				: [];

		const data2 = transactionData.map((res, index) => ({
			key: index,
			id: `${index + 1}`,
			batchId: res,
		}));

		const data3 = executeTransactionList.map((res, index) => ({
			key: index,
			ID: res.ID,
			BatchID: res.BatchID,
			From: res.From,
			To: res.To,
			Amount: res.Amount,
			Status: res.Status,
		}));

		return (
			<div className="main">
				<div className="section p-0">
					<div className={`slide_animation ${this.props.toggleUrl ? 'slideInUp' : 'slideInDown'} animated`}>
						<Row className="slide_animation slideInUp animated">
							<Row>
								<Col span={24}>
									<Title className="title">Testnet</Title>
								</Col>
								<Col span={24}>
									<Col span={24}>
										<div className="social_bx my-3 testnet">
											<Form>
												<Row type="flex" justify="space-between">
													<Col xl={8} lg={8} md={8} sm={24}>
														<Form.Item className="form-group mr-3">
															{getFieldDecorator('NumberOfBatches', {
																rules: [
																	{
																		required: true,
																		message: 'Enter number of batches',
																	},
																],
															})(
																<Input
																	type="number"
																	className={
																		this.state.NumberOfBatches
																			? 'input in_fill'
																			: 'input'
																	}
																	name="NumberOfBatches"
																	onChange={this.onChangeInput}
																	autoComplete="true"
																/>
															)}
															<label>Enter number of batches</label>
														</Form.Item>
													</Col>
													<Col xl={8} lg={8} md={8} sm={24}>
														<Form.Item className="form-group mr-3">
															{getFieldDecorator('NumberOfTransactionInSingleBatch', {
																rules: [
																	{
																		required: true,
																		message:
																			'Enter number of Transaction in a single batch',
																	},
																],
															})(
																<Input
																	type="number"
																	className={
																		this.state.NumberOfTransactionInSingleBatch
																			? 'input in_fill'
																			: 'input'
																	}
																	name="NumberOfTransactionInSingleBatch"
																	onChange={this.onChangeInput}
																	autoComplete="true"
																/>
															)}
															<label>Enter number of Transaction in a single batch</label>
														</Form.Item>
													</Col>
													<Col xl={8} lg={8} md={8} sm={24}>
														<div className="btn_group2">
															{this.state.status.generate && (
																<Button
																	className={`btn1`}
																	onClick={this.onClickToGenerate}
																>
																	GENERATE TRANSACTIONS
																</Button>
															)}
															{this.state.status.transaction && (
																<Button
																	className={`btn1`}
																	onClick={this.onClickToTransaction}
																>
																	Execute Transactions
																</Button>
															)}
															{this.state.status.showLogs && (
																<Button
																	className={`btn1`}
																	onClick={this.onClickToShowLog}
																>
																	Show Logs
																</Button>
															)}
															{this.state.status.showTransaction && (
																<Button
																	className={`btn1`}
																	onClick={this.onClickToShowTransaction}
																>
																	Show Transactions
																</Button>
															)}
														</div>
													</Col>
												</Row>
											</Form>
										</div>
									</Col>
								</Col>

								{/* {this.state.show.logs && logs.length > 0 && ( */}
								{/* show log */}
								{!this.state.transactionDetails &&
									(this.state.status.showLogs || this.state.status.showTransaction) && (
										<Col span={24}>
											<Col xl={18} lg={18} md={24}>
											<h3>{this.state.show.transactionLogs?"Transactions":"Logs"}</h3>
												<div className="blue_cont_bx social_bx m-0 p-3">
													<Table
														className="table"
														pagination={false}
														columns={columns}
														dataSource={data2}
														bordered={false}
														loading={false}
													/>
												</div>
											</Col>
										</Col>
									)}

								{/* {this.state.show.transactionLogs && ( */}
								{/* <Col span={24}>
										<Col xl={18} lg={18} md={24}>
											<div className="blue_cont_bx social_bx m-0 p-3">
												<Table
													className="table"
													pagination={false}
													columns={columns3}
													dataSource={data3}
												/>
											</div>
										</Col>
									</Col> */}
								{/* )} */}

								{this.state.transactionDetails && (
									<Col span={24}>
										<Descriptions title="Transaction" bordered>
											<Descriptions.Item label="Total Time">
												{transactionList.TotalTime}
											</Descriptions.Item>
											<Descriptions.Item label="Batch Size">
												{transactionList.BatchSize}
											</Descriptions.Item>
											<Descriptions.Item label="Number Of Batches">
												{transactionList.NumberOfBatches}
											</Descriptions.Item>
											<Descriptions.Item label="Total Transaction">
												{transactionList.TotalTransaction}
											</Descriptions.Item>
											<Descriptions.Item label="TPS">{transactionList.TPS}</Descriptions.Item>
										</Descriptions>
									</Col>
								)}
								<Modal
									className="model_data"
									title={this.state.show.transactionLogs?"Transactions":"Logs"}
									style={{ top: 20 }}
									visible={this.state.openModal}
									centered
									onOk={() => this.setState({ openModal: false })}
									onCancel={() => this.setState({ openModal: false })}
								>
									<Row>
										<Col span={24}>
											<Col xl={24} lg={24} md={24}>
												<div className="blue_cont_bx social_bx m-0 p-3">
													<Table
														className="table tbl2"
														pagination={false}
														columns={this.state.show.transactionLogs ? columns3 : columns2}
														dataSource={this.state.show.transactionLogs ? data3 : data1}
														bordered={false}
														loading={false}
													/>
												</div>
											</Col>
										</Col>
									</Row>
								</Modal>
							</Row>
						</Row>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(
	null,
	{ generateTransaction, executeTransaction, showTransactionLog, showTrancsation, LoadingAction }
)(Form.create({ name: 'testnet' })(TestnetPage));
