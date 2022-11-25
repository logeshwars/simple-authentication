import React, { useContext} from 'react';
import { Link, Outlet} from 'react-router-dom';
import * as MainContext from '../contexts/MainContext';
import { RiLogoutCircleRLine, RiMoonClearFill } from 'react-icons/ri';
import {CgProfile} from 'react-icons/cg';
import {IoChevronDownSharp} from 'react-icons/io5';
import {FaSun} from 'react-icons/fa';
import { MakeRequest } from '../axios';
import constants from '../constants';
import useAuth from '../hooks/useAuth';
import useToggle from '../hooks/useToggle';
import useDarkMode from '../hooks/useDarkMode';
const NavBar = () => {
	const [user, setUser] = useAuth();

	const [dropdown, toggleDropdown] = useToggle(false);
	const [theme, toggleTheme] = useDarkMode();
	const { 1: setLogged } = useContext(MainContext.AuthContext);
	const {role} = constants;

	const handleLogout = () => {
		MakeRequest(constants.resConfig.Logout).then(([res]) => {
			setLogged(res);
			setUser(null);
		});
	};
	const NavDropDown = () => (
		<div className='nav-dropdown'>
			{user && user.role===role.RoleAdmin && <Link className='nav-dropdown-items' to={path.UserDetails}>
				<span>profile</span>
				<CgProfile className='icons text-primary' />
			</Link>}
			<button className='nav-dropdown-items' onClick={() => handleLogout(setLogged, setUser)}>
				<span>log out</span>
				<RiLogoutCircleRLine className='icons text-red-500' />
			</button></div>
	);

	const path = constants.path;
	return (
		<>
			<nav className='navbar'>
				<Link to='/' className='navbar-logo'>
					<img src='images/friends.png' alt='' />
				</Link>
				<div className='navbar-menu'>
					<button className='nav-dark-mode-btn' onClick={toggleTheme}>{theme==='dark' ?<FaSun/> :<RiMoonClearFill/>}</button>
					<div className='nav-user' onClick={toggleDropdown}>
						{user && <span className='nav-user-name'>{user.userName}<IoChevronDownSharp/></span>}
						{ dropdown && <NavDropDown/>}
					</div>
				</div>
			</nav>
			<Outlet/>
		</>
	);

};
export default NavBar;
