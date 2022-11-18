import React, { useContext } from 'react';
import {
	Link, useNavigate
} from 'react-router-dom';
import { MakeRequest } from '../axios/';
import Inputs from '../components/Inputs';
import { useFormik } from 'formik';
import {
	LoadingContext, NotificationContext
} from '../contexts/MainContext';
import PasswordInput from '../components/PasswordInput';
import constants from '../constants';
import FormButton from '../components/FormButton';
import validationSchema from '../utils/validationSchema';
import formConst from '../constants/form';
import InputContianer from '../components/InputContianer';

const Register = () => {
	const navigate = useNavigate();
	const setNotification = useContext(NotificationContext);
	const setLoading = useContext(LoadingContext);
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
			MakeRequest(constants.resConfig.Register, values).then(([res, error]) => {
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
					<InputContianer
						error={formik.errors.userName}
						label='Name'
						required={true}
						istouched={formik.touched.userName}>
						<Inputs
							onChange={formik.handleChange}
							value={formik.values.userName}
							name='userName'
							type='text'
							placeholder='Enter your Name'
							onBlur={formik.handleBlur}
							maxLength={formConst.userMaxLength}
							minLength={formConst.userMinLength}
							required={true}
						/>
					</InputContianer>
					<InputContianer
						label='Email'
						istouched={formik.touched.email}
						error={formik.errors.email}
						required={true}>
						<Inputs
							onChange={formik.handleChange}
							value={formik.values.email}
							name='email'
							type='email'
							placeholder='Enter your email'
							onBlur={formik.handleBlur}
							minLength={formConst.emailMinLength}
							maxLength={formConst.emailMaxLength}
							required={true}
						/>
					</InputContianer>
					<InputContianer
						label='Birth Date'
						istouched={formik.touched.dob}
						error={formik.errors.dob}
						required={true}
					>
						<Inputs
							onChange={formik.handleChange}
							value={formik.values.dob}
							name='dob'
							type='date'
							min={formConst.dobMinDate}
							max={formConst.dobMaxDate}
							placeholder='Enter your DOB'
							onBlur={formik.handleBlur}
							required={true}
						/>
					</InputContianer>
					<InputContianer
						label='Password'
						istouched={formik.touched.password}
						error={formik.errors.password}
						required={true}
					>
						<PasswordInput
							onChange={formik.handleChange}
							name='password'
							value={formik.values.password}
							placeholder='Enter your password'
							onBlur={formik.handleBlur}
							minLength={formConst.passwordMinLength}
							maxLength={formConst.passwordMaxLength}
							required={true}
						/>
					</InputContianer>
					<InputContianer
						label='Confirm password'
						istouched={formik.touched.confirmPassword}
						error={formik.errors.confirmPassword}
						required={true}
					>
						<PasswordInput
							onChange={formik.handleChange}
							name='confirmPassword'
							value={formik.values.confirmPassword}
							placeholder='ReEnter your password'
							onBlur={formik.handleBlur}
							minLength={formConst.passwordMinLength}
							maxLength={formConst.passwordMaxLength}
							required={true}
						/>
					</InputContianer>
					<FormButton isValid={formik.isValid} dirty={formik.dirty} text={'Register'} />
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
