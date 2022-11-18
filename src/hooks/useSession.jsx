import {
	useCallback, useEffect, useState
} from 'react';

const useSession = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		const jsonValue = sessionStorage.getItem(key);
		if (jsonValue !== null) {
			return JSON.parse(jsonValue);
		}

		return defaultValue;

	});

	useEffect(() => {
		if (value === undefined) {
			return sessionStorage.removeItem(key);
		}
		sessionStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	const remove = useCallback(() => {
		setValue(undefined);
	}, []);

	return [value, setValue, remove];


};

export default useSession;
