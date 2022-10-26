import { sendRequest } from "../axios";
import messages from "../constants/messages";
import request from "../constants/request";

const login = (data, setLogged, setNotification) => {
	sendRequest(request.Post, request.User, request.Login, data).then((res) => {
		if (res.data.message === messages.LoggedInSuccessfully && res.status === 202) {
			setLogged(true);
		}
	}).catch((error) => {
		setNotification(error.response.data.message);
	});
};

export default login;
