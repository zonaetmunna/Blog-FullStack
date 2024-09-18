import { authKey } from '@/constants/authkey';
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import { decodedToken } from '@/utils/jwt';

import {
	getFromLocalStorage,
	removeFromLocalStorage,
	setToLocalStorage,
} from '@/utils/local-storage';

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
	console.log('🚀 ~ storeUserInfo ~ accessToken:', accessToken);
	return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
	const authToken = getFromLocalStorage(authKey);
	console.log('🚀 ~ getUserInfo ~ authToken:', authToken);
	if (authToken) {
		const decodedData: any = decodedToken(authToken);
		return {
			...decodedData,
			role: decodedData?.role?.toLowerCase(),
		};
	} else {
		return '';
	}
};

export const isLoggedIn = () => {
	const authToken = getFromLocalStorage(authKey);
	if (authToken) {
		return !!authToken;
	}
};

export const removeUser = () => {
	return removeFromLocalStorage(authKey);
};

export const getNewAccessToken = async () => {
	return await axiosInstance({
		url: 'http://localhost:3000/api/v1/auth/refresh-token',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		withCredentials: true,
	});
};
