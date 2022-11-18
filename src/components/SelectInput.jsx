import React from 'react';
import PropTypes from "prop-types";
const SelectInput = (props) => (
	<select className='form-input' defaultValue={props.placeholder} name={props.name} onChange={props.onChange} onBlur={props.onBlur}>
		{props.options.map((option) => (<option key={option}>
			{option}
		</option>))}
	</select>
);

SelectInput.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	options: PropTypes.array
};
export default SelectInput;
