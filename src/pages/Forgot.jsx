import { useFormik } from 'formik';
import React from 'react';
import InputContianer from '../components/InputContianer';
import Inputs from '../components/Inputs';
import * as yup from 'yup';
import constants from '../constants';
import FormButton from '../components/FormButton';
import { Link } from 'react-router-dom';
import formConst from '../constants/form';

const Forgot = () => {
	const validationSchema = yup.object({
		email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
		password: yup
			.string('Enter your password')
			.min(
				formConst.passwordMinLength,
				`Password should be of minimum ${ formConst.passwordMinLength } characters length`
			)
			.max(
				formConst.passwordMaxLength,
				`Password should be of maximum ${ formConst.passwordMaxLength }  characters length`
			)
			.required('Password is required')
	});
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			alert("hello");
		}
	});

	return (
		<div className='center-elm'>
			<div className='form-container'>
				<div className='text-center space-y-2'>
					<h1 className='text-3xl font-semibold'>Forgot Password!</h1>
					<h3 className='text-gray-500'>Enter your email to get your password</h3>
				</div>
				<form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
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
					<FormButton isValid={formik.isValid} dirty={formik.dirty} text={'Sign In'} />
				</form>
				<div className='text-center text-base text-gray-400 '>
					Go to!
					<Link to={constants.path.Login} className='text-blue-700 underline'>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Forgot;
