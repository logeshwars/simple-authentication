import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatDate';
const Card = ({
	user, refer
}) => (
	<div className='card' ref={refer}>
		<h1 className='card-title'>
			<FaUserCircle className='text-blue-400 text-xl' />
			{user.userName}
		</h1>
		<p>
			<span className='card-label'>ID</span>:{user.id}
		</p>
		<p>
			<span className='card-label'>EMAIL</span>
			<span className='card-email'>{user.email}</span>
		</p>
		<p>
			<span className='card-label'>DATE OF BIRTH</span>
			{formatDate(user.dob)}
		</p>
	</div>
);

Card.propTypes = {
	user: {
		userName: PropTypes.string,
		id: PropTypes.string,
		email: PropTypes.string,
		dob: PropTypes.string
	},
	refer: PropTypes.element
};

export default Card;
