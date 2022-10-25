import axios from 'axios';
import qs from 'qs';
import request from '../constants/request';
const instance = axios.create({ baseURL: '' });
instance.defaults.proxy = true;
instance.defaults.headers[request.AccessControlAllowCredentials]= true ;
export default instance;

instance.interceptors.request.use((config) => config);
instance.interceptors.response.use((res) => res);

export const sendRequest = async (reqType, subDir, query, data) => {
	let response = {};
	if (reqType===request.Get) {
		response = await instance.get(`${ subDir }/${ query }`);
	} else if (reqType === request.Post) {
		if (query===request.Login) {
			response = await instance.post(`${ subDir }/${ query }`, qs.stringify(data), { headers: { [request.ContentType]: request.XForm } });
			return response;
		}
		response = await instance.post(`${ subDir }/${ query }`);
	}
	return response;
};


/*
 * export const loginRequest = async (data) => await instance.post('user/login', qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
 * export const registerRequest = async (data) => await instance.post('user/register', data);
 * export const getData = async (data = 0) => await instance.get(`user?_limit=6&_page=${ data }`);
 * export const generateToken = async (data) => await instance.get('user/token');
 * export const logoutRequest = async (data) => await instance.post('user/logout');
 * export const getUserDetails = async (data) => await instance.get('user/getuser');
 */
