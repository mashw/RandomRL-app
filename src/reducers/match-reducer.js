import { arrays } from '../util/arrays';
import { getRandom } from '../util/helper-functions';

export const matchReducer = (match, action) => {
  switch(action.type) {
    case 'GENERATE_MATCH': { 
      console.log(action.players)      
      return {
        mode: (Math.random() <= 0.5) ? "Soccar" : getRandom(arrays.mode),
        rumble: (Math.random() <= 0.6) ? "Off" : getRandom(arrays.rumble),
        mutatorSetting: (Math.random() <= 0.5) ? false : true
      }
    }
    case 'GENERATE_MAP': {
      return {
        ...match,
        map: ((mode) => {
          switch(mode) {
            case 'Dropshot': return 'Core 707';
            case 'Hoops': return 'Dunk House';          
            default: return getRandom(arrays.map);
          }
        })(match.mode)
      }
    }
    case 'GENERATE_MUTATORS': {         
      return {
        ...match,
        series: (Math.random() <= 0.9) ? "1" : getRandom(arrays.series),
        maxScore: (Math.random() <= 0.8) ? "Unlimited" : getRandom(arrays.maxScore),
        overtime: (Math.random() <= 0.6) ? "Unlimited" : getRandom(arrays.overtime),
        gameSpeed: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.gameSpeed),
        ballSpeed: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.ballSpeed),
        ballType:  ((mode) => {
          switch(mode) {
           case 'Hockey': return 'Puck';
           case 'Dropshot': return 'Default';
           default: return (Math.random() <= 0.6) ? "Default" : getRandom(arrays.ballType);
          }})(match.mode),
        ballPhysics: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.ballPhysics),
        ballSize: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.ballSize),
        ballBounciness: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.ballBounciness),
        boostAmount: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.boostAmount),
        boostStrength: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.boostStrength),
        gravity: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.gravity),
        demolition: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.demolition),
        respawnTime: (Math.random() <= 0.6) ? "Default" : getRandom(arrays.respawnTime),
        length: (Math.random() <= 0.8) ? "5" : getRandom(arrays.length)
      }
    }
    default:
      return match
  }
}



