import { getRandom } from '../util/helper-functions';

export const settingsReducer = (settings, action) => {
  switch(action.type) {
    case 'SET_PLAYERS': {
      return {
        ...settings,
        player1: 'TEST'
      }
    }
    default: return settings
  }
}