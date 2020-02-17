export const valuesReducer = (values, action) => {
	switch (action.type) {
		case 'SET_VALUE': {
            console.log(values);
            return {
                ...values,
                [action.name]: (action.value / 100)
			};
    }
    case 'GENERATE_POINTS': {
      return {
        ...values,
        odometerValue: action.rNumber
      }
    }
    case 'SET_MIN_POINTS': {
      return {
        ...values,
        minPoints: action.value
      }
    }
    case 'SET_MAX_POINTS': {
      return {
        ...values,
        maxPoints: action.value
      }
    }
    case 'HANDLE_ODOMETER': {
      console.log(action.value)
      return {
        ...values,
        odometerSetting: action.value
      }
    }
		default:
			return values;
	}
};
