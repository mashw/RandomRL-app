export const settingsReducer = (settings, action) => {
	switch (action.type) {
		case 'SET_TEAM_SIZE': {
			return {
				...settings,
				teamSize: action.teamSize
			};
		}
		case 'SET_SHUFFLE_PLAYERS': {
			return {
				...settings,
				shufflePlayers: action.shuffleValue
			};
		}
		case 'SET_PLAYER_NAMES': {
			return {
				...settings,
				players: {
					...settings.players,
					[action.playerId]: action.playerName
				}
			};
    }   
    case 'RESET_SETTINGS': {
      return {
        ...action.defaultSettings
      }
	}
			default:
			return settings;
	}
};
