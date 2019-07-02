import React from 'react';
import { Row, Typography, Card, Col, Modal } from 'antd';
import Slider from 'react-slick';
import {Doughnut} from 'react-chartjs-2';

const { Title, Text } = Typography;
const { Meta } = Card;
const data2 = {
    labels: [
        'Video',
        'Audio',
        'Photos',
        'Free Space'
    ],
    datasets: [{
        data: [50, 25,15,10],
        backgroundColor: [
        '#74C6F1',
        '#8CD7B9',
        '#AC92D4',
        '#D2D2D2'
        ],
        hoverBackgroundColor: [
        '#74C6F1',
        '#8CD7B9',
        '#AC92D4',
        '#D2D2D2'
        ],
     }
     
],

};

const options2 = {
responsive: true,
legend: { display: false },
cutoutPercentage:90,

elements: {
    arc: {
        borderWidth:0,        
    }
}
};

class MediaComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            visible: false,
            visible2: false,
        };
       
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
      showModal2 = () => {
        this.setState({
          visible2: true,
        });
      };
    
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };
      handleCancel2 = e => {
        this.setState({
          visible2: false,
        });
      };
    render() {
        var settings = {
			speed: 500,
			infinite: true,
			arrows: false,
			margin: 15,
			slidesToScroll: 2,
			variableWidth: true,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						slidesToScroll: 1,
					},
				},
			],
        };
        
       return (
                
			<div className="media slideInUp animated">
                <Row className="mt-3">
                    <Col xl={12} md={24}>
                        <div className="doc_bx2 p-2 m-0">
                            <Title className="title_24">Storage</Title>
                            <div className="d-flex">
                                <div className="pie_chart">
                                    <label>90%</label>
                                    <Doughnut data={data2} options={options2}/>
                                </div>
                                <ul className="list_unstyled">
                                    <li><img src={require('../../assests/images/c1.svg')} width="130"/></li>
                                    <li><img src={require('../../assests/images/c2.svg')} width="95"/></li>
                                    <li><img src={require('../../assests/images/c3.svg')} width="84"/></li>
                                    <li><img src={require('../../assests/images/c4.svg')} width="84"/></li>
                                </ul>
                            </div>
                            


                        </div>
                    </Col>
                    <Col xl={12} md={24} className="pfs myuploads media_status">
                    <Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs1 bxs">
								<Card
									className="card_blue card_bx d-flex"
									cover={<img src={require('../../assests/images/all-media.svg')} />}
								>
									<Meta
										title="768"
										description={
											<div className="des">
												<span>All Media</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
						<Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs2 bxs">
								<Card
									className="card_purple card_bx d-flex"
									cover={<img src={require('../../assests/images/photos.svg')} />}
								>
									<Meta
										title="135"
										description={
											<div className="des">
												<span>Photos</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
						<Col lg={12} md={12} sm={12} xs={24}>
							<div className="bxs3 bxs">
								<Card
									className="card_gray card_bx d-flex"
									cover={<img src={require('../../assests/images/audio.svg')} />}
								>
									<Meta
										title="415"
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
							<div className="bxs4 bxs">
								<Card
									className="card_orange card_bx d-flex"
									cover={<img src={require('../../assests/images/video.svg')} />}
								>
									<Meta
										title="218"
										description={
											<div className="des">
												<span>Video</span>
											</div>
										}
									/>
								</Card>
							</div>
						</Col>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" className="mt-3">
                            <Title className="title">Photos</Title>
                            <ul className="action_grp">
                                <li><a className="link" href="#"><img src={require('../../assests/images/link.svg')} /></a></li>
                                <li><a className="link" href="#"><img src={require('../../assests/images/garbage.svg')} /></a></li>
                                <li><a className="link" href="#"><img src={require('../../assests/images/share-doc.svg')} /></a></li>
                                <li><a className="link" href="#">SHOW ALL</a></li>
                            </ul>                        
                        </Row>
				<Row className="ao media dash-slider clearfix">
                        <Slider {...settings}>
                            <Card
                                className="item media_bx"
                                cover={<img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />}
                            >
                                <Meta
                                    title={
                                        <Row type="flex" justify="space-between">
                                            <p>Nature Love.jpg</p>
                                            <span>1 Day ago</span>
                                        </Row>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<img alt="Nature Love" src={require('../../assests/images/media/2.jpg')} />}
                            >
                                <Meta
                                    title={
                                        <Row type="flex" justify="space-between">
                                            <p>Nature Love.jpg</p>
                                            <span>1 Day ago</span>
                                        </Row>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<img alt="Nature Love" src={require('../../assests/images/media/3.jpg')} />}
                            >
                                <Meta
                                    title={
                                        <Row type="flex" justify="space-between">
                                            <p>Nature Love.jpg</p>
                                            <span>1 Day ago</span>
                                        </Row>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<img alt="Nature Love" src={require('../../assests/images/media/4.jpg')} />}
                            >
                                <Meta
                                    title={
                                        <Row type="flex" justify="space-between">
                                            <p>Nature Love.jpg</p>
                                            <span>1 Day ago</span>
                                        </Row>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<img alt="Nature Love" src={require('../../assests/images/media/5.jpg')} />}
                            >
                                <Meta
                                    title={
                                        <Row type="flex" justify="space-between">
                                            <p>Nature Love.jpg</p>
                                            <span>1 Day ago</span>
                                        </Row>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />}
                            >
                                <Meta
                                    title={
                                        <Row type="flex" justify="space-between">
                                            <p>Nature Love.jpg</p>
                                            <span>1 Day ago</span>
                                        </Row>
                                    }
                                />
                            </Card>
                        </Slider>
					</Row>
                    <Row type="flex" justify="space-between" className="mt-3">
                            <Title className="title">Audios</Title>
                            <ul className="action_grp">
                                <li><a className="link" href="#"><img src={require('../../assests/images/link.svg')} /></a></li>
                                <li><a className="link" href="#"><img src={require('../../assests/images/garbage.svg')} /></a></li>
                                <li><a className="link" href="#"><img src={require('../../assests/images/share-doc.svg')} /></a></li>
                                <li><a className="link" href="#">SHOW ALL</a></li>
                            </ul>                        
                        </Row>
                        <Row className="ao r_mar clearfix audio_list">
                        <Modal
                            visible={this.state.visible2}
                            onCancel={this.handleCancel2}
                            className="audio_popup"
                            footer={null}
                            >
                                <audio controls>
                                    <source src={require('../../assests/images/rolemusic.mp3')} type="audio/mpeg"/>                                
                                    Your browser does not support the audio element.
                                </audio>                            
                        </Modal>
                            <Col lg={8} md={12} sm={12} xs={24} >
                                <Card className="doc_bx2">
                                    <Row type="flex">
                                        <img
                                            src={require('../../assests/images/media/1.jpg')}
                                            width="113" height="99"
                                        />
                                        <div className="detail">
                                            <Text className="tag">#Trending</Text>
                                            <Text className="name2">File name</Text>
                                            <Text className="time2">Chris Brown</Text>
                                        </div>
                                        <img
                                            className="ply_btn"
                                            src={require('../../assests/images/ply_grn.svg')}
                                            width="69"
                                            onClick={this.showModal2}
                                        />
                                    </Row>										
                                </Card>
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24} >
                                <Card className="doc_bx2">
                                    <Row type="flex">
                                        <img
                                            src={require('../../assests/images/media/1.jpg')}
                                            width="113" height="99"
                                        />
                                        <div className="detail">
                                            <Text className="tag">#Trending</Text>
                                            <Text className="name2">File name</Text>
                                            <Text className="time2">Chris Brown</Text>
                                        </div>
                                        <img
                                        className="ply_btn"
                                            src={require('../../assests/images/ply_grn.svg')}
                                            width="69"
                                            onClick={this.showModal2}
                                        />
                                    </Row>										
                                </Card>
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24} >
                                <Card className="doc_bx2">
                                    <Row type="flex">
                                        <img
                                            src={require('../../assests/images/media/1.jpg')}
                                            width="113" height="99"
                                        />
                                        <div className="detail">
                                            <Text className="tag">#Trending</Text>
                                            <Text className="name2">File name</Text>
                                            <Text className="time2">Chris Brown</Text>
                                        </div>
                                        <img
                                        className="ply_btn"
                                            src={require('../../assests/images/ply_grn.svg')}
                                            width="69"
                                            onClick={this.showModal2}
                                        />
                                    </Row>										
                                </Card>
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24} >
                                <Card className="doc_bx2">
                                    <Row type="flex">
                                        <img
                                            src={require('../../assests/images/media/1.jpg')}
                                            width="113" height="99"
                                        />
                                        <div className="detail">
                                            <Text className="tag">#Trending</Text>
                                            <Text className="name2">File name</Text>
                                            <Text className="time2">Chris Brown</Text>
                                        </div>
                                        <img
                                        className="ply_btn"
                                            src={require('../../assests/images/ply_grn.svg')}
                                            width="69"
                                            onClick={this.showModal2}
                                        />
                                    </Row>										
                                </Card>
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24} >
                                <Card className="doc_bx2">
                                    <Row type="flex">
                                        <img
                                            src={require('../../assests/images/media/1.jpg')}
                                            width="113" height="99"
                                        />
                                        <div className="detail">
                                            <Text className="tag">#Trending</Text>
                                            <Text className="name2">File name</Text>
                                            <Text className="time2">Chris Brown</Text>
                                        </div>
                                        <img
                                        className="ply_btn"
                                            src={require('../../assests/images/ply_grn.svg')}
                                            width="69"
                                            onClick={this.showModal2}
                                        />
                                    </Row>										
                                </Card>
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24} >
                                <Card className="doc_bx2">
                                    <Row type="flex">
                                        <img
                                            src={require('../../assests/images/media/1.jpg')}
                                            width="113" height="99"
                                        />
                                        <div className="detail">
                                            <Text className="tag">#Trending</Text>
                                            <Text className="name2">File name</Text>
                                            <Text className="time2">Chris Brown</Text>
                                        </div>
                                        <img
                                        className="ply_btn"
                                            src={require('../../assests/images/ply_grn.svg')}
                                            width="69"
                                            onClick={this.showModal2}
                                        />
                                    </Row>										
                                </Card>
                            </Col>
                            
                        </Row>
                    <Row type="flex" justify="space-between" className="mt-3">
                            <Title className="title">Videos</Title>
                            <ul className="action_grp">
                                <li><a className="link" href="#"><img src={require('../../assests/images/link.svg')} /></a></li>
                                <li><a className="link" href="#"><img src={require('../../assests/images/garbage.svg')} /></a></li>
                                <li><a className="link" href="#"><img src={require('../../assests/images/share-doc.svg')} /></a></li>
                                <li><a className="link" href="#">SHOW ALL</a></li>
                            </ul>                        
                        </Row>
				    <Row className="ao media dash-slider clearfix">
                        <Modal
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            className="video_popup"
                            footer={null}
                            >
                            <video width="100%" controls>
                                <source src={require('../../assests/images/mov_bbb.mp4')} type="video/mp4"/>
                                Your browser does not support HTML5 video.
                            </video>
                        </Modal>
                        <Slider {...settings}>
                            <Card
                                className="item media_bx"
                                cover={<a href="#" className="video_ply" onClick={this.showModal}>
                                    <img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />
                                    <img alt="Nature Love" src={require('../../assests/images/play-btn.svg')} className="ply"/>
                                </a>
                            
                            }
                            >
                                <Meta
                                    title={
                                        <div>
                                            <p>Nature Love.jpg</p>
                                            <Row type="flex" justify="space-between">
                                                <span>421 Views</span>
                                                <span>3 Week ago</span>
                                            </Row>
                                        </div>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<a href="#" className="video_ply" onClick={this.showModal}>
                                    <img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />
                                    <img alt="Nature Love" src={require('../../assests/images/play-btn.svg')} className="ply"/>
                                </a>
                            
                            }
                            >
                                <Meta
                                    title={
                                        <div>
                                            <p>Nature Love.jpg</p>
                                            <Row type="flex" justify="space-between">
                                                <span>421 Views</span>
                                                <span>3 Week ago</span>
                                            </Row>
                                        </div>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<a href="#" className="video_ply" onClick={this.showModal}>
                                    <img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />
                                    <img alt="Nature Love" src={require('../../assests/images/play-btn.svg')} className="ply"/>
                                </a>
                            
                            }
                            >
                                <Meta
                                    title={
                                        <div>
                                            <p>Nature Love.jpg</p>
                                            <Row type="flex" justify="space-between">
                                                <span>421 Views</span>
                                                <span>3 Week ago</span>
                                            </Row>
                                        </div>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<a href="#" className="video_ply" onClick={this.showModal}>
                                    <img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />
                                    <img alt="Nature Love" src={require('../../assests/images/play-btn.svg')} className="ply"/>
                                </a>
                            
                            }
                            >
                                <Meta
                                    title={
                                        <div>
                                            <p>Nature Love.jpg</p>
                                            <Row type="flex" justify="space-between">
                                                <span>421 Views</span>
                                                <span>3 Week ago</span>
                                            </Row>
                                        </div>
                                    }
                                />
                            </Card>
                            <Card
                                className="item media_bx"
                                cover={<a href="#" className="video_ply" onClick={this.showModal}>
                                    <img alt="Nature Love" src={require('../../assests/images/media/1.jpg')} />
                                    <img alt="Nature Love" src={require('../../assests/images/play-btn.svg')} className="ply"/>
                                </a>
                            
                            }
                            >
                                <Meta
                                    title={
                                        <div>
                                            <p>Nature Love.jpg</p>
                                            <Row type="flex" justify="space-between">
                                                <span>421 Views</span>
                                                <span>3 Week ago</span>
                                            </Row>
                                        </div>
                                    }
                                />
                            </Card>
                        </Slider>
                        
					</Row>
						
			</div>
				            
        )
    }

}

export default MediaComponent;