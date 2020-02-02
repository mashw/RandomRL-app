import React, { useContext } from 'react';
import MatchContext from '../context/match-context';
import Mutators from './mutators';


const BackPanel = () => {
  const match = useContext(MatchContext);
  return (
        <div>
            <p>Blue Team: { match.team1 }</p>
            <p>Orange Team: { match.team2 } </p>
            <p>Mode: { match.mode }</p>
            <p>Map: { match.map }</p>
            <p>Rumble: { match.rumble }</p>
            { match.mutatorSetting === false ? <p>Mutators: Off</p> : <Mutators/> }
        </div>
    )
}

export {BackPanel as default};