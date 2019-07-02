import React from 'react';
import { Layout, Button, Input, Tabs, Icon, Popover } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { FacebookPost, InstagramPost } from './';
import Masonry from 'react-masonry-css';
import Slider from 'react-slick';
import moment from 'moment';
import { connect } from 'react-redux';
var _ = require('lodash');
const { Content, Sider } = Layout;

const breakpointColumnsObj = {
	default: 3,
	1100: 3,
	700: 2,
	500: 1,
};

const content = (
	<div className="feed_option">
		<p>Content</p>
		<p>Content</p>
	</div>
);

var settings = {
	dots: false,
	infinite: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	margin: 0,
	nav: true,
};

let output = [];

const toTitleCase = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();

class AllPostComponent extends React.Component {
	constructor(props) {
		super(props);

		this.onRenderFacebookFeed = this.onRenderFacebookFeed.bind(this);
		this.onRenderInstaFeed = this.onRenderInstaFeed.bind(this);
	}

	onRenderFacebookFeed = data => {
		output = [];
		
		if (!_.isArray(data) || (data && data.length == 0)) {
			if (localStorage.feed != undefined) {
				data = JSON.parse(localStorage.feed).facebook;
			}
		}

		if(data == undefined) {
			if (!_.isArray(data) && (data && data.length == 0)) {
				return;
			}
			return;
		}
		
		data.map((result, index) => {
			const { attachmentCount, attachmentData, message, commentCount, likesCount, created_time } = result;
			const createdDate = moment(new Date(created_time)).fromNow();

			let images = [];
			let description = '';

			{
				attachmentData.data.map((resu, index) => {					
					if (resu.media) {
						images.push(
							<div key={index}>
								<img src={resu.media.image.src} width="100%" />
							</div>
						);
					} else {
						description = resu.title;
					}
				});
			}

			output.push(
				<div className="tile" key={index}>
					<div className="feed_hdr d-flex">
						<div className="d-flex">
							<div className="avtar_social feeds">
								<img
									src={require('../../../assests/images/user/user.png')}
									width="44"
									className="user_img"
								/>
								<img
									src={require('../../../assests/images/facebook-small.svg')}
									className="social_icon"
									width="14"
								/>
							</div>
							<span>
								<span className="user_n">{toTitleCase(this.props.User.username)}</span>
								<span className="feed_time">{createdDate}</span>
							</span>
						</div>
						<Popover placement="bottomRight" content={content} trigger="click">
							<Icon type="ellipsis" />
						</Popover>
					</div>
					<div className="feed_content">
						<p>{message ? message : description}</p>
						{/* {console.log("description", description, message)} */}
						<Slider {...settings}>{images}</Slider>
					</div>
					<div className="feed_ftr pftr d-flex">
						<p>Like {likesCount}</p>
						<p>{commentCount} Comments</p>
					</div>
					<div className="feed_ftr d-flex">
						<Button>
							<img className="like" src={require('../../../assests/images/like.svg')} />
							<img className="liked" src={require('../../../assests/images/liked.svg')} />
						</Button>
						<Button>
							<img src={require('../../../assests/images/comment.svg')} />
						</Button>
						<Button>
							<img src={require('../../../assests/images/share.svg')} />
						</Button>
					</div>
				</div>
			);
		});
	};

	onRenderInstaFeed = data => {
		output = [];

		if (!_.isArray(data) || (data && data.length == 0)) {
			if (localStorage.feed != undefined) {
				data = JSON.parse(localStorage.feed).instagram;
			}
		}
		
		if(data == undefined) {
			if (!_.isArray(data) && (data && data.length == 0)) {
				return;
			}
			return;
		}
		
		return data.map((result, index) => {
			const { comments, created_time, likes, images } = result;
			const createdDate = moment(new Date(created_time * 1000)).fromNow();
			output.push(
				<div className="tile instagram image-element-class" key={index}>
					<div className="feed_hdr d-flex">
						<div className="d-flex">
							<div className="avtar_social feeds">
								<img
									src={require('../../../assests/images/user/user.png')}
									width="44"
									className="user_img"
								/>
								<img
									src={require('../../../assests/images/instagram-small.svg')}
									className="social_icon"
									width="14"
								/>
							</div>
							<span>
								<span className="user_n">{toTitleCase(this.props.User.username)}</span>
								<span className="feed_time">{createdDate}</span>
							</span>
						</div>
						<Popover placement="bottomRight" content={content} trigger="click">
							<Icon type="ellipsis" />
						</Popover>
					</div>
					<div className="feed_content">
						<div className="social_imgs">
							{/* <img src={require('../../../assests/images/feed/1.jpg')} width="100%" /> */}
							<Slider {...settings}>
								<div>
									<img src={images.standard_resolution.url} width="100%" />
								</div>
								{/* <div>
									<img src={require('../../../assests/images/feed/1.jpg')} width="100%" />
								</div>
								<div>
									<img src={require('../../../assests/images/feed/1.jpg')} width="100%" />
								</div> */}
							</Slider>
							{/* <span>
								<a href="#">+ 20</a>
							</span> */}
						</div>
					</div>
					<div className="feed_ftr ">
						<Button className="active">
							<img
								className="like"
								src={require('../../../assests/images/like-instagram.svg')}
								width="19"
							/>
							<img
								className="liked"
								src={require('../../../assests/images/liked-instagram.svg')}
								width="19"
							/>
						</Button>
						<Button>
							<img src={require('../../../assests/images/comment-instagram.svg')} width="19" />
						</Button>
						<Button>
							<img src={require('../../../assests/images/share-instagram.svg')} width="19" />
						</Button>
					</div>
					<div className="feed_ftr pftr">
						<p>
							<b>{likes.count} likes</b>
						</p>
						<p>View All {comments.count} Comments</p>
					</div>
					<div className="feed_content">
						{/* <p>
							What keeps employees happy and engaged at work? The answers may surprise you We dig into the
							results from the Udemy 2019 Workplace Happiness Report in this blog post.
						</p>
						<a href="javascript:void(0);">More</a> */}
					</div>
				</div>
			);
		});
	};

	render() {
		const { facebook, instagram, active } = this.props.data;
		if (active == 'instagram') {
			this.onRenderInstaFeed(instagram);
		} else if (active == 'facebook') {
			this.onRenderFacebookFeed(facebook);
		} else {
			output = [];
		}

		return (
			<div>
				<Scrollbars
					style={{ width: '100%', height: 600 }}
					autoHide
					// Hide delay in ms
					autoHideTimeout={1000}
					// Duration for hide animation in ms.
					autoHideDuration={200}
				>
					<div className="masonry-container">
						<Masonry
							breakpointCols={breakpointColumnsObj}
							className="my-masonry-grid"
							columnClassName="my-masonry-grid_column"
						>
							{/* <InstagramPost />
							<FacebookPost data={this.props.data.facebook} />*/}
							{/* {this.onRenderFacebookFeed(facebook)}
							{this.onRenderInstaFeed(instagram)} */}
							{output}
						</Masonry>
					</div>
				</Scrollbars>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	User: state.Auth.user,
});

export default connect(
	mapStateToProps,
	{}
)(AllPostComponent);
