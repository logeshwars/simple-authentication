const formatDate = (date) => {
	date = new Date(date);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	return date.toLocaleDateString('en-In', options);
};

export default formatDate;
