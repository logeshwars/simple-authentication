/** @format */

import React, {
	useContext, useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/MainContext';
import PropsType from 'prop-types';
import Loading from './Loading';

const Protector = ({ Component }) => {
	const [logged] = useContext(AuthContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (!logged) {
			navigate('/login');
		}
	}, [logged, navigate]);
	return <div>{logged ? <Component /> : <Loading />}</div>;
};

Protector.propTypes = { Component: PropsType.func };
export default Protector;
