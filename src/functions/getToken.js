import { sendRequest } from "../axios";
import request from "../constants/request";

const getToken = () => {
	let logged = false;
	sendRequest(request.Get, request.User, request.Token)
		.then((res) => {
			if (res.status === 201 && res.data.message === 'Token Created Successfully') {
				logged = true;
			}
		})
		.catch(() => {
			logged = false;
		});
	return logged;
};

export default getToken;
