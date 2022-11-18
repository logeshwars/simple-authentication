import React, {
	createContext, useCallback, useEffect, useLayoutEffect, useState
} from 'react';
import {
	ToastContainer, toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { MakeRequest } from '../axios';
import constants from '../constants';
import useSession from '../hooks/useSession';
import Loading from "../components/Loading";
export const AuthContext = createContext();
export const UserContext = createContext();
export const LoadingContext = createContext();
export const NotificationContext = createContext();
export const UserProvider = ({ children }) => {
	const { resConfig } = constants;
	const [logged, setLogged] = useState(false);
	const [notification, setNotification] = useState('');
	const [user, setUser, removeUser] = useSession("user");
	const [loading, setLoading] = useState(false);

	const getToken =useCallback(async () => {
		setLoading(true);
		await MakeRequest(resConfig.Token).then(([log, msg]) => {
			if (!log) {
				removeUser();
			}
			setLogged(log);
			setNotification(msg);
		});
		setLoading(false);
	}, [resConfig, removeUser]);

	useLayoutEffect(() => {
		getToken();
	}, [getToken]);

	const getUser = useCallback(async () => {
		setLoading(true);
		await MakeRequest(resConfig.GetCurrentUser).then((userData) => {
			if (JSON.stringify(user)!== JSON.stringify(userData)) {
				setUser(userData.data);
			}
		});
		setLoading(false);
	}, [resConfig, setUser]);


	useEffect( () => {
		if (logged) {
			getUser();
		}
	}, [logged, getUser]);

	useEffect(() => {
		if (notification) {
			toast.info(notification);
			setNotification('');
		}
	}, [notification]);

	return (
		<UserContext.Provider value={[user, setUser]}>
			<NotificationContext.Provider value={setNotification}>
				<AuthContext.Provider value={[logged, setLogged, getToken]}>
					<LoadingContext.Provider value={setLoading}>
						{loading ? <Loading/> :<>
							{children}
							<ToastContainer autoClose={1000} limit={1}/>
						</>
						}
					</LoadingContext.Provider>
				</AuthContext.Provider>
			</NotificationContext.Provider>
		</UserContext.Provider>
	);
};

UserProvider.propTypes = { children: PropTypes.object };
