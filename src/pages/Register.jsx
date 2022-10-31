import React, { useContext } from 'react';
import {
	Link, useNavigate
} from 'react-router-dom';
import { MakeRequest } from '../axios/';
import Inputs from '../components/Inputs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
	LoadingContext, NotificationContext
} from '../contexts/MainContext';
import PasswordInput from '../components/PasswordInput';
import constants from '../constants';

const Register = () => {
	const navigate = useNavigate();
	const setNotification = useContext(NotificationContext);
	const setLoading = useContext(LoadingContext);

	const minimumAge = 18;
	const firstIndex = 0;
	const date = new Date();
	date.setFullYear(date.getFullYear() - minimumAge);

	const fieldConst = {
		userMinLength: 3,
		userMaxLength: 20,
		emailMinLength: 8,
		emailMaxLength: 40,
		dateSplitIndex: 0,
		dobMinDate: '1922-01-01',
		dobMaxDate: date.toISOString().split('T')[firstIndex],
		passwordMinLength: 8,
		passwordMaxLength: 20,
		minimumAge: 18
	};
	const validationSchema = yup.object({
		userName: yup
			.string('Enter your Name')
			.min(fieldConst.userMinLength, 'Name should be of minimum 3 characters length')
			.max(fieldConst.userMaxLength, 'Name should be of maximum 20 characters length')
			.required('Enter your Name'),
		dob: yup
			.date()
			.required('Enter your date of birth')
			.min(new Date('01-01-1950'), 'DOB must be greater than 01-01-1950')
			.max(date, `DOB must be less than ${ fieldConst.dobMaxDate }`),
		email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
		password: yup
			.string('Enter your password')
			.min(fieldConst.passwordMinLength, 'Password should be of minimum 8 characters length')
			.max(fieldConst.passwordMaxLength, 'password should be of maximum 20 characters length')
			.required('Password is required'),
		confirmPassword: yup
			.string('Enter the confirm password')
			.required('Confirm password is required')
			.oneOf([yup.ref('password'), null], 'Passwords must match')
	});
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			dob: '',
			userName: '',
			confirmPassword: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setLoading(true);
			MakeRequest(
				constants.resConfig.Register,
				values).then(([res, error]) => {
				if (res) {
					setNotification(constants.resConfig.Register.success);
					navigate(constants.path.Login, { replace: true });
				} else {
					setNotification(error);
				}
			});
			setLoading(false);
		}
	});
	return (
		<div className='center-elm'>
			<div className='form-container '>
				<div className='text-center space-y-2'>
					<h1 className='text-3xl font-semibold'>Register</h1>
					<h3 className='text-gray-500'>Join us! Enter the correct details to create your account</h3>
				</div>
				<form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
					<Inputs
						onChange={formik.handleChange}
						value={formik.values.userName}
						name='userName'
						type='text'
						placeholder='Enter your Name'
						label='Name'
						onBlur={formik.handleBlur}
						istouched={formik.touched.userName}
						error={formik.errors.userName}
						maxLength={fieldConst.userMaxLength}
						minLength={fieldConst.userMinLength}
					/>
					<Inputs
						onChange={formik.handleChange}
						value={formik.values.email}
						name='email'
						type='email'
						placeholder='Enter your email'
						label='Email'
						onBlur={formik.handleBlur}
						istouched={formik.touched.email}
						error={formik.errors.email}
						minLength={fieldConst.emailMinLength}
						maxLength={fieldConst.emailMaxLength}
					/>
					<Inputs
						onChange={formik.handleChange}
						value={formik.values.dob}
						name='dob'
						type='date'
						min={fieldConst.dobMinDate}
						max={fieldConst.dobMaxDate}
						placeholder='Enter your DOB'
						label='Birth Date'
						onBlur={formik.handleBlur}
						istouched={formik.touched.dob}
						error={formik.errors.dob}
					/>
					<PasswordInput
						onChange={formik.handleChange}
						name='password'
						value={formik.values.password}
						placeholder='Enter your password'
						label='Password'
						onBlur={formik.handleBlur}
						istouched={formik.touched.password}
						error={formik.errors.password}
						minLength={fieldConst.passwordMinLength}
						maxLength={fieldConst.passwordMaxLength}
					/>
					<PasswordInput
						onChange={formik.handleChange}
						name='confirmPassword'
						value={formik.values.confirmPassword}
						placeholder='ReEnter your password'
						label='Confirm password'
						onBlur={formik.handleBlur}
						istouched={formik.touched.confirmPassword}
						error={formik.errors.confirmPassword}
						minLength={fieldConst.passwordMinLength}
						maxLength={fieldConst.passwordMaxLength}
					/>
					<button className='login-btn' type='submit' disabled={!(formik.isValid && formik.dirty)}>
						Register
					</button>
				</form>
				<div className='text-center text-base text-gray-400 '>
					Already have an account!
					<Link to={constants.path.Login} className=' underline text-blue-700'>
						Log in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
