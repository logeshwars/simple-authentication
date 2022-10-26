import { sendRequest } from "../axios";
import messages from "../constants/messages";
import request from "../constants/request";


const handleLogout = async (setLogged, setUser) => {
	sendRequest(request.Post, request.User, request.Logout)
		.then((res) => {
			if (res.status === 200 && res.data.data.message === messages.LoggedOutsuccessfully) {
				setLogged(false);
				setUser(null);
			}
		})
		.catch(() => {
			setLogged(false);
			setUser(null);
		});
};

export default handleLogout;
