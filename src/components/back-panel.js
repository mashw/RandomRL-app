import React, { useContext } from 'react';
import StateContext from '../context/state-context';
import Odometer from 'react-odometerjs';
import Mutators from './mutators';

const BackPanel = () => {
  const state = useContext(StateContext);
	return (
		<div>
			<p className="test">Blue Team: {state.match.blueTeam}</p>
			<p>Orange Team: {state.match.orangeTeam} </p>
			<p>Mode: {state.match.mode}</p>
			<p>Map: {state.match.map}</p>
			<p>Rumble: {state.match.rumble}</p>
			{state.match.mutatorSetting === false ? <p>Mutators: Off</p> : <Mutators />}
      {
        state.values.odometerSetting === true ?
        <Odometer 
        className="odometer" 
        //Adding 10000 to value in order to force 4 digit odometer, hiding leading digit with CSS
        value={state.values.odometerValue + 10000}
        format="(dddd)"
        duration="3500"
        /> :
        null
      }

		</div>    
	);
};

export { BackPanel as default };
