/** @format */

import React, {
	useCallback, useContext, useRef
} from 'react';
import { useInfiniteQuery } from 'react-query';
import { sendRequest } from '../axios';
import Card from '../components/Card';
import request from '../constants/request';
import { AuthContext } from '../contexts/MainContext';

const Dashboard = () => {
	const [, , getToken] = useContext(AuthContext);
	const {
		data, isError, isLoading, fetchNextPage, hasNextPage, error
	} = useInfiniteQuery(
		['users'],
		({ pageParam = request.DefaultPage }) => sendRequest(request.Get, request.User, `?${ request.Limit }=${ request.DefaultPageLimit }&${ request.Page }=${ pageParam }`),
		{ getNextPageParam: (_lastPage, pages) => pages.length + 1 }
	);
	if (isError) {
		if (error.response.status === 401) {
			getToken();
			if (data?.pages.length < data?.pages[0].data.last_page) {
				fetchNextPage();
			}
		}
	}
	const observer = useRef();
	const lastElementRef = useCallback((node) => {
		if (isLoading) {
			return;
		}
		if (observer.current) {
			observer.current.disconnect();
		}
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasNextPage) {
				fetchNextPage();
			}
		});
		if (node) {
			observer.current.observe(node);
		}
	});
	return (
		<div className='dashboard'>
			{!isLoading && !isError && (
				<div className='card-container'>
					{data.pages.map((page, pageIndex) => page.data.data.map((user, index) => (
						<>
							{data.pages.length === pageIndex + 1 &&
								page.data.data.length === index + 1 &&
								data.pages.length + 1 < page.data.last_page ? (
									<Card refer={lastElementRef} values={page} user={user} key={index} />
								) : (
									<Card user={user} refer={null} key={index} />
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
