/** @format */

import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import {
	Link, useNavigate
} from 'react-router-dom';
import { sendRequest } from '../axios/';
import Inputs from '../components/Inputs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
	LoadingContext, NotificationContext
} from '../contexts/MainContext';
import PasswordInput from '../components/PasswordInput';

const Register = () => {
	const mutation = useMutation(sendRequest);
	const navigate = useNavigate();
	const setNotification = useContext(NotificationContext);
	const setLoading = useContext(LoadingContext);
	const date = new Date();
	date.setFullYear(date.getFullYear() - 10);
	const validationSchema = yup.object({
		userName: yup
			.string('Enter your Name')
			.min(3, 'Name should be of minimum 3 characters length')
			.max(20, 'Name should be of maximum 20 characters length')
			.required('Enter your Name'),
		dob: yup
			.date()
			.required('Enter your date of birth')
			.min(new Date('01-01-1950'), 'DOB must be greater than 01-01-1950')
			.max(date, `DOB must be less than ${ date.toISOString().split('T')[0] }`),
		email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
		password: yup
			.string('Enter your password')
			.min(8, 'Password should be of minimum 8 characters length')
			.max(20, 'password should be of maximum 20 characters length')
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
			mutation.mutate(
				{
					email: values.email,
					password: values.password,
					dob: values.dob,
					confirmPassword: values.confirm_password,
					userName: values.userName
				},
				{
					onSuccess: (data) => {
						if (data.data.message === 'User created successfully' && data.status === 201) {
							setNotification(data.data.message);
							navigate('/login', { replace: true });
						}
					},
					onError: (error, variables, context) => {
						setNotification(error.response.data.message);
					}
				}
			);
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
						maxLength={20}
						minLength={3}
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
						minLength={8}
					/>
					<Inputs
						onChange={formik.handleChange}
						value={formik.values.dob}
						name='dob'
						type='date'
						min='1922-01-01'
						max={date.toISOString().split('T')[0]}
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
						minLength={8}
						maxLength={20}
					/>
					<PasswordInput
						onChange={formik.handleChange}
						name='confirm_password'
						value={formik.values.confirmPassword}
						placeholder='ReEnter your password'
						label='Confirm password'
						onBlur={formik.handleBlur}
						istouched={formik.touched.confirmPassword}
						error={formik.errors.confirmPassword}
						minLength={8}
						maxLength={20}
					/>
					<button className='login-btn' type='submit' disabled={!(formik.isValid && formik.dirty)}>
						Register
					</button>
				</form>
				<div className='text-center text-base text-gray-400 '>
					Already have an account!
					<Link to='/login' className=' underline text-blue-700'>
						Log in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
