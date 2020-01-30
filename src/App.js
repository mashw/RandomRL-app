import React, { useState, useReducer } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch } from './util/defaults.js';
import MatchContext from './context/match-context';
import { matchReducer } from './reducers/match-reducer';
import FrontPanel from './components/front-panel';


function App() {
  const [match, matchDispatch] = useReducer(matchReducer, defaultMatch)

  return (
    <MatchContext.Provider value={ match }>
      Random Rocket League
      <FrontPanel/>
      <button onClick={() => matchDispatch({ type: 'GENERATE_MATCH' })}>Click</button>
      <BackPanel/>
    </MatchContext.Provider>
  );
}

export default App;
