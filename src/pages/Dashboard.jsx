import React, { useCallback, useContext, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { MakeRequest } from '../axios';
import Card from '../components/Card';
import constants from '../constants';
import request from '../constants/request';
import { AuthContext } from '../contexts/MainContext';

const Dashboard = () => {
	const { 2: getToken } = useContext(AuthContext);
	const pageInc = 1;
	const firstIndex = 0;
	const { data, isError, isLoading, fetchNextPage, hasNextPage, error, refetch } = useInfiniteQuery(
		['users'],
		({ pageParam = request.DefaultPage }) => {
			const config = constants.resConfig.User;
			config.query = `?${ request.Limit }=${ request.DefaultPageLimit }&${ request.Page }=${ pageParam }`;
			return MakeRequest(config);
		},
		{ getNextPageParam: (_lastPage, pages) => pages.length + pageInc }
	);
	if (isError) {
		if (error.response.status === constants.code.Unauthorized) {
			getToken();
			if (data?.pages.length < data?.pages[firstIndex].data.last_page) {
				fetchNextPage();
			}
		}
	}
	const observer = useRef();
	const lastElementRef = useCallback(
		(node) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[firstIndex].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasNextPage, fetchNextPage]
	);
	return (
		<div className='dashboard'>
			{!isLoading && !isError && (
				<div className='card-container'>
					{data.pages.map((page, pageIndex) => page.data.map((user, index) => (
						<>
							{data.pages.length === pageIndex + pageInc &&
								page.data.length === index + pageInc &&
								data.pages.length + pageInc < page.last_page ? (
									<Card
										refetch={refetch}
										refer={lastElementRef}
										values={page}
										data={user}
										key={index}
									/>
								) : (
									<Card refetch={refetch} data={user} refer={null} key={index} />
								)}
						</>
					))
					)}
				</div>
			)}
		</div>
	);
};

export default Dashboard;
