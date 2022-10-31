import axios from 'axios';
import qs from 'qs';
import constants from '../constants';
import request from '../constants/request';
const instance = axios.create({ baseURL: '' });
instance.defaults.proxy = true;
instance.defaults.headers[request.AccessControlAllowCredentials] = true;
export default instance;

/*
 * instance.interceptors.request.use((config) => config);
 * instance.interceptors.response.use((res) => res);
 */

export const MakeRequest = async (config, data) => {
	let response = {};
	try {
		if (config.reqType === request.Get) {
			response = await instance.get(`${ config.subDir }/${ config.query }`);
		} else if (config.reqType === request.Post) {
			if (config.query === request.Login) {
				response = await instance.post(`${ config.subDir }/${ config.query }`, qs.stringify(data), { headers: { [request.ContentType]: request.XForm } });
			} else {
				response = await instance.post(`${ config.subDir }/${ config.query }`, data);
			}
		}
	} catch (err) {
		response = err.response;
	}
	return checkResponse(response, config);
};

const checkResponse = (res, config) => {
	if (
		res.status === config.code &&
		res.data.message === config.msg
	) {
		if (config.resType===constants.request.Bool) {
			return [true, config.success];
		} else if (config.resType === constants.request.Data) {
			return res.data;
		}
	} else {
		if (config.resType===constants.request.Bool) {
			return [false, res.data.message];
		} else if (config.resType === constants.request.Data) {
			return [undefined, res.data.message];
		}
	}

};

/*
 * export const loginRequest = async (data) => await instance.post('user/login', qs.stringify(data), { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
 * export const registerRequest = async (data) => await instance.post('user/register', data);
 * export const getData = async (data = 0) => await instance.get(`user?_limit=6&_page=${ data }`);
 * export const generateToken = async (data) => await instance.get('user/token');
 * export const logoutRequest = async (data) => await instance.post('user/logout');
 * export const getUserDetails = async (data) => await instance.get('user/getuser');
 */
