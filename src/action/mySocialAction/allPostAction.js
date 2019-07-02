import axios from 'axios';
let NODE_URL = process.env.REACT_APP_NODE_API;

function authManage() {
	return dispatch => {
		// axios.request({ method: 'get', url: 'http://192.168.0.137:4300/unitychain/social/fb/auth', "Content-Type": "application/x-www-form-urlencoded", crossDomain: true })
		// axios.get('http://192.168.0.137:4300/unitychain/social/fb/auth').then(row => {
		// 	console.log("rowsadsad", row)
		// });
		// axios.get('http://3.18.139.243:8309/unitychain/static/facebook/fetchFacebookData').then(row => {
		// 	axios
		// 		.post(`http://3.18.139.243:8309/unitychain/social/mapFacebook/${123445567}`, row.data.obj)
		// 		.then(rows => {
		// 			console.log('rows', rows);
		// 		});
		// });
	};
}

function getSocialFeed(status, id) {
	return dispatch => {
		return axios.get(`${NODE_URL}/unitychain/social/${status}/feeds/${id}`).then(res => res);
	};
}

function getUseState() {
	
}

export { authManage, getSocialFeed };
