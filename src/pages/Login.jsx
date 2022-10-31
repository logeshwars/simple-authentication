import React, {
	useContext, useState
} from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Inputs from '../components/Inputs';
import {
	AuthContext, LoadingContext, NotificationContext
} from '../contexts/MainContext';
import lottieLogin from '../lottiefiles/login.json';
import PasswordInput from '../components/PasswordInput';
import constants from '../constants';
import { MakeRequest } from '../axios';
const Login = () => {
	const { 1: setLogged } = useContext(AuthContext);
	const [keepLogged, setKeepLogged] = useState(false);
	const setNotification = useContext(NotificationContext);
	const setLoading = useContext(LoadingContext);

	const fieldConst = {
		passwordMinLength: 8,
		passwordMaxLength: 20
	};
	const validationSchema = yup.object({
		email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
		password: yup
			.string('Enter your password')
			.min(fieldConst.passwordMinLength, `Password should be of minimum ${ fieldConst.passwordMinLength } characters length`)
			.max(fieldConst.passwordMaxLength, `Password should be of maximum ${ fieldConst.passwordMaxLength }  characters length`)
			.required('Password is required')
	});
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			setLoading(true);
			MakeRequest(constants.resConfig.Login, values ).then(([log, msg]) => {
				setLogged(log);
				setNotification(msg);
			});
			setLoading(false);
		}
	});
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: lottieLogin,
		rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
	};
	return (
		<div className='center-elm'>
			<div className='form-container'>
				<div className='text-center space-y-2'>
					<Lottie options={defaultOptions} height={100} width={100} />
					<h1 className='text-3xl font-semibold'>Sign in</h1>
					<h3 className='text-gray-500'>Welcome back! Enter your email and password below to sign in</h3>
				</div>
				<form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
					<Inputs
						onChange={formik.handleChange}
						value={formik.values.email}
						type='email'
						name='email'
						placeholder='Enter your email'
						label='Email'
						istouched={formik.touched.email}
						error={formik.errors.email}
						onBlur={formik.handleBlur}
					/>
					<PasswordInput
						onChange={formik.handleChange}
						name='password'
						value={formik.values.password}
						placeholder='Enter your password'
						label='Password'
						istouched={formik.touched.password}
						error={formik.errors.password}
						onBlur={formik.handleBlur}
					/>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<label className={`custom-check-box ${ keepLogged ? 'border-primary' : undefined }`}>
								<input onChange={() => setKeepLogged((prev) => !prev)} type='checkbox' name='' id='' />
								<span className={keepLogged ? 'after:border-primary' : undefined}></span>
							</label>
							<label className='text-gray-500 text-sm'>keep me logged in</label>
						</div>
						<Link to='*' className='text-primary'>
							Forget password!
						</Link>
					</div>

					<button className='login-btn' type='submit' disabled={!(formik.isValid && formik.dirty)}>
						Sign in
					</button>
				</form>
				<div className='text-center text-base text-gray-400 '>
					Don&apos;t have an account?
					<Link to={constants.path.Register} className='text-blue-700 underline'>
						SignUp
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
