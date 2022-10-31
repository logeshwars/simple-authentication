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
		<div className='form-input-container'>
			<label>
				{props?.label}
				<span className='form-required'>*</span>
			</label>
			<div className='relative'>
				<input {...props} className='form-input w-full pr-10' type={type} />
				<button className='form-eye' type='button' onClick={handleShow}>
					{type === 'text' ? <BsEyeSlashFill /> : <BsEyeFill />}
				</button>
			</div>
			{props.istouched && <p className='input-error'>{props.error}</p>}
		</div>
	);
};

PasswordInput.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	istouched: PropTypes.bool,
	error: PropTypes.string,
	onBlur: PropTypes.func
};

export default PasswordInput;
