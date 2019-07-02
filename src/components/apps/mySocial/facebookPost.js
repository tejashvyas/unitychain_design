import React from 'react';
import { Button, Icon, Popover } from 'antd';

const content = (
	<div className="feed_option">
		<p>Content</p>
		<p>Content</p>
	</div>
);

class FacebookPost extends React.Component {
	render() {
        const { attachmentCount, attachmentData, commentCount, likesCount, created_time } = this.props.data;
        
		return (
			<>
				<div className="tile">
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
								<span className="user_n">Alice Hennry</span>
								<span className="feed_time">2 hrs</span>
							</span>
						</div>
						<Popover placement="bottomRight" content={content} trigger="click">
							<Icon type="ellipsis" />
						</Popover>
					</div>
					<div className="feed_content">
						<p>
							What keeps employees happy and engaged at work? The answers may surprise you We dig into the
							results from the Udemy 2019 Workplace Happiness Report in this blog post.
						</p>
						<a href="#">More</a>
						<img src={require('../../../assests/images/feed/1.jpg')} width="100%" />
					</div>
					<div className="feed_ftr pftr d-flex">
						<p>Like 22</p>
						<p>2 Comments</p>
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
			</>
		);
	}
}

export default FacebookPost;
