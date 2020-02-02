import React, { useReducer } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch, defaultSettings } from './util/defaults.js';
import FrontPanel from './components/front-panel';
import MatchContext from './context/match-context';
import { matchReducer } from './reducers/match-reducer';
import { settingsReducer } from './reducers/settings-reducer';



function App() {
  const [match, matchDispatch] = useReducer(matchReducer, defaultMatch);

  const [players, setPlayers] = useReducer(settingsReducer, defaultSettings);

  
  const generateMatch = () => {
    new Promise((resolve, reject) => {
      resolve(matchDispatch({ type: 'GENERATE_MATCH', players: players }));
    })
    .then(() => {
       matchDispatch({ type: 'GENERATE_MAP' })
      }
    )
    .then(() => {
      matchDispatch({ type: 'GENERATE_PLAYERS' })
     }
   )
    .then(() => {
       matchDispatch({ type: 'GENERATE_MUTATORS' })
      }
    )
    .then(() => {
      console.log(match)
    })
  }

  return (
    <MatchContext.Provider value={ match }>
      Random Rocket League
      <FrontPanel/>
      <button onClick={() => generateMatch()}>Click</button>
      <BackPanel/>
    </MatchContext.Provider>
  );
}

export default App;
