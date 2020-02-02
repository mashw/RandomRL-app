import React, { useReducer, useState } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch, defaultSettings } from './util/defaults.js';
import FrontPanel from './components/front-panel';
import { matchReducer } from './reducers/match-reducer';
import { settingsReducer } from './reducers/settings-reducer';
import SettingsModal from './components/modal.js';
import StateContext from './context/state-context';



function App() { 
  const [modalState, toggleModal] = useState(false);
  const [match, matchDispatch] = useReducer(matchReducer, defaultMatch);
  const [settings, settingsDispatch] = useReducer(settingsReducer, defaultSettings);

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
      <FrontPanel generateMatch={generateMatch} modalState={modalState} toggleModal={toggleModal}/>
      <BackPanel />
      <SettingsModal modalState={modalState} toggleModal={toggleModal}/>
    </StateContext.Provider>
  );
}

export default App;
