import React, { useContext } from 'react';
import StateContext from '../context/state-context';
import Mutators from './mutators';


const BackPanel = () => {
  const qwe = useContext(StateContext);
  return (
        <div>
            <p>Blue Team: { qwe.match.team1 }</p>
            <p>Orange Team: { qwe.match.team2 } </p>
            <p>Mode: { qwe.match.mode }</p>
            <p>Map: { qwe.match.map }</p>
            <p>Rumble: { qwe.match.rumble }</p>
            { qwe.match.mutatorSetting === false ? <p>Mutators: Off</p> : <Mutators/> }
        </div>
    )
}

export {BackPanel as default};