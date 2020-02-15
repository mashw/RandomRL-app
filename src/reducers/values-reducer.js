export const valuesReducer = (values, action) => {
	switch (action.type) {
		case 'SET_VALUE': {
            console.log(values);
            return {
                ...values,
                [action.name]: (action.value / 100)
			};
        }
		default:
			return values;
	}
};
