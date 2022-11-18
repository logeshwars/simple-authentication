import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	BsEyeFill, BsEyeSlashFill
} from 'react-icons/bs';
const PasswordInput = (props) => {
	const [type, setType] = useState('password');
	const handleShow = () => {
		if (type === 'password') {
			setType('text');
		} else {
			setType('password');
		}
	};
	return (
		<div className='relative'>
			<input {...props} autoComplete='off' className='form-input w-full pr-10' type={type} />
			<button className='form-eye' type='button' onClick={handleShow}>
				{type === 'text' ? <BsEyeSlashFill /> : <BsEyeFill />}
			</button>
		</div>
	);
};

PasswordInput.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	required: PropTypes.bool
};

export default PasswordInput;
