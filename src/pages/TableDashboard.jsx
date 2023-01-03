import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MakeRequest } from '../axios';
import Row from '../components/Row';
import constants from '../constants';
import { AuthContext } from '../contexts/MainContext';
import { TiUserAdd } from 'react-icons/ti';
import { RiSearch2Line } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import {BsCaretLeftFill, BsFillCaretRightFill} from 'react-icons/bs';
import PropTypes from 'prop-types';
import createArray from '../utils/createArray';

const Dashboard = () => {
	const navigate = useNavigate();
	const { 2: getToken } = useContext(AuthContext);
	const [search, setSearch] = useState('');
	const [filteredItems, setFilteredItems] = useState([]);
	const { path, request } = constants;
	const [currentPage, setCurrentPage] = useState(request.DefaultPage);
	const [pageLimit, setPageLimit] = useState(request.DefaultPageLimit);
	const { data, isError, isLoading, error, refetch } = useQuery(
		['users'],
		() => {
			const config = constants.resConfig.User;
			config.query = `?${ request.Limit }=${ pageLimit }&${ request.Page }=${ currentPage }`;
			return MakeRequest(config);
		}, [pageLimit, currentPage]
	);
	useEffect(() => {
		setFilteredItems(() => data?.data?.filter((user) => user.userName.toLowerCase().includes(search.toLowerCase())));
	}, [search, data]);

	if (isError) {
		if (error.response.status === constants.code.Unauthorized) {
			getToken();
			refetch();
		}
	}
	const handlePageChange=(page) => {
		setCurrentPage(page);
		refetch();
	};

	const handlePageLimitChange = (limit) => {
		setPageLimit(limit);
		refetch();
	};


	const Footer = () => (
		<div className='dashboard-footer'>
			<div className='dashboard-footer-data-limit'>
				<label>per page</label>
				<select className='dashboard-footer-data-limit-select' onChange={(event) => handlePageLimitChange(event.target.value)}>
					{createArray(10, 10).map((elm) => (
						<option key={elm}>{elm}</option>
					))}
				</select>
			</div>

			<div className='pagination-container'>
				<Paginationbtn label={<BsCaretLeftFill/>} className='pagination-btn pagination-btn-active'/>
				{ createArray(data?.last_page).map((elm, index, array) => <Paginationbtn handlePageChange={() => handlePageChange(index)} key={elm} label={elm} className='pagination-btn ' />

				)}
				<Paginationbtn label={<BsFillCaretRightFill/>} className='pagination-btn pagination-btn-active'/>
			</div>
		</div>
	);

	const Paginationbtn = ({ label, className, handlePageChange }) => <button className={className} onClick={handlePageChange}>{label}</button>;

	Paginationbtn.propTypes = {
		label: PropTypes.string,
		className: PropTypes.string,
		handlePageChange: PropTypes.func
	};


	return (
		<div className='dashboard'>
			<div className='dashboard-header'>
				<h1 className='dashboard-header-title'>Users</h1>
				<div className='dashboard-search-container'>
					{!search && (
						<label className='dashboard-search-placeholder'>
							<RiSearch2Line />
							search users
						</label>
					)}
					<input
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						className='dashboard-search-input'
						type='text'
					/>
					{search && (
						<button className='dashboard-search-btn' onClick={() => setSearch('')}>
							<IoClose />
						</button>
					)}
				</div>
				<button className='nav-button' onClick={() => navigate(path.CreateUser)}>
					<span>create user</span>
					<TiUserAdd />
				</button>
			</div>
			{!isLoading && !isError && (
				<div className='dashboard-table-container'>
					{!search ? data.data.map((user, index) => (
						<Row refetch={refetch} data={user} key={index} />
					)) :filteredItems.map((user, index) => (
						<Row refetch={refetch} data={user} key={index} />
					))
					}
				</div>
			)}
			<Footer />
		</div>
	);
};

export default Dashboard;
