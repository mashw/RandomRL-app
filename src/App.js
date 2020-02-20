import React, { useReducer, useState, useEffect } from 'react';
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
  const settingsData = JSON.parse(localStorage.getItem('settingsData'));
  const valuesData = JSON.parse(localStorage.getItem('valuesData'));

	const [ modalState, toggleModal ] = useState(false);
	const [ match, matchDispatch ] = useReducer(matchReducer, (defaultMatch));
	const [ settings, settingsDispatch ] = useReducer(settingsReducer, (settingsData || defaultSettings));
	const [ values, valuesDispatch ] = useReducer(valuesReducer, (valuesData || defaultValues));

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
      })
      .then(() => {
        const min = values.minPoints;
        const max = values.maxPoints;
        const rNumber = 10000 + Math.floor(Math.random() * (max - min) + min);
				valuesDispatch({ type: 'GENERATE_POINTS', rNumber });
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

  const resetValues = () => {
    console.log(localStorage);
    settingsDispatch({ type: 'RESET_SETTINGS', defaultSettings });
    valuesDispatch({ type: 'RESET_VALUES', defaultValues });
    console.log(localStorage);
  }

  const handleOdometerSetting = (e) => {
    const value = (e.target.checked ? true : false)
    valuesDispatch({ type: "HANDLE_ODOMETER", value})
  }
  
  const setMinPoints = (e) => {
    const value = e.target.value;
    valuesDispatch({ type: 'SET_MIN_POINTS', value });
  };

  const setMaxPoints = (e) => {
    const value = e.target.value;
    valuesDispatch({ type: 'SET_MAX_POINTS', value });
  };

  useEffect(() => {
    localStorage.setItem('settingsData', JSON.stringify(settings));
    localStorage.setItem('valuesData', JSON.stringify(values));
  });


	return (
		<StateContext.Provider value={{ match, settings, values }}>
			<FrontPanel generateMatch={generateMatch} modalState={modalState} toggleModal={toggleModal} />
			<BackPanel />
			<SettingsModal
				modalState={modalState}
				toggleModal={toggleModal}
        handleOdometerSetting={handleOdometerSetting}
        resetValues={resetValues}
        setMinPoints={setMinPoints}
        setMaxPoints={setMaxPoints}
				setPlayerNames={setPlayerNames}
				setShufflePlayers={setShufflePlayers}
				setTeamSize={setTeamSize}
				setValue={setValue}
			/>
		</StateContext.Provider>
	);
}

export default App;
