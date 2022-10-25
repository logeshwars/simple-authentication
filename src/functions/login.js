import { sendRequest } from "../axios";
import request from "../constants/request";

const login = (data, setLogged, setNotification) => {
	sendRequest(request.Post, request.User, request.Login, data).then((res) => {
		console.log("res", res);
		if (res.data.message === 'Logged in Successfully' && res.status === 202) {
			setLogged(true);
		}
	}).catch((error) => {
		setNotification(error.response.data.message);
	});
};

export default login;
