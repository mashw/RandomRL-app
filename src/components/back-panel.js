import React, { useContext, useReducer } from 'react';
import { defaultMutators } from '../util/defaults';
import MatchContext from '../context/match-context';
import Mutators from './mutators';





const BackPanel = () => {
  const matchState = useContext(MatchContext);
  return (
        <div>
            {console.log(matchState)}
            <p>Teams: {matchState.teams}</p>
            <p>Mode: {matchState.mode}</p>
            <p>Map: {matchState.map}</p>
            <p>Rumble: {matchState.rumble}</p>
           {matchState.mutators === false ? <p>Mutators: Off</p> : <Mutators/>}       
            

        </div>
    )
}

export {BackPanel as default};