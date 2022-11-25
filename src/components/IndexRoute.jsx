import React from 'react';
import { Navigate } from 'react-router-dom';
import constants from '../constants';
import useAuth from '../hooks/useAuth';

const IndexRoute = () => {
	const [user] = useAuth();
	const {role, path}=constants;
	return (user&&user.role===role.RoleAdmin ? <Navigate to={path.Dashboard} replace/> : <Navigate to={path.UserDetails} replace/>);
};

export default IndexRoute;
