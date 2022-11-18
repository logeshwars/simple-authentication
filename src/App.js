import './App.css';
import React from 'react';
import {
	QueryClient, QueryClientProvider
} from 'react-query';
import {
	Route, Routes
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ReactQueryDevtools } from 'react-query/devtools';
import NavBar from './components/NavBar';
import Protector from './components/Protector';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './contexts/MainContext';
import constants from './constants';
import AdminProtector from './components/AdminProtector';
import CreateUser from './pages/CreateUser';
const App = function () {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		refetchOnWindowFocus: false,
		refetchOnmount: false,
		refetchOnReconnect: false,
		retry: false
	} } });
	const path = constants.path;
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path='/' element={<NavBar />}>
						<Route index element={<Protector Component={Dashboard} />} />
						<Route path={path.CreateUser} element={<AdminProtector Component={CreateUser}/>}/>
					</Route>
					<Route path={path.Login} element={<Login />} />
					<Route path={path.Register} element={<Register />} />
				</Routes>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</UserProvider>
	);
};

export default App;
