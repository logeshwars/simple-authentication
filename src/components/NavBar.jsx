/** @format */

import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import * as MainContext from '../contexts/MainContext';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import handleLogout from '../functions/logout';
const NavBar = () => {
	const [, setLogged] = useContext(MainContext.AuthContext);
	const [user, setUser] = useContext(MainContext.UserContext);

	return (
		<>
			<div className='navbar bg-white'>
				<div className='navbar-logo'>
					<img src='images/friends.png' alt='' />
					<h3>Users</h3>
				</div>
				<div className='navbar-menu px-4 py-2 border  shadow rounded-full hover:bg-slate-200 hover:cursor-pointer flex gap-1 items-center'>
					{user && <p>{user.userName}</p>}
					<button onClick={() => handleLogout(setLogged, setUser)}>
						<RiLogoutCircleRLine className='text-2xl text-red-500 ' />
					</button>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default NavBar;
