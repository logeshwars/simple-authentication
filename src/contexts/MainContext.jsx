import React, {
	createContext, useCallback, useEffect, useState
} from 'react';
import {
	ToastContainer, toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MakeRequest } from '../axios';
import constants from '../constants';
export const AuthContext = createContext();
export const UserContext = createContext();
export const LoadingContext = createContext();
export const NotificationContext = createContext();
export const UserProvider = ({ children }) => {
	const config = constants.resConfig;
	const [logged, setLogged] = useState(false);
	const [notification, setNotification] = useState('');
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const getToken =useCallback(() => {
		setLoading(true);
		MakeRequest(config.Token).then(([log, msg]) => {
			setLogged(log);
			setNotification(msg);
		});
		setLoading(false);
	}, [config]);

	useEffect(() => {
		getToken();
	}, [getToken]);

	useEffect(() => {
		if (logged) {
			navigate('/', { replace: true });
		}
	}, [logged, navigate]);

	useEffect(() => {
		setLoading(true);
		MakeRequest(config.GetCurrentUser).then((user) => {
			setUser(user.data);
			if (Array.isArray(user)) {
				setNotification(config.User.error);
			}
		});
		setLoading(false);
	}, [logged, config]);

	useEffect(() => {
		if (notification) {
			toast.info(notification);
			setNotification('');
		}
	}, [notification]);

	return (
		<UserContext.Provider value={[user, setUser]}>
			<NotificationContext.Provider value={setNotification}>
				<LoadingContext.Provider value={setLoading}>
					<AuthContext.Provider value={[logged, setLogged, getToken]}>
						{loading ? (
							<Loading />
						) : (
							<>
								{children}
								<ToastContainer autoClose={1000} limit={1}/>
							</>
						)}
					</AuthContext.Provider>
				</LoadingContext.Provider>
			</NotificationContext.Provider>
		</UserContext.Provider>
	);
};

UserProvider.propTypes = { children: PropTypes.func };
