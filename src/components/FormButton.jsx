import React from 'react';
import PropsTypes from 'prop-types';
const FormButton = ({ text, isValid, dirty }) => (
	<button className='login-btn' type='submit' disabled={!(isValid && dirty)}>
		{text}
	</button>
);

FormButton.propTypes = {
	text: PropsTypes.string,
	isValid: PropsTypes.bool,
	dirty: PropsTypes.bool
};
export default FormButton;
