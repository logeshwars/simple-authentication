import React, { useCallback, useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {BsCalendar2Date} from 'react-icons/bs';
import {HiOutlineIdentification, HiOutlineMail} from 'react-icons/hi';
import {IoMdLogIn} from 'react-icons/io';
import {MdOutlineAdminPanelSettings} from 'react-icons/md';
import PropTypes from 'prop-types';
import formatDate from '../utils/formatDate';
import { MakeRequest } from '../axios';
import resConfig from '../constants/resConfig';
const UserDetails = () => {
	const [user, setUser] = useState({});
	const getUser =useCallback(async () => {

		await MakeRequest(resConfig.GetCurrentUserFullDetails).then((userData) => {

			if (JSON.stringify(user) !== JSON.stringify(userData)) {
				setUser(userData.data);
			}
		});
	}, []);
	useEffect(() => {
		getUser();
	}, [getUser]);
	return (
		<div className='center-elm min-h-[90vh] '>
			<div className='user-details-container'>
				<div className='user-details-header'>
					<div className='user-details-profile'>
						<FaUserCircle className='text-blue-400 text-6xl' />
					</div>
					<h1>{user.userName}</h1>
				</div>
				<div className='user-details'>
					<Label icon={<HiOutlineIdentification/>} label='ID' value={user.id} />
					<Label icon={<HiOutlineMail/>} label='EMAIL' value={user.email} />
					<Label icon={<BsCalendar2Date/>} label='DATE OF BIRTH' value={formatDate(user.dob)} />
					<Label icon={<MdOutlineAdminPanelSettings/>} label='ROLE' value={user.role} />
					<Label icon={<IoMdLogIn/>} label='LAST LOGIN' value={formatDate(user.loginTime)}/>
				</div>
			</div>
		</div>
	);
};
const Label = ({ label, value, icon }) => (
	<p className='card-desc'>
		<span className='card-label'>{icon} {label}</span>
		<span className={label === 'Email' ? 'card-email' : undefined}>{value}</span>
	</p>
);

Label.propTypes = {
	icon: PropTypes.element,
	label: PropTypes.string,
	value: PropTypes.string
};
export default UserDetails;
