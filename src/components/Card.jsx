import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { BiUserMinus } from 'react-icons/bi';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatDate';
import DeleteModal from './DeleteModal';
import useToggle from '../hooks/useToggle';
const Card = ({ data, refer, refetch }) => {
	const [modal, toggleModal] = useToggle(false);
	return (
		<div className='row' ref={refer}>
			<h1 className='card-title'>
				<FaUserCircle className='text-blue-400 text-xl' />
				{data.userName}
			</h1>
			<Label value={data.id} />
			<Label className='row-email' value={data.email} />
			<Label value={formatDate(data.dob)} />
			<Label className={data.role} value={data.role} />
			<button onClick={toggleModal} className='row-delete-btn'>
				<BiUserMinus />
				<span>Remove</span>
			</button>
			{modal && <DeleteModal toggleModal={toggleModal} userId={data.id} refetch={refetch}/>}
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

const Label = ({value, className}) => (
	<span className={className}>{value}</span>
);

Label.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string
};
export default Card;
