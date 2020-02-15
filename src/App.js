import React, { useReducer, useState } from 'react';
import BackPanel from './components/back-panel';
import { defaultMatch, defaultSettings, defaultValues } from './util/defaults.js';
import FrontPanel from './components/front-panel';
import { getClosest } from './util/helper-functions';
import { matchReducer } from './reducers/match-reducer';
import { valuesReducer } from './reducers/values-reducer';
import { settingsReducer } from './reducers/settings-reducer';
import SettingsModal from './components/modal.js';
import StateContext from './context/state-context';

function App() {
	const [ modalState, toggleModal ] = useState(false);
	const [ match, matchDispatch ] = useReducer(matchReducer, defaultMatch);
	const [ settings, settingsDispatch ] = useReducer(settingsReducer, defaultSettings);
	const [ values, valuesDispatch ] = useReducer(valuesReducer, defaultValues);

	const generateMatch = () => {
		new Promise((resolve, reject) => {
			resolve(matchDispatch({ type: 'GENERATE_MATCH', values }));
		})
			.then(() => {
				matchDispatch({ type: 'GENERATE_MAP' });
			})
			.then(() => {
				const playerCount = settings.teamSize * 2;
				const playerArray = Object.values(settings.players).slice(0, playerCount);
				const shuffle = settings.shufflePlayers;
				matchDispatch({ type: 'GENERATE_TEAMS', playerCount, playerArray, shuffle });
			})
			.then(() => {
				matchDispatch({ type: 'GENERATE_MUTATORS' });
			});
	};

	const setTeamSize = (e) => {
		const teamSize = e.target.value;
		settingsDispatch({ type: 'SET_TEAM_SIZE', teamSize });
	};

	const setShufflePlayers = (e) => {
		const shuffleValue = e.target.checked;
		settingsDispatch({ type: 'SET_SHUFFLE_PLAYERS', shuffleValue });
	};

	const setPlayerNames = (e) => {
		const playerId = e.target.name;
		const playerName = e.target.value;
		settingsDispatch({ type: 'SET_PLAYER_NAMES', playerId, playerName });
	};

	const setValue = (e) => {
    const name = e.target.name;
    //Rounds values up or down to closest 10 on sliders for "click" points
		const value = getClosest(e.target.value);
		valuesDispatch({ type: 'SET_VALUE', name, value });
	};

	return (
		<StateContext.Provider value={{ match, settings, values }}>
			Random Rocket League
			<FrontPanel generateMatch={generateMatch} modalState={modalState} toggleModal={toggleModal} />
			<BackPanel />
			<SettingsModal
				modalState={modalState}
				toggleModal={toggleModal}
				settings={settings}
				setValue={setValue}
				setPlayerNames={setPlayerNames}
				setShufflePlayers={setShufflePlayers}
				setTeamSize={setTeamSize}
			/>
		</StateContext.Provider>
	);
}

export default App;
