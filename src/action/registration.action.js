import axios from 'axios';
import { AUTHENTICATION_TYPE, CHANGE_TOGGLE } from '../reducers/reducer.types';
let URL = process.env.REACT_APP_GO_API;
let NODE_URL = process.env.REACT_APP_NODE_API;

export const setCurrentUser = user => ({
	type: 'AUTHENTICATION_TYPE',
	user,
});

export function checkAvailability(username) {
	return dispatch => {
		return axios.request({
			method: 'post',
			url: `${URL}/users/checkavailable`,
			data: { username: username },
			'Content-Type': 'application/x-www-form-urlencoded',
			crossDomain: true,
		});
	};
}

export function registrationUser(obj) {
	return dispatch => {
		return axios
			.request({
				method: 'post',
				url: `${URL}/users`,
				data: obj,
				'Content-Type': 'application/x-www-form-urlencoded',
				crossDomain: true,
			})
			.then(res => {
				if (res.data.status != 'error') {
					const { _id, did } = res.data.data;
					let data = res.data.data;

					let object = {
						uuid: _id,
						DID: did,
					};

					axios
						.request({
							method: 'post',
							url: `${NODE_URL}/unitychain/social/linkUser`,
							data: object,
							'Content-Type': 'application/x-www-form-urlencoded',
							crossDomain: true,
						})
						.then(r => {
							axios
								.request({
									method: 'get',
									url: `${NODE_URL}/unitychain/static/userStat/${_id}`,
									'Content-Type': 'application/x-www-form-urlencoded',
									crossDomain: true,
								})
								.then(result => {
									
									if (result.data.status) {
										data = { ...data, auth: result.data.response.data };
                                    }
                                    
									let token = res.data.data.token;
									dispatch(setCurrentUser(data));
									localStorage.user = JSON.stringify(data);
                                    localStorage.token = token;
								});
						});
				}

				return res;
			});
	};
}
