import React, { useContext } from 'react';
import StateContext from '../context/state-context';
import Mutators from './mutators';


const BackPanel = () => {
  const state = useContext(StateContext);
  return (
        <div>
            <p>Blue Team: { state.match.team1 }</p>
            <p>Orange Team: { state.match.team2 } </p>
            <p>Mode: { state.match.mode }</p>
            <p>Map: { state.match.map }</p>
            <p>Rumble: { state.match.rumble }</p>
            { state.match.mutatorSetting === false ? <p>Mutators: Off</p> : <Mutators/> }
        </div>
    )
}

export {BackPanel as default};