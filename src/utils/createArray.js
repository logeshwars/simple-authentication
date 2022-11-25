const createArray = ( len, inc=1) => {
	const array = Array.from({length: len}).map((elm, index) => ((index+1)*inc));
	return array;
};

export default createArray;
