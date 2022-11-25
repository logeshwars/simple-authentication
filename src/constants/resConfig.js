import messages from './messages';
import request from './request';
import code from './resCodes';
const resConfig = {
	Login: {
		reqType: request.Post,
		subDir: request.User,
		query: request.Login,
		resType: request.Bool,
		code: code.Accepted,
		msg: messages.LoggedInSuccessfully,
		success: messages.LoggedInSuccessfully,
		error: messages.InvalidCred
	},
	Register: {
		reqType: request.Post,
		subDir: request.User,
		query: request.Register,
		resType: request.Bool,
		code: code.Created,
		msg: messages.UserCreated,
		success: messages.UserCreated,
		error: messages.InvalidValues
	},
	User: {
		reqType: request.Get,
		subDir: request.User,
		query: '',
		resType: request.Data,
		code: code.Accepted,
		msg: messages.userFound,
		success: null,
		error: null
	},
	GetCurrentUser: {
		reqType: request.Get,
		subDir: request.User,
		query: request.GetUser,
		resType: request.Data,
		code: code.OK,
		msg: messages.userFound,
		success: null,
		error: messages.SessionExp
	},
	Token: {
		reqType: request.Get,
		subDir: request.User,
		query: request.Token,
		resType: request.Bool,
		code: code.Created,
		msg: messages.TokenCreatedSuccessfully,
		success: null,
		error: messages.SessionExp
	},
	Logout: {
		reqType: request.Post,
		subDir: request.User,
		query: request.Logout,
		resType: request.Bool,
		code: code.OK,
		msg: messages.LoggedOutsuccessfully,
		success: null,
		error: messages.InvalidCred
	},
	Delete: {
		reqType: request.Post,
		subDir: request.User,
		query: request.DeleteUser,
		resType: request.Bool,
		code: code.OK,
		msg: messages.UserDeleted,
		success: messages.UserDeleted,
		error: messages.UserNotFound
	},
	GetCurrentUserFullDetails:
	{
		reqType: request.Get,
		subDir: request.User,
		query: request.UserFullDetails,
		resType: request.Data,
		code: code.OK,
		msg: messages.userFound,
		success: null,
		error: messages.UserNotFound
	}
};

export default resConfig;
