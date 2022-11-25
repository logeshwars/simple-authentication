import React from 'react';
import PropTypes from 'prop-types';
const Inputs = (props) => <input {...props} className='form-input' />;
Inputs.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	onBlur: PropTypes.func
};
export default Inputs;
