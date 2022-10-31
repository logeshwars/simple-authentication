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
		<Label label='ID' value={user.id} />
		<Label label='EMAIL' value={user.id} />
		<Label label='DATE OF BIRTH' value={formatDate(user.dob)} />
	</div>
);

Card.propTypes = {
	user: {
		userName: PropTypes.string,
		id: PropTypes.string,
		email: PropTypes.string,
		dob: PropTypes.string
	},
	refer: PropTypes.func
};

const Label = ({
	label, value
}) => (
	<p>
		<span className='card-label'>{label}</span>
		<span className={label === 'Email' ? 'card-email' : undefined}>{value}</span>
	</p>
);

Label.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string
};
export default Card;
