import React from 'react';
import {Row, Col, Typography, Progress, Radio, Pagination, Card, DatePicker, Form, Input } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';

const {Text} = Typography;

class MyPreferenceComponent extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            dateofbirth: ''
        }
    }
    
    render() {
       return (
            <div className="my_preference ao r_mar slideInUp animated">
                <div className="blue_cont_bx p-3">
                    <Text className="f20">Questions (Showing 298 results)</Text>
                    <Progress percent={30} status="active" />
                    <div className="op_select">
                        <Scrollbars
                            style={{ width: '100%'}}
                            autoHeight
                            onScroll={this.handleScroll}
                            autoHide
                            // Hide delay in ms
                            autoHideTimeout={1000}
                            // Duration for hide animation in ms.
                            autoHideDuration={200}
                        >

                            <Radio.Group>
                                <Radio value={1}>Personal Details</Radio>
                                <Radio value={2}>Shopping </Radio>
                                <Radio value={3}>Games</Radio>
                                <Radio value={4}>Entertaiment</Radio>
                                <Radio value={5}>Social Networking</Radio>
                                <Radio value={6}>Document</Radio>
                            </Radio.Group>
                        </Scrollbars>
                    </div>
                    <Row type="flex" className="step_hdr">
                        <Pagination size="small" total={300} />
                        <Text className="f18">Showing 1-3 of 298 results</Text>
                    </Row>
                    <div className="step_content mt-3">
                    <Card title="What is your date of Birth?" className="purpal_box">
                    <Col xl={6} lg={12} md={24}>
                        <Form.Item className="form-group mt-3">
                            <DatePicker
                                format="D MMM YYYY"
                                className={
                                    this.state.dateofbirth
                                        ? 'input datepicker icon_calender in_fill'
                                        : 'input datepicker icon_calender'
                                }
                                name="dateofbirth"
                                onChange={e => {
                                    this.setState({
                                        dateofbirth: e != null ? moment(e._d).format('D MMM YYYY') : '',
                                    });
                                }}
                            />
                            <label className="date_lbl">Date of Birth</label>
                        </Form.Item>
                    </Col>
                    </Card>
                    <Card title="Which is your favorite colour?" className="green_box mt-3">
                    <Col xl={24} lg={24} md={24}>
                    <Radio.Group className="mt-3">
                        <Radio value={51} className="red">Red</Radio>
                        <Radio value={52} className="green">Green </Radio>
                        <Radio value={53} className="yellow">Yellow</Radio>
                        <Radio value={54} className="orange">Orange</Radio>
                        <Radio value={55} className="blue">Blue</Radio>
                        <Radio value={56} className="black">Black</Radio>
                        <Radio value={57} className="white">White</Radio>
                    </Radio.Group>
                    </Col>
                    </Card>
                    <Card title="Where do you live?" className="orange_box mt-3">
                    <Col xl={6} lg={12} md={24}>
                        <Form.Item className="form-group mt-3">
                            <Input
                                type="text"
                                className={this.state.place ? 'input in_fill' : 'input'}
                                name="Place"
                                onChange={this.onChangeInput}
                                autoComplete="true"
                            />
                            <label className="date_lbl">Place</label>
                        </Form.Item>
                    </Col>
                    </Card>
                    </div>
                    
                </div>
            </div>
        )
    }

}

export default MyPreferenceComponent;