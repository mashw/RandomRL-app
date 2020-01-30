import React, { useContext } from 'react';
import { arrays } from '../util/arrays';
import { getRandom } from '../util/helper-functions';
import MatchContext from '../context/match-context';

const matchState = useContext(MatchContext);

export const matchReducer = (match, action) => {
  switch(action.type) {
    case 'GENERATE_MATCH': {
      return {
        mode: getRandom(arrays.mode),
        map: getRandom(arrays.map),
        rumble: (Math.random() <= 0.6) ? 'Off' : getRandom(arrays.rumble),
        mutators: (Math.random() <= 0.6) ? false : {
          series: (Math.random() <= 0.6) ? '1' : getRandom(arrays.series),
          matchLength: (Math.random() <= 0.8) ? '5' : getRandom(arrays.matchLength),
          maxScore: (Math.random() <= 0.8) ? 'Unlimited' : getRandom(arrays.maxScore),
          overtime: (Math.random() <= 0.6) ? 'Unlimited' : getRandom(arrays.overtime),
          gameSpeed: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.gameSpeed),
          ballSpeed: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.ballSpeed),
          ballType: {matchState.mode},
          ballPhysics: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.ballPhysics),
          ballSize: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.ballSize),
          ballBounciness: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.ballBounciness),
          boostAmount: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.boostAmount),
          boostStrength: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.boostStrength),
          gravity: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.gravity),
          demolition: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.demolition),
          respawnTime: (Math.random() <= 0.6) ? 'Default' : getRandom(arrays.respawnTime)
        }
      }
    }
    case 'GENERATE_MUTATORS': {
      return "OK WORKING"
    }
    default:
      return match
  }
}



