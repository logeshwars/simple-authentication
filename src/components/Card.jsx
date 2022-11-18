import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BiUserMinus } from 'react-icons/bi';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatDate';
import constants from '../constants';
import {
	NotificationContext, UserContext
} from '../contexts/MainContext';
import { MakeRequest } from '../axios';
const Card = ({
	data, refer, refetch
}) => {
	const [user] = useContext(UserContext);
	const setNotification = useContext(NotificationContext);
	const handleDelete = () => {
		MakeRequest(constants.resConfig.Delete, { userid: data.id }).then(([res, msg]) => {
			if (res) {
				refetch();
			}
			setNotification(msg);
		});
	};
	return (
		<div className='card' ref={refer}>
			<div className='card-header'>
				<h1 className='card-title'>
					<FaUserCircle className='text-blue-400 text-xl' />
					{data.userName}
				</h1>
				{
					user?.role === constants.role.RoleAdmin &&
			<button onClick={handleDelete} className='card-deletebtn'><BiUserMinus/></button>
				}
			</div>
			<Label label='ID' value={data.id} />
			<Label label='EMAIL' value={data.email} />
			<Label label='DATE OF BIRTH' value={formatDate(data.dob)} />
			<Label label='ROLE' value={data.role}/>
		</div>
	);
};
Card.propTypes = {
	data: {
		userName: PropTypes.string,
		id: PropTypes.string,
		email: PropTypes.string,
		dob: PropTypes.string,
		role: PropTypes.string
	},
	refer: PropTypes.func,
	refetch: PropTypes.func
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
