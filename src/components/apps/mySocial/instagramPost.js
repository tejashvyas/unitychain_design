import React from 'react';
import { Button, Icon, Popover } from 'antd';
import Slider from 'react-slick';
var _ = require('lodash');

const content = (
	<div className="feed_option">
		<p>Content</p>
		<p>Content</p>
	</div>
);

class InstagramPost extends React.Component {
	render() {
		var settings = {
			dots: false,
			infinite: false,
			slidesToShow: 1,
            slidesToScroll: 1,
            margin: 0,
            nav: true

		};

		return (
			<>
				<div className="tile instagram">
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
								<span className="user_n">Alice Hennry</span>
								<span className="feed_time">Yesterday at 2.28 PM</span>
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
									<img src={require('../../../assests/images/feed/1.jpg')} width="100%" />
								</div>
								<div>
									<img src={require('../../../assests/images/feed/1.jpg')} width="100%" />
								</div>
								<div>
									<img src={require('../../../assests/images/feed/1.jpg')} width="100%" />
								</div>
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
							<b>2 likes</b>
						</p>
						<p>View All 2 Comments</p>
					</div>
					<div className="feed_content">
						<p>
							What keeps employees happy and engaged at work? The answers may surprise you We dig into the
							results from the Udemy 2019 Workplace Happiness Report in this blog post.
						</p>
						<a href="#">More</a>
					</div>
				</div>
			</>
		);
	}
}

export default InstagramPost;
