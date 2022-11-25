import './App.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import { ReactQueryDevtools } from 'react-query/devtools';
import NavBar from './components/NavBar';
import Protector from './components/Protector';
import IndexRoute from './components/IndexRoute';

import { UserProvider } from './contexts/MainContext';

import constants from './constants';
import CreateUser from './pages/CreateUser';
import Forgot from './pages/Forgot';
import Dashboard from './pages/TableDashboard';
import UserDetails from './components/UserDetails';
const App = function () {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				refetchOnmount: false,
				refetchOnReconnect: false,
				retry: false
			}
		}
	});
	const {path, role} = constants;
	return (
		<div className='app'>
			<UserProvider>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path='/' element={<NavBar />}>
							<Route index element={<IndexRoute/>}/>
							<Route path={path.Dashboard} element={<Protector allowedRoles={[role.RoleAdmin]} Component={Dashboard}/>}/>
							<Route path={path.CreateUser} element={<Protector allowedRoles={[role.RoleAdmin]} Component={CreateUser} />} />
							<Route path={path.UserDetails} element={<Protector allowedRoles={[role.RoleAdmin, role.RoleUser]} Component={UserDetails} />} />
						</Route>
						<Route path={path.Login} element={<Login />} />
						<Route path={path.Register} element={<Register />} />
						<Route path={path.ForgotPassword} element={<Forgot/>}/>
					</Routes>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</UserProvider>
		</div>
	);
};

export default App;
