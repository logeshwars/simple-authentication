/* Form constants */
const minimumAge = 18;
const maxAge = 80;
const firstIndex = 0;
const maxdate = new Date();
const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - maxAge);
maxdate.setFullYear(maxdate.getFullYear() - minimumAge);

const formConst = {
	userMinLength: 3,
	userMaxLength: 20,
	emailMinLength: 8,
	emailMaxLength: 40,
	dateSplitIndex: 0,
	dobMinDate: minDate.toISOString().split('T')[firstIndex],
	dobMaxDate: maxdate.toISOString().split('T')[firstIndex],
	passwordMinLength: 8,
	passwordMaxLength: 20,
	minimumAge: 18
};

export default formConst;
