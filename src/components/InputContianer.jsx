import React from 'react';
import PropTypes from 'prop-types';

const InputContianer = (props) => (
	<div className='form-input-container'>
		<label>
			{props?.label}
			{props.required && <span className='form-required'>*</span>}
		</label>
		{props.children}
		{props.istouched && <p className='input-error'>{props.error}</p>}
	</div>
);
InputContianer.propTypes = {
	label: PropTypes.string,
	istouched: PropTypes.bool,
	error: PropTypes.string,
	children: PropTypes.object,
	required: PropTypes.bool
};
export default InputContianer;
