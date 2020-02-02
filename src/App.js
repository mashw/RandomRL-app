import React, { useReducer } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch } from './util/defaults.js';
import FrontPanel from './components/front-panel';
import { matchReducer } from './reducers/match-reducer';
import StateContext from './context/state-context';



function App() { 
  const [match, matchDispatch] = useReducer(matchReducer, defaultMatch)

  const generateMatch = () => {
    new Promise((resolve, reject) => {
      resolve(matchDispatch({ type: 'GENERATE_MATCH' }));
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
    <StateContext.Provider value={ { match } }>
      Random Rocket League
      <FrontPanel generateMatch={generateMatch}/>
      <BackPanel/>
    </StateContext.Provider>
  );
}

export default App;
