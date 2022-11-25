import React from 'react';
import PropsType from 'prop-types';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import constants from '../constants';

const Protector = ({ Component, allowedRoles }) => {
	const {path} = constants;
	const [user] = useAuth();
	const location = useLocation();

	return <div>{user && allowedRoles.includes(user.role) ? <Component /> : <Navigate to={path.Login} replace state={{from: location}} />}</div>;
};

Protector.propTypes = { Component: PropsType.func, allowedRoles: PropsType.array };

export default Protector;
