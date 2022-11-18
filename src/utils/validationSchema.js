import * as yup from 'yup';
import constants from '../constants';
const { formConst } = constants;
const validationSchema = yup.object({
	userName: yup
		.string('Enter your Name')
		.min(formConst.userMinLength, 'Name should be of minimum 3 characters length')
		.max(formConst.userMaxLength, 'Name should be of maximum 20 characters length')
		.required('Enter your Name'),
	dob: yup
		.date()
		.required('Enter your date of birth')
		.min(new Date(formConst.dobMinDate), `DOB must be greater than ${ formConst.dobMinDate }`)
		.max(new Date(formConst.dobMaxDate), `DOB must be less than ${ formConst.dobMaxDate }`),
	email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
	password: yup
		.string('Enter your password')
		.min(formConst.passwordMinLength, 'Password should be of minimum 8 characters length')
		.max(formConst.passwordMaxLength, 'password should be of maximum 20 characters length')
		.required('Password is required'),
	confirmPassword: yup
		.string('Enter the confirm password')
		.required('Confirm password is required')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});
export default validationSchema;
