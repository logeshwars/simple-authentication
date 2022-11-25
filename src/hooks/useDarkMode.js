import { useEffect, useState } from 'react';

const useDarkMode = () => {
	const [theme, setTheme] = useState((localStorage.getItem('theme')|| 'light'));
	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};
	useEffect(() => {
		localStorage.setItem('theme', theme);
		const root = window.document.documentElement;
		root.classList.remove(theme === 'light' ? 'dark' : 'light');
		root.classList.add(theme);
	}, [theme]);

	return [theme, toggleTheme];
};

export default useDarkMode;
