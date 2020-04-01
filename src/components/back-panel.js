import React, { useContext } from 'react';
import StateContext from '../context/state-context';
import Odometer from 'react-odometerjs';
import Mutators from './mutators';

const BackPanel = () => {
	const state = useContext(StateContext);
	return (
		<div className="back-panel">
			<p><span className="underline">Blue Team:</span> {state.match.blueTeam}</p>
			<p><span className="underline">Orange Team:</span> {state.match.orangeTeam} </p>
			<p><span className="underline">Mode:</span> {state.match.mode}</p>
			<p><span className="underline">Map:</span> {state.match.map}</p>
			<p><span className="underline">Rumble:</span> {state.match.rumble}</p>
			{state.match.mutatorSetting === false ? <p><span className="underline">Mutators:</span> Off</p> : <Mutators />}
			<div className="odometer-wrapper">
				{state.values.odometerSetting === true ? (
					<Odometer
						className="odometer"
						//Adding 10000 to value in order to force 4 digit odometer, hiding leading digit with CSS
						value={state.values.odometerValue + 10000}
						format="(dddd)"
						duration="3500"
					/>
				) : null}
			</div>
      <div className="map-preview" />
		</div>
	);
};

export { BackPanel as default };
