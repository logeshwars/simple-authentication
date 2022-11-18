import React, { useContext } from 'react';
import {
	Link,
	Outlet, useNavigate
} from 'react-router-dom';
import * as MainContext from '../contexts/MainContext';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { TiUserAdd } from 'react-icons/ti';
import { MakeRequest } from '../axios';
import constants from '../constants';
const NavBar = () => {
	const { 1: setLogged } = useContext(MainContext.AuthContext);
	const [user, setUser] = useContext(MainContext.UserContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		MakeRequest(constants.resConfig.Logout).then(([res]) => {
			setLogged(res);
			setUser(null);
		});
	};
	const path = constants.path;
	return (
		<>
			<div className='navbar'>
				<Link to='/' className='navbar-logo'>
					<img src='images/friends.png' alt='' />
					<h3>Users</h3>
				</Link>
				<div className='navbar-menu'>
					{
						user?.role === constants.role.RoleAdmin &&
					<button className='nav-button' onClick={() => navigate(path.CreateUser)}><TiUserAdd/></button>
					}
					<div className='user-container'>
						{user && <p>{user.userName}</p>}
						<button onClick={() => handleLogout(setLogged, setUser)}>
							<RiLogoutCircleRLine className='icons text-red-500' />
						</button>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default NavBar;
