export const playersReducer = (settings, action) => {
	switch (action.type) {
		case 'SET_PLAYER_NAMES': {
			return {
				...settings,
				[action.playerId]: action.playerName
			};
		}
		default:
			return settings;
	}
};
