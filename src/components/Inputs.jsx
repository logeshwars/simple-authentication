import React from 'react';
import PropTypes from 'prop-types';
const Inputs = (props) => (
	<div className='form-input-container'>
		<label>
			{props?.label}
			<span className='form-required'>*</span>
		</label>
		<input {...props} className='form-input' />
		{props.istouched && <p className='input-error'>{props.error}</p>}
	</div>
);
Inputs.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	istouched: PropTypes.bool,
	error: PropTypes.string,
	onBlur: PropTypes.func
};
export default Inputs;
