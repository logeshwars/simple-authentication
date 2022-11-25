import { useState } from "react";

const useToggle = (defaultValue) => {
	const [value, setValue] = useState(defaultValue);
	const toggleValue =() => setValue((prev) => !prev);
	return [value, toggleValue];
};
export default useToggle;
