import React, {
	useContext, useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import * as MainContext from '../contexts/MainContext';
import PropsType from 'prop-types';
import Loading from './Loading';
import constants from '../constants';

const AdminProtector = ({ Component }) => {
	const { 0: logged } = useContext(MainContext.AuthContext);
	const [user] = useContext(MainContext.UserContext);
	const navigate = useNavigate();
	const { path } = constants;

	useEffect(() => {
		if (!user && user?.role !== constants.role.RoleAdmin) {
			navigate(path.Login);
		}
	}, [user, navigate, path]);

	return <div>{logged ? <Component /> : <Loading />}</div>;
};

AdminProtector.propTypes = { Component: PropsType.func };

export default AdminProtector;
