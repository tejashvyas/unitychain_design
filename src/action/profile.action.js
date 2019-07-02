import axios from 'axios';
let NODE_URL = process.env.REACT_APP_NODE_API;

export const uploadSocialProfileFile = (data, userId) => {
    return dispatch => {
        axios.request({ method: 'post', url: `${NODE_URL}/unitychain/static/facebook/uploadData/${userId}`, data: data,
			'Content-Type': 'application/x-www-form-urlencoded',
			crossDomain: true,
		});
    }
}