import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {SlExclamation} from "react-icons/sl";
import {MdDeleteOutline, MdOutlineCancel} from "react-icons/md";

import { NotificationContext } from '../contexts/MainContext';
import { MakeRequest } from '../axios';
import constants from '../constants';

const DeleteModal = ({userId, refetch, toggleModal}) => {
	const setNotification = useContext(NotificationContext);
	const handleDelete = () => {
		MakeRequest(constants.resConfig.Delete, { userid: userId }).then(([res, msg]) => {
			if (res) {
				refetch();
				toggleModal();
			}
			setNotification(msg);
		});
	};
	return (<div className='delete-modal-container'>
		<div className='delete-modal'>
			<div className='delete-modal-icon-container'><SlExclamation className='delete-modal-icon'/></div>
			<h3 className='delete-modal-title'>Do you want to delete?</h3>
			<p className='delete-modal-desc'>It will not possible to restore the user after deletion.
            Are you sure?</p>
			<div className='delete-modal-btn-container'>
				<ModalBtn btnClass='modal-cancel-btn' icon={<MdOutlineCancel/>} func={toggleModal} text='Cancel'/>
				<ModalBtn btnClass='modal-delete-btn' icon={<MdDeleteOutline/>} func={handleDelete} text='Delete'/>
			</div>
		</div>

	</div>);
};

DeleteModal.propTypes ={
	userId: PropTypes.string,
	refetch: PropTypes.func,
	toggleModal: PropTypes.func
};
const ModalBtn= ({text, btnClass, func, icon}) => (
	<button className={`delete-modal-btn ${ btnClass }`} onClick={func}>
		{icon}
		{text}
	</button>);

ModalBtn.propTypes = {
	text: PropTypes.string,
	btnClass: PropTypes.string,
	func: PropTypes.func,
	icon: PropTypes.element
};
export default DeleteModal;
