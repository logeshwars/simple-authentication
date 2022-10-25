import { sendRequest } from "../axios";
import request from "../constants/request";


const handleLogout = async (setLogged, setUser) => {
	sendRequest(request.Post, request.User, request.Logout)
		.then((res) => {
			if (res.status === 200 && res.data.data.message === 'Logged out successfully') {
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
