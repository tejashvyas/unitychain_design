import axios from 'axios';
import { AUTHENTICATION_TYPE, SOCIAL_AUTH_ACTION, CHANGE_TOGGLE } from '../reducers/reducer.types';
let URL = process.env.REACT_APP_GO_API;
let NODE_URL = process.env.REACT_APP_NODE_API;

export const setCurrentUser = user => ({
	type: 'AUTHENTICATION_TYPE',
	user,
});

export const loginUser = data => {
	return async dispatch => {
		let res = await axios.request({
			method: 'post',
			url: `${URL}/users/login`,
			data: data,
			'Content-Type': 'application/x-www-form-urlencoded',
			crossDomain: true,
		});
		if (res.data.status != 'error') {
			let data = res.data.data;
			let result = await axios.request({
				method: 'get',
				url: `${NODE_URL}/unitychain/static/userStat/${data._id}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				crossDomain: true,
			});

			if (result.data.status) {
				data = { ...data, auth: result.data.response.data };
			}

			let token = res.data.data.token;
			dispatch(setCurrentUser(data));
			localStorage.user = JSON.stringify(data);
			localStorage.token = token;

			return res;
		} else {
			return res;
		}
	};
};

export const facebookWithAuth = (data, status) => {
	return async dispatch => {
		const { accessToken, userID } = data;
		let obj = {
			accessToken,
			profile: {
				provider: 'facebook',
				id: userID,
			},
		};

		if (localStorage.user) {
			let user = JSON.parse(localStorage.user);
			user.auth[status] = true;

			let result = await axios.request({
				method: 'post',
				url: `${NODE_URL}/unitychain/social/mapFacebook/${user._id}`,
				data: obj,
				'Content-Type': 'application/x-www-form-urlencoded',
				crossDomain: true,
			});

			if (result.data.status && result.data.response.code == 200) {
				if (result.data.status) {
					localStorage.user = JSON.stringify(user);
				}
			}

			return result;
		}
	};
};

export const instagramWithAuth = (data, status) => {
	return async dispatch => {
		let url = `https://api.instagram.com/oauth/access_token/`;
		delete axios.defaults.headers.common['Authorization'];
		let rows = await axios.request({
			method: 'post',
			url: url,
			data: data,
			// 'Content-Type': 'application/x-www-form-urlencoded',
			// crossDomain: true,
		});

		if (rows.status == 200) {
			const { access_token, user } = rows.data;
			let obj = {
				accessToken: access_token,
				profile: {
					provider: 'instagram',
					id: user.id,
				},
			};

			if (localStorage.user) {
				let user = JSON.parse(localStorage.user);
				user.auth[status] = true;

				let result = await axios.request({
					method: 'post',
					url: `${NODE_URL}/unitychain/social/mapInstagram/${user._id}`,
					data: obj,
					'Content-Type': 'application/x-www-form-urlencoded',
					crossDomain: true,
				});

				if (result.data.status && result.data.response.code == 200) {
					if (result.data.status) {
						localStorage.user = JSON.stringify(user);
					}
				}

				return result;
			}
		}
	};
};

export const logout = () => {
	return dispatch => {
		delete axios.defaults.headers.common['Authorization'];
		localStorage.clear();
		dispatch(setCurrentUser());
	};
};

// export const LoginApi = data => {
// 	return dispatch => {

// 		return axios.post(`${Config.URL}/user/login`, data).then(res => {
// 			if(res.data.resp!=undefined) {
// 				const {token, userObj} = res.data.resp;
// 				localStorage.setItem("token", token);
// 				localStorage.setItem("user", JSON.stringify(userObj));
// 				requireAuthToken(token)
// 				dispatch(setCurrentUser(userObj));
// 			}
// 			return res;
//     	}, err => {
//     		console.log("err", err);
//     	});
// 	}
// }

export const ChangeTogleUrl = data => {
	return dispatch => {
		dispatch({ type: CHANGE_TOGGLE, data: data });
	};
};

// export const forgotPassword = (data) => {
// 	return dispatch => {
// 		return axios.post(`${Config.URL}/user/forgotPassword`, data);
// 	}
// }

// export const logout = () => {
// 	return dispatch => {
// 		delete axios.defaults.headers.common['Authorization'];
// 		localStorage.clear();
// 		dispatch(setCurrentUser());
// 	}
// }
