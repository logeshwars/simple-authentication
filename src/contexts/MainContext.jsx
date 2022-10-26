/** @format */

import React, {
	createContext, useEffect, useState
} from 'react';
import { sendRequest } from '../axios';
import {
	ToastContainer, toast
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import getToken from '../functions/getToken';
import PropTypes from 'prop-types';
import request from '../constants/request';
export const AuthContext = createContext();
export const UserContext = createContext();
export const LoadingContext = createContext();
export const NotificationContext = createContext();
export const UserProvider = ({ children }) => {
	const [logged, setLogged] = useState(false);
	const [notification, setNotification] = useState('');
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const notify = () => toast(notification);

	const navigate = useNavigate();
	useEffect(() => {
		setLogged(getToken());
	}, []);
	useEffect(() => {
		if (logged) {
			navigate('/', { replace: true });
		}
	}, [logged, navigate]);
	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);
	useEffect(() => {
		sendRequest(request.Get, request.User, request.GetUser).then((res) => setUser(res.data.data));
	}, [logged]);
	useEffect(() => {
		if (!notification) {
			notify();
			setNotification('');
		}
	}, [notification, notify]);
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
								<ToastContainer />
							</>
						)}
					</AuthContext.Provider>
				</LoadingContext.Provider>
			</NotificationContext.Provider>
		</UserContext.Provider>
	);
};

UserProvider.propTypes = { children: PropTypes.func };
