import React, { useContext } from 'react';
import { MakeRequest } from '../axios/';
import Inputs from '../components/Inputs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LoadingContext, NotificationContext } from '../contexts/MainContext';
import PasswordInput from '../components/PasswordInput';
import constants from '../constants';
import roles from '../constants/role';
import SelectInput from '../components/SelectInput';
import FormButton from '../components/FormButton';
import validationSchema from '../utils/validationSchema';
import InputContianer from '../components/InputContianer';

const CreateUser = () => {
	const setLoading = useContext(LoadingContext);
	const setNotification = useContext(NotificationContext);
	const { formConst, resConfig } = constants;
	validationSchema.role = yup.string('Select the Role').required('Role is required');
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			dob: '',
			userName: '',
			confirmPassword: '',
			role: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values, { resetForm }) => {
			setLoading(true);
			MakeRequest(resConfig.Register, values).then(([res, error]) => {
				if (res) {
					setNotification(resConfig.Register.success);
				} else {
					setNotification(error);
				}
			});
			setLoading(false);
			resetForm({ values: '' });
		}
	});
	return (
		<div className='createuser-container'>
			<div className='createuser-card'>
				<h3 className='text-primary text-2xl font-bold'> Create user </h3>
				<form className='createuser-form' onSubmit={formik.handleSubmit}>
					<div className='createuser-form-components'>
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
					</div>
					<div className='createuser-form-components'>
						<InputContianer
							label='Birth Date'
							istouched={formik.touched.dob}
							error={formik.errors.dob}
							required={true}>
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
							label='Role'
							istouched={formik.touched.role}
							error={formik.errors.role}
							required={true}>
							<SelectInput
								onChange={formik.handleChange}
								value={formik.values.role}
								name='role'
								placeholder='Select the Role'
								onBlur={formik.handleBlur}
								options={Object.values(roles)}
								required={true}
							/>
						</InputContianer>
					</div>
					<div className='createuser-form-components'>
						<InputContianer
							label='Password'
							istouched={formik.touched.password}
							error={formik.errors.password}
							required={true}>
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
							required={true}>
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
					</div>
					<div className='createuser-form-components w-full sm:w-1/4'>
						<FormButton isValid={formik.isValid} dirty={formik.dirty} text={'Create User'} />
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateUser;
